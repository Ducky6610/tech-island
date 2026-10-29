#!/usr/bin/env python3
import hashlib
import html
import http.server
import json
import os
import re
import socketserver
import threading
import time
import urllib.parse

PORT = int(os.environ.get("PORT", 8765))
WEB_DIR = os.path.dirname(os.path.abspath(__file__))
SAVES_FILE = os.path.join(WEB_DIR, "saves.json")

# 資安防護常數設定
MAX_BODY_BYTES = 16384         # 限制 POST Body 最大 16KB，防止記憶體耗盡攻擊 (DoS)
MAX_PEERS = 100                # 限制同時在線狀態最大筆數
MAX_EVENTS = 25                # 限制動態廣播歷史筆數
MAX_SAVES = 500                # 限制雲端存檔最大筆數
RATE_LIMIT_WINDOW = 10.0       # 速率限制時間窗（秒）
RATE_LIMIT_MAX_REQ = 30        # 每 10 秒單一 IP 最多請求次數

# 靜態檔案白名單（禁止存取 server.py、saves.json、隱藏檔或目錄遍歷）
ALLOWED_STATIC_FILES = {
    "/index.html",
    "/style.css",
    "/app.js",
} | {f"/data/ch{i:02d}.js" for i in range(1, 16)}

ALLOWED_AVATARS = {
    "🐣", "🐹", "🦊", "🐼", "🦄", "🦁", "🐲", "👑",
    "🐰", "🐱", "🐨", "🐯", "🐸", "🐙", "🐳", "🦋"
}
HEX_COLOR_RE = re.compile(r"^#[0-9a-fA-F]{6}$")
SAFE_ID_RE = re.compile(r"^[a-zA-Z0-9_-]{3,36}$")

# 執行緒安全鎖與記憶體狀態
STATE_LOCK = threading.Lock()
PEERS = {}       # { peer_id: { id, name, avatar, color, chId, action, stars, lv, ts } }
EVENTS = []      # [ { id, text, ts, chId } ]
IP_RATES = {}    # { ip: [timestamp, ...] }


def clean_text(val, default="", max_len=20):
    """移除控制字元、前後空白並限制長度（前端仍會做二次 HTML 轉義）"""
    if not isinstance(val, str):
        val = str(val) if val is not None else default
    # 移除控制字元與 HTML 尖括號，防止注入
    cleaned = re.sub(r"[\x00-\x1f\x7f<>]", "", val).strip()
    return (cleaned or default)[:max_len]


def safe_int(val, default=1, min_v=0, max_v=100):
    """安全的整數轉換與範圍夾制"""
    try:
        num = int(val)
    except (ValueError, TypeError):
        return default
    return max(min_v, min(max_v, num))


def hash_pin(account_key, pin_str):
    """使用 SHA-256 雜湊保護學員 PIN 碼，不以明文儲存"""
    raw = f"dt_island_salt_v1:{account_key}:{pin_str}".encode("utf-8")
    return hashlib.sha256(raw).hexdigest()


def load_cloud_saves():
    if not os.path.exists(SAVES_FILE):
        return {}
    try:
        with open(SAVES_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def write_cloud_saves(saves_dict):
    tmp_path = SAVES_FILE + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(saves_dict, f, ensure_ascii=False, indent=2)
    os.replace(tmp_path, SAVES_FILE)


def sanitize_save_payload(raw_save):
    """驗證並清理學員上傳的闖關進度資料"""
    if not isinstance(raw_save, dict):
        return {}
    visited = {}
    if isinstance(raw_save.get("visited"), dict):
        for i in range(1, 16):
            if raw_save["visited"].get(str(i)) or raw_save["visited"].get(i):
                visited[str(i)] = True

    stars = {}
    if isinstance(raw_save.get("stars"), dict):
        for i in range(1, 16):
            v = raw_save["stars"].get(str(i)) or raw_save["stars"].get(i) or 0
            sc = safe_int(v, 0, 0, 3)
            if sc > 0:
                stars[str(i)] = sc

    read_sec = {}
    if isinstance(raw_save.get("readSections"), dict):
        for k, v in list(raw_save["readSections"].items())[:200]:
            if re.match(r"^\d{1,2}-\d{1,2}$", str(k)) and v:
                read_sec[str(k)] = True

    mastered = {}
    if isinstance(raw_save.get("masteredTerms"), dict):
        for k, v in list(raw_save["masteredTerms"].items())[:300]:
            if re.match(r"^\d{1,2}-\d{1,2}$", str(k)) and v:
                mastered[str(k)] = True

    avatar = str(raw_save.get("myAvatar", "🐣")).strip()
    if avatar not in ALLOWED_AVATARS:
        avatar = "🐣"

    return {
        "xp": safe_int(raw_save.get("xp"), 0, 0, 99999),
        "coins": safe_int(raw_save.get("coins"), 50, 0, 99999),
        "streak": safe_int(raw_save.get("streak"), 0, 0, 999),
        "bestStreak": safe_int(raw_save.get("bestStreak"), 0, 0, 999),
        "questCh": safe_int(raw_save.get("questCh"), 1, 1, 15),
        "visited": visited,
        "stars": stars,
        "readSections": read_sec,
        "masteredTerms": mastered,
        "myName": clean_text(raw_save.get("myName"), "神秘學員", 12),
        "myAvatar": avatar,
        "hasSetCustomName": True
    }


class IslandHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def log_message(self, format, *args):
        pass

    def end_headers(self):
        # 統一加上資安防護標頭 (Security Headers)
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data:; "
            "connect-src 'self';"
        )
        super().end_headers()

    def list_directory(self, path):
        # 禁止目錄瀏覽 (Directory Listing)
        self.send_error(403, "Directory listing is forbidden")
        return None

    def _check_rate_limit(self):
        client_ip = self.client_address[0] if self.client_address else "unknown"
        now = time.time()
        with STATE_LOCK:
            history = IP_RATES.get(client_ip, [])
            history = [t for t in history if now - t < RATE_LIMIT_WINDOW]
            if len(history) >= RATE_LIMIT_MAX_REQ:
                IP_RATES[client_ip] = history
                return False
            history.append(now)
            IP_RATES[client_ip] = history
            return True

    def _send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        req_path = parsed.path

        if req_path == "/api/state":
            if not self._check_rate_limit():
                self._send_json({"error": "Too many requests"}, status=429)
                return
            now = time.time()
            with STATE_LOCK:
                stale = [k for k, v in PEERS.items() if now - v.get("ts", 0) > 25]
                for k in stale:
                    del PEERS[k]
                peers_list = list(PEERS.values())
                events_list = list(EVENTS[-12:])
            self._send_json({
                "now": now,
                "peers": peers_list,
                "events": events_list
            })
            return

        # 根路徑自動對應 /index.html
        if req_path == "/":
            req_path = "/index.html"
            self.path = "/index.html"

        # 嚴格白名單檢查，阻擋任何讀取 server.py 或目錄遍歷之企圖
        if req_path not in ALLOWED_STATIC_FILES:
            self.send_error(404, "File not found")
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path not in ("/api/ping", "/api/save", "/api/load"):
            self.send_error(404)
            return

        if not self._check_rate_limit():
            self._send_json({"error": "請求過於頻繁，請稍後再試"}, status=429)
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
        except ValueError:
            self._send_json({"error": "Invalid Content-Length"}, status=400)
            return

        if length < 0 or length > MAX_BODY_BYTES:
            self._send_json({"error": "Payload too large"}, status=413)
            return

        raw = self.rfile.read(length).decode("utf-8", errors="replace") if length > 0 else "{}"
        try:
            payload = json.loads(raw)
            if not isinstance(payload, dict):
                payload = {}
        except Exception:
            payload = {}

        if parsed.path == "/api/save":
            account = clean_text(payload.get("account"), "", 16)
            pin = str(payload.get("pin", "")).strip()
            if not account or not re.match(r"^[0-9a-zA-Z]{4,12}$", pin):
                self._send_json({"ok": False, "error": "請輸入勇者名稱（或學號）與 4～12 位英數密碼"}, status=400)
                return

            pin_hash = hash_pin(account, pin)
            clean_save = sanitize_save_payload(payload.get("saveData"))
            clean_save["myName"] = clean_text(clean_save.get("myName") or account, account, 12)

            with STATE_LOCK:
                saves = load_cloud_saves()
                existing = saves.get(account)
                if existing and existing.get("pinHash") != pin_hash:
                    self._send_json({"ok": False, "error": "此名稱已被使用且守護密碼不符，請確認密碼或換個名稱"}, status=403)
                    return
                if account not in saves and len(saves) >= MAX_SAVES:
                    oldest_acc = min(saves.keys(), key=lambda k: saves[k].get("updatedAt", 0))
                    del saves[oldest_acc]

                saves[account] = {
                    "pinHash": pin_hash,
                    "updatedAt": time.time(),
                    "saveData": clean_save
                }
                write_cloud_saves(saves)

            self._send_json({"ok": True, "account": account, "saveData": clean_save})
            return

        if parsed.path == "/api/load":
            account = clean_text(payload.get("account"), "", 16)
            pin = str(payload.get("pin", "")).strip()
            if not account or not pin:
                self._send_json({"ok": False, "error": "請輸入勇者名稱（或學號）與守護密碼"}, status=400)
                return

            pin_hash = hash_pin(account, pin)
            with STATE_LOCK:
                saves = load_cloud_saves()
                record = saves.get(account)

            if not record or record.get("pinHash") != pin_hash:
                self._send_json({"ok": False, "error": "找不到此存檔或守護密碼不正確"}, status=404)
                return

            self._send_json({
                "ok": True,
                "account": account,
                "updatedAt": record.get("updatedAt"),
                "saveData": record.get("saveData", {})
            })
            return

        now = time.time()
        raw_id = str(payload.get("id", "")).strip()
        pid = raw_id if SAFE_ID_RE.match(raw_id) else ""

        with STATE_LOCK:
            if pid:
                # 若超過最大人數上限，淘汰最久未更新的項目
                if pid not in PEERS and len(PEERS) >= MAX_PEERS:
                    oldest_key = min(PEERS.keys(), key=lambda k: PEERS[k].get("ts", 0))
                    del PEERS[oldest_key]

                avatar = str(payload.get("avatar", "🐣")).strip()
                if avatar not in ALLOWED_AVATARS:
                    avatar = "🐣"

                color = str(payload.get("color", "#f472b6")).strip()
                if not HEX_COLOR_RE.match(color):
                    color = "#f472b6"

                name = clean_text(payload.get("name"), "神秘學員", 12)
                action = clean_text(payload.get("action"), "探索島嶼中", 28)
                ch_id = safe_int(payload.get("chId"), 1, 1, 15)
                stars = safe_int(payload.get("stars"), 0, 0, 45)
                lv = safe_int(payload.get("lv"), 1, 1, 8)

                PEERS[pid] = {
                    "id": pid,
                    "name": name,
                    "avatar": avatar,
                    "color": color,
                    "chId": ch_id,
                    "action": action,
                    "stars": stars,
                    "lv": lv,
                    "ts": now
                }

            ev_text = payload.get("event")
            if ev_text and isinstance(ev_text, str):
                cleaned_ev = clean_text(ev_text, "", 75)
                if cleaned_ev:
                    EVENTS.append({
                        "id": f"{int(now * 1000)}-{len(EVENTS)}",
                        "text": cleaned_ev,
                        "chId": safe_int(payload.get("chId"), 1, 1, 15),
                        "ts": now
                    })
                    if len(EVENTS) > MAX_EVENTS:
                        del EVENTS[:-MAX_EVENTS]

            stale = [k for k, v in PEERS.items() if now - v.get("ts", 0) > 25]
            for k in stale:
                del PEERS[k]

            peers_list = list(PEERS.values())
            events_list = list(EVENTS[-12:])

        self._send_json({
            "ok": True,
            "peers": peers_list,
            "events": events_list
        })


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    with ThreadingHTTPServer(("", PORT), IslandHandler) as httpd:
        print(f"Serving Q-Island with Live Peers API on http://localhost:{PORT}")
        httpd.serve_forever()
