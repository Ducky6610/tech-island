import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ==========================================
// 1. 四大主題城區、15 座主題機關建築座標與 20 條城市協作幹道
// ==========================================
const UNITS = [
  { id: 1, code: "城區 01", name: "數位概念市政區", color: "#34d399", hex: 0x6ee7b7, rim: 0x10b981, chapters: [1, 2] },
  { id: 2, code: "城區 02", name: "系統硬體科技園區", color: "#60a5fa", hex: 0x93c5fd, rim: 0x3b82f6, chapters: [3, 4, 5] },
  { id: 3, code: "城區 03", name: "軟體文創與智財特區", color: "#f59e0b", hex: 0xfde047, rim: 0xd97706, chapters: [6, 7, 8, 9, 10] },
  { id: 4, code: "城區 04", name: "通訊網路樞紐特區", color: "#ec4899", hex: 0xf9a8d4, rim: 0xdb2777, chapters: [11, 12, 13, 14, 15] }
];

const ISLAND_LAYOUT = [
  // 城區 01：數位概念市政區 (第 1 排)
  { id: 1, unit: 1, gx: 0, gz: 0, bIcon: "🏛️", bName: "數位科技博物館", signText: "數位科技博物館" },
  { id: 2, unit: 1, gx: 1, gz: 0, bIcon: "🏦", bName: "二進位編碼資料銀行", signText: "二進位資料銀行" },
  // 城區 02：系統硬體科技園區 (第 1~2 排)
  { id: 3, unit: 2, gx: 2, gz: 0, bIcon: "🏭", bName: "半導體晶圓科技廠", signText: "半導體晶圓科技廠" },
  { id: 4, unit: 2, gx: 3, gz: 0, bIcon: "🏢", bName: "雲端運算系統大樓", signText: "雲端運算系統大樓" },
  { id: 5, unit: 2, gx: 0, gz: 1, bIcon: "🧪", bName: "AI 量子研發總部", signText: "AI 量子研發總部" },
  // 城區 03：軟體文創與智財特區 (第 2~3 排)
  { id: 6, unit: 3, gx: 1, gz: 1, bIcon: "🎬", bName: "數位多媒體文創大樓", signText: "數位多媒體文創館" },
  { id: 7, unit: 3, gx: 2, gz: 1, bIcon: "🏟️", bName: "電競網際娛樂巨蛋", signText: "電競網際娛樂巨蛋" },
  { id: 8, unit: 3, gx: 3, gz: 1, bIcon: "💻", bName: "軟體工程創客學院", signText: "軟體工程創客學院" },
  { id: 9, unit: 3, gx: 0, gz: 2, bIcon: "🏬", bName: "行動 App 商城中心", signText: "行動 App 商城中心" },
  { id: 10, unit: 3, gx: 1, gz: 2, bIcon: "⚖️", bName: "智慧財產管理局", signText: "智慧財產管理局" },
  // 城區 04：通訊網路樞紐特區 (第 3~4 排)
  { id: 11, unit: 4, gx: 2, gz: 2, bIcon: "📡", bName: "電信通訊衛星總局", signText: "電信通訊衛星總局" },
  { id: 12, unit: 4, gx: 3, gz: 2, bIcon: "🖧", bName: "光纖路由機房中心", signText: "光纖路由機房中心" },
  { id: 13, unit: 4, gx: 0, gz: 3, bIcon: "🚉", bName: "網路拓樸轉運總站", signText: "網路拓樸轉運總站" },
  { id: 14, unit: 4, gx: 1, gz: 3, bIcon: "🗼", bName: "OSI 七層協定摩天塔", signText: "OSI 協定摩天塔" },
  { id: 15, unit: 4, gx: 2, gz: 3, bIcon: "🧭", bName: "DNS 網域導航總署", signText: "DNS 網域導航總署" }
];

const COLLAB_LINKS = [
  { a: 1, b: 2, desc: "資料與資訊的處理，需透過數字系統與編碼進行數位化儲存" },
  { a: 1, b: 5, desc: "第五代電腦與生成式 AI、AI PC、量子電腦的未來發展脈絡" },
  { a: 2, b: 3, desc: "二進位位元與儲存單位（Byte/TB），對應記憶體與硬碟容量規格" },
  { a: 2, b: 6, desc: "點陣圖/向量圖與取樣率數位化原理，直接應用於影像與影音編輯軟體" },
  { a: 2, b: 15, desc: "二進位、十進位與十六進位轉換，應用於 IPv4 子網路 AND 運算與 IPv6 表示法" },
  { a: 3, b: 4, desc: "CPU、記憶體等電腦硬體，需由作業系統與驅動程式協調控制" },
  { a: 3, b: 5, desc: "多核心 CPU 硬體架構，搭配作業系統的工作排程與平行處理" },
  { a: 3, b: 9, desc: "行動裝置感測器、eSIM 與觸控螢幕硬體，支撐智慧型手機 App 生態" },
  { a: 4, b: 5, desc: "作業系統核心功能落地：程序排程、記憶體管理、檔案保護與網路控管" },
  { a: 4, b: 7, desc: "SaaS 雲端軟體服務，透過瀏覽器與各類網際網路應用軟體呈現給使用者" },
  { a: 4, b: 8, desc: "系統軟體中的公用程式與語言翻譯程式，延伸至工具軟體與程式開發" },
  { a: 4, b: 10, desc: "Linux、Android 等開放原始碼作業系統，對應自由軟體與開源授權規範" },
  { a: 4, b: 11, desc: "區域網路（LAN）、廣域網路（WAN）與雲端架構的底層通訊原理" },
  { a: 6, b: 10, desc: "商用辦公室與影音套裝軟體、免費/共享軟體的授權模式與著作權保護" },
  { a: 7, b: 14, desc: "瀏覽器與電子郵件軟體，運作於 TCP/IP 應用層（HTTP、SMTP、POP3、IMAP）" },
  { a: 7, b: 15, desc: "網頁瀏覽器透過 URL 網址與 DNS 網域名稱解析，取得遠端伺服器資源" },
  { a: 8, b: 9, desc: "程式語言開發觀念延伸至 App Inventor 積木式行動裝置軟體開發" },
  { a: 11, b: 12, desc: "基頻/寬頻訊號與雙工傳輸模式，落實於雙絞線、光纖與無線網路設備" },
  { a: 12, b: 13, desc: "集線器、交換器、路由器等網路裝置，構成星狀、網狀拓樸與主從式架構" },
  { a: 14, b: 15, desc: "OSI 網路層與 TCP/IP 協定，透過 IP 位址、子網路遮罩、DHCP 與 NAT 進行定址路由" }
];

// 勇者等級頭銜表
const LEVEL_TITLES = [
  { lv: 1, title: "初心者學徒", avatar: "🐣" },
  { lv: 2, title: "二進位探險家", avatar: "🐹" },
  { lv: 3, title: "硬體組裝員", avatar: "🦊" },
  { lv: 4, title: "系統領航員", avatar: "🐼" },
  { lv: 5, title: "雲端魔法師", avatar: "🦄" },
  { lv: 6, title: "網路架構師", avatar: "🦁" },
  { lv: 7, title: "演算法騎士", avatar: "🐲" },
  { lv: 8, title: "統測滿分王", avatar: "👑" }
];

// 10 大成就徽章定義
const BADGES = [
  { id: "first_island", icon: "🧭", name: "初訪科技城", desc: "造訪任意第 1 座主題建築", check: s => Object.keys(s.visited).length >= 1 },
  { id: "first_star", icon: "⭐", name: "首顆星光", desc: "在任一建築關卡獲得至少 1 顆星", check: s => totalStars(s) >= 1 },
  { id: "three_star", icon: "👑", name: "三星滿貫王", desc: "在任一建築關卡測驗全對奪得 3 顆星", check: s => Object.values(s.stars).some(v => v >= 3) },
  { id: "streak_5", icon: "🔥", name: "五連勝學霸", desc: "答題連續答對達 5 題以上", check: s => s.bestStreak >= 5 },
  { id: "unit1_clear", icon: "🏛️", name: "市政區榮譽市民", desc: "完成城區 01（Ch1~2）所有關卡奪星", check: s => [1, 2].every(i => (s.stars[i] || 0) >= 1) },
  { id: "unit2_clear", icon: "⚙️", name: "科技園區總工程師", desc: "完成城區 02（Ch3~5）所有關卡奪星", check: s => [3, 4, 5].every(i => (s.stars[i] || 0) >= 1) },
  { id: "unit3_clear", icon: "⚖️", name: "文創智財特使", desc: "完成城區 03（Ch6~10）所有關卡奪星", check: s => [6, 7, 8, 9, 10].every(i => (s.stars[i] || 0) >= 1) },
  { id: "unit4_clear", icon: "📡", name: "網路樞紐總指揮", desc: "完成城區 04（Ch11~15）所有關卡奪星", check: s => [11, 12, 13, 14, 15].every(i => (s.stars[i] || 0) >= 1) },
  { id: "card_collector", icon: "🃏", name: "圖鑑收集狂", desc: "在小辭典累積點亮 15 張以上魔法名詞卡", check: s => Object.keys(s.masteredTerms).length >= 15 },
  { id: "grand_master", icon: "🏆", name: "數位科技傳奇市長", desc: "全城累積達 30 顆星以上", check: s => totalStars(s) >= 30 }
];

const MASCOT_QUIPS = [
  "嗨！我是 Bit 博士 🤓 歡迎來到「數位科技智慧城市」！每棟主題建築都有 3 顆星⭐⭐⭐等你拿喔！",
  "看到第 10 關的「⚖️ 智慧財產管理局」了嗎？裡面有統測必考的著作權、專利權與創用 CC 授權！",
  "點開「📖 知識寶箱」讀完重點按『領取 +15 XP』，經驗值升級超快！",
  "統測必考秘訣：GIGO 是「垃圾進、垃圾出」，輸入正確資料才有正確資訊！",
  "想刺激一下嗎？點右上角粉紅色的「⚔️ 魔王戰」，打敗數位魔王贏取大把金幣 💰！",
  "旋轉地圖觀察街道上奔馳的彩色小汽車，探索整個模擬城市吧！🚗"
];

// ==========================================
// 2. Web Audio Q版闖關音效合成器（免外部音檔）
// ==========================================
let soundEnabled = true;
let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}

function playSfx(type) {
  if (!soundEnabled) return;
  try {
    ensureAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    const tone = (freq, start, dur, wave = "sine", gainVal = 0.12) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(gainVal, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur);
    };

    if (type === "pop") {
      tone(520, 0, 0.08, "triangle", 0.12);
      tone(780, 0.05, 0.1, "triangle", 0.12);
    } else if (type === "coin") {
      tone(987.77, 0, 0.08, "square", 0.08);
      tone(1318.51, 0.07, 0.22, "square", 0.09);
    } else if (type === "correct") {
      tone(523.25, 0, 0.09, "triangle", 0.14);
      tone(659.25, 0.08, 0.09, "triangle", 0.14);
      tone(783.99, 0.16, 0.12, "triangle", 0.14);
      tone(1046.5, 0.25, 0.25, "triangle", 0.16);
    } else if (type === "wrong") {
      tone(280, 0, 0.14, "sawtooth", 0.09);
      tone(195, 0.12, 0.24, "sawtooth", 0.09);
    } else if (type === "fanfare") {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
        tone(f, i * 0.08, 0.24, "triangle", 0.15);
      });
    }
  } catch (_) {}
}

// ==========================================
// 3. 遊戲化狀態管理與視覺特效（飄字 XP + 彩紙）
// ==========================================
const chapters = window.CHAPTERS || {};
let selectedId = null;
let activeUnitFilter = null;
let activeTab = "sections";
let showLinks = true;
let tourTimer = null;

// ==========================================
// 資安防護輔助函式：HTML 跳脫 (防範 XSS) 與存檔清理
// ==========================================
function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanUserText(str, fallback = "", maxLen = 12) {
  const s = String(str ?? "")
    .replace(/[\x00-\x1f\x7f<>]/g, "")
    .trim();
  return (s || fallback).slice(0, maxLen);
}

const AVATAR_CHOICES = ["🐣", "🐰", "🦊", "🐱", "🐼", "🐹", "🦄", "🐨", "🐯", "🐸", "🦁", "🐲"];

const defaultSave = {
  xp: 0,
  coins: 50,
  streak: 0,
  bestStreak: 0,
  visited: {},
  stars: {}, // { chId: 0..3 }
  readSections: {}, // { "ch-secIdx": true }
  masteredTerms: {}, // { "ch-termIdx": true }
  questCh: 1,
  myId: "",
  myName: "",
  myAvatar: "",
  hasSetCustomName: false
};

function sanitizeSaveData(rawObj) {
  if (!rawObj || typeof rawObj !== "object" || Array.isArray(rawObj)) return { ...defaultSave };
  const safe = { ...defaultSave };
  safe.xp = Math.max(0, Math.min(99999, Number(rawObj.xp) || 0));
  safe.coins = Math.max(0, Math.min(99999, Number(rawObj.coins) ?? 50));
  safe.streak = Math.max(0, Math.min(999, Number(rawObj.streak) || 0));
  safe.bestStreak = Math.max(0, Math.min(999, Number(rawObj.bestStreak) || 0));
  safe.questCh = Math.max(1, Math.min(15, Number(rawObj.questCh) || 1));

  if (rawObj.visited && typeof rawObj.visited === "object" && !Array.isArray(rawObj.visited)) {
    for (let i = 1; i <= 15; i++) {
      if (rawObj.visited[i]) safe.visited[i] = true;
    }
  }
  if (rawObj.stars && typeof rawObj.stars === "object" && !Array.isArray(rawObj.stars)) {
    for (let i = 1; i <= 15; i++) {
      const sc = Number(rawObj.stars[i]) || 0;
      if (sc > 0) safe.stars[i] = Math.max(0, Math.min(3, sc));
    }
  }
  if (rawObj.readSections && typeof rawObj.readSections === "object" && !Array.isArray(rawObj.readSections)) {
    Object.keys(rawObj.readSections).slice(0, 200).forEach(k => {
      if (/^\d{1,2}-\d{1,2}$/.test(k) && rawObj.readSections[k]) safe.readSections[k] = true;
    });
  }
  if (rawObj.masteredTerms && typeof rawObj.masteredTerms === "object" && !Array.isArray(rawObj.masteredTerms)) {
    Object.keys(rawObj.masteredTerms).slice(0, 300).forEach(k => {
      if (/^\d{1,2}-\d{1,2}$/.test(k) && rawObj.masteredTerms[k]) safe.masteredTerms[k] = true;
    });
  }
  if (typeof rawObj.myId === "string" && /^[a-zA-Z0-9_-]{3,36}$/.test(rawObj.myId)) {
    safe.myId = rawObj.myId;
  }
  if (typeof rawObj.myName === "string" && rawObj.myName.trim()) {
    safe.myName = cleanUserText(rawObj.myName, "", 12);
  }
  if (typeof rawObj.myAvatar === "string" && AVATAR_CHOICES.includes(rawObj.myAvatar)) {
    safe.myAvatar = rawObj.myAvatar;
  }
  safe.hasSetCustomName = Boolean(rawObj.hasSetCustomName && safe.myName);
  return safe;
}

let parsedStorage = {};
try {
  parsedStorage = JSON.parse(localStorage.getItem("dt_q_island_save_v2") || "{}");
} catch (_) {
  parsedStorage = {};
}
const gameState = sanitizeSaveData(parsedStorage);

function totalStars(s = gameState) {
  return Object.values(s.stars || {}).reduce((a, b) => a + b, 0);
}

function getLevelInfo(xp = gameState.xp) {
  const lv = Math.min(8, Math.floor(xp / 100) + 1);
  const info = LEVEL_TITLES.find(x => x.lv === lv) || LEVEL_TITLES[0];
  const curLvXp = xp % 100;
  const avatar = gameState.myAvatar || info.avatar;
  return { ...info, avatar, curLvXp, nextLvXp: 100 };
}

function saveGame() {
  localStorage.setItem("dt_q_island_save_v2", JSON.stringify(gameState));
  renderTopHUD();
  renderProgressUI();
  updateIslandBadges();
}

const fxLayer = document.getElementById("fx-layer");

function spawnFloatingText(text, x, y) {
  const el = document.createElement("div");
  el.className = "float-xp";
  el.textContent = text;
  el.style.left = `${x || window.innerWidth / 2}px`;
  el.style.top = `${y || window.innerHeight / 2}px`;
  fxLayer.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function spawnConfetti(cx = window.innerWidth / 2, cy = window.innerHeight / 2, count = 36) {
  const colors = ["#ff5d8f", "#fde047", "#38bdf8", "#4ade80", "#c084fc", "#fb923c"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.background = colors[i % colors.length];
    p.style.left = `${cx}px`;
    p.style.top = `${cy}px`;
    const ang = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 190;
    p.style.setProperty("--dx", `${Math.cos(ang) * dist}px`);
    p.style.setProperty("--dy", `${Math.sin(ang) * dist + 90}px`);
    fxLayer.appendChild(p);
    setTimeout(() => p.remove(), 1550);
  }
}

function rewardPlayer(xpDelta, coinDelta, evt) {
  const oldLv = getLevelInfo(gameState.xp).lv;
  gameState.xp += xpDelta;
  gameState.coins += coinDelta;
  const newLv = getLevelInfo(gameState.xp).lv;

  const x = evt?.clientX || window.innerWidth - 260;
  const y = evt?.clientY || 120;
  spawnFloatingText(`+${xpDelta} XP  💰+${coinDelta}`, x, y);

  if (newLv > oldLv) {
    playSfx("fanfare");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 55);
    const info = getLevelInfo(gameState.xp);
    triggerMascotSpeech(`🎉 恭喜升級到 Lv.${info.lv}「${info.title}」 ${info.avatar}！太強啦！`);
  }
  saveGame();
}

function getUnit(unitId) {
  return UNITS.find(u => u.id === unitId);
}
function getIslandMeta(chId) {
  return ISLAND_LAYOUT.find(x => x.id === chId);
}

// ==========================================
// 4. Three.js Q版糖果風 3D 場景初始化
// ==========================================
const container = document.getElementById("scene");
const labelsContainer = document.getElementById("labels");

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x72efdd, 0.0038);

// 模擬城市等角斜俯視角（Classic Isometric / SimCity Perspective）
const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.5, 600);
function getOverviewCamPos() {
  const w = window.innerWidth;
  if (w <= 767) return new THREE.Vector3(58, 68, 58);
  if (w <= 1180) return new THREE.Vector3(52, 60, 52);
  return new THREE.Vector3(46, 52, 46);
}
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);
camera.position.copy(getOverviewCamPos());

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.maxPolarAngle = Math.PI / 1.88;
controls.minPolarAngle = 0.22;
controls.minDistance = 16;
controls.maxDistance = 190;
controls.target.copy(DEFAULT_TARGET);

let camAnim = null;
function flyTo(targetPos, lookAtPos, duration = 850) {
  camAnim = {
    startPos: camera.position.clone(),
    endPos: targetPos.clone(),
    startTarget: controls.target.clone(),
    endTarget: lookAtPos.clone(),
    startTime: performance.now(),
    duration
  };
}

// 明亮糖果光影
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x38bdf8, 1.05);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.45);
dirLight.position.set(45, 75, 42);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 10;
dirLight.shadow.camera.far = 220;
const d = 88;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;
scene.add(dirLight);

// 絲滑柔波粉藍蘇打海洋（無稜角平滑法線）
const waterGeo = new THREE.PlaneGeometry(520, 520, 64, 64);
waterGeo.rotateX(-Math.PI / 2);
const waterPos = waterGeo.attributes.position;
const waterBaseY = new Float32Array(waterPos.count);
for (let i = 0; i < waterPos.count; i++) {
  const x = waterPos.getX(i);
  const z = waterPos.getZ(i);
  waterBaseY[i] = Math.sin(x * 0.08) * Math.cos(z * 0.08) * 0.14;
}
waterGeo.computeVertexNormals();

const waterMat = new THREE.MeshStandardMaterial({
  color: 0x00b4d8,
  roughness: 0.32,
  metalness: 0.05,
  flatShading: false
});
const waterMesh = new THREE.Mesh(waterGeo, waterMat);
// 外圍港灣海洋環繞著整座數位科技智慧城市半島
waterMesh.position.y = -2.25;
waterMesh.receiveShadow = true;
scene.add(waterMesh);

// 建立《模擬城市 SimCity》棋盤方格網狀城市地面（寬闊水泥地基、方正街區、路口斑馬線與綠化公園）
const cityGroundGroup = new THREE.Group();
const BLOCK_SIZE = 14.0;
const ROAD_WIDTH = 2.8;
const CITY_SPAN = BLOCK_SIZE * 4; // 56.0
const CITY_ORIGIN = -CITY_SPAN / 2; // -28.0
const movingCars = [];

{
  // 1. 城市整體方形地基與邊緣石護坡
  const cityBaseGeo = new THREE.BoxGeometry(72, 2.5, 72);
  const cityBaseMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.7 });
  const cityBase = new THREE.Mesh(cityBaseGeo, cityBaseMat);
  cityBase.position.set(0, -1.25, 0);
  cityBase.receiveShadow = true;
  cityGroundGroup.add(cityBase);

  // 2. 綠意草坪基底層
  const lawnGeo = new THREE.BoxGeometry(69, 0.25, 69);
  const lawnMat = new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.65 });
  const lawn = new THREE.Mesh(lawnGeo, lawnMat);
  lawn.position.set(0, 0.05, 0);
  lawn.receiveShadow = true;
  cityGroundGroup.add(lawn);

  // 3. 模擬城市 5x5 棋盤式雙向柏油馬路網格（南北向 5 條 + 東西向 5 條）
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const zebraMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i <= 4; i++) {
    const coord = CITY_ORIGIN + i * BLOCK_SIZE;

    // 南北向主幹道（沿 Z 軸）
    const roadNS = new THREE.Mesh(new THREE.BoxGeometry(ROAD_WIDTH, 0.08, CITY_SPAN + ROAD_WIDTH), roadMat);
    roadNS.position.set(coord, 0.14, 0);
    roadNS.receiveShadow = true;
    cityGroundGroup.add(roadNS);

    // 南北向黃色虛線
    const lineNS = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, CITY_SPAN), lineMat);
    lineNS.position.set(coord, 0.16, 0);
    cityGroundGroup.add(lineNS);

    // 東西向主幹道（沿 X 軸）
    const roadEW = new THREE.Mesh(new THREE.BoxGeometry(CITY_SPAN + ROAD_WIDTH, 0.08, ROAD_WIDTH), roadMat);
    roadEW.position.set(0, 0.14, coord);
    roadEW.receiveShadow = true;
    cityGroundGroup.add(roadEW);

    // 東西向黃色虛線
    const lineEW = new THREE.Mesh(new THREE.BoxGeometry(CITY_SPAN, 0.09, 0.12), lineMat);
    lineEW.position.set(0, 0.16, coord);
    cityGroundGroup.add(lineEW);
  }

  // 4. 路口斑馬線與行人道設施
  for (let ix = 0; ix <= 4; ix++) {
    for (let iz = 0; iz <= 4; iz++) {
      const cx = CITY_ORIGIN + ix * BLOCK_SIZE;
      const cz = CITY_ORIGIN + iz * BLOCK_SIZE;
      // 在十字路口四邊加上白色斑馬線
      for (const [ox, oz, w, d] of [
        [0, ROAD_WIDTH * 0.72, ROAD_WIDTH * 0.8, 0.45],
        [0, -ROAD_WIDTH * 0.72, ROAD_WIDTH * 0.8, 0.45],
        [ROAD_WIDTH * 0.72, 0, 0.45, ROAD_WIDTH * 0.8],
        [-ROAD_WIDTH * 0.72, 0, 0.45, ROAD_WIDTH * 0.8]
      ]) {
        const zebra = new THREE.Mesh(new THREE.BoxGeometry(w, 0.1, d), zebraMat);
        zebra.position.set(cx + ox, 0.17, cz + oz);
        cityGroundGroup.add(zebra);
      }
    }
  }

  // 5. 街區行駛的模擬城市小汽車（依車道巡航）
  const carColors = [0xef4444, 0x3b82f6, 0xf59e0b, 0x10b981, 0xec4899, 0x8b5cf6, 0xffffff];
  for (let c = 0; c < 12; c++) {
    const isNS = c % 2 === 0;
    const laneIdx = Math.floor(Math.random() * 5);
    const laneCoord = CITY_ORIGIN + laneIdx * BLOCK_SIZE + (c % 4 < 2 ? 0.65 : -0.65);
    const carGroup = new THREE.Group();
    const cColor = carColors[c % carColors.length];

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(isNS ? 0.75 : 1.35, 0.42, isNS ? 1.35 : 0.75),
      new THREE.MeshStandardMaterial({ color: cColor, roughness: 0.35 })
    );
    body.position.y = 0.28;
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(isNS ? 0.65 : 0.75, 0.35, isNS ? 0.75 : 0.65),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 })
    );
    roof.position.y = 0.58;
    carGroup.add(body, roof);
    cityGroundGroup.add(carGroup);

    movingCars.push({
      group: carGroup,
      isNS,
      laneCoord,
      pos: (Math.random() - 0.5) * CITY_SPAN,
      speed: (isNS ? 1 : -1) * (4.5 + Math.random() * 3.5)
    });
  }
}
scene.add(cityGroundGroup);

// 圓潤蓬鬆棉花糖白雲（漂浮於智慧城市天際線上方）
const skyClouds = [];
const cloudWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.42, flatShading: false });
const cloudSoftPinkMat = new THREE.MeshStandardMaterial({ color: 0xfff0f6, roughness: 0.45, flatShading: false });
for (let i = 0; i < 16; i++) {
  const cg = new THREE.Group();
  const cMat = i % 3 === 0 ? cloudSoftPinkMat : cloudWhiteMat;
  const p1 = new THREE.Mesh(new THREE.SphereGeometry(2.2, 24, 24), cMat);
  p1.scale.set(1.2, 0.82, 1.0);
  const p2 = new THREE.Mesh(new THREE.SphereGeometry(1.7, 24, 24), cMat);
  p2.position.set(1.85, -0.22, 0.25);
  const p3 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 24, 24), cMat);
  p3.position.set(-1.75, -0.28, -0.2);
  const p4 = new THREE.Mesh(new THREE.SphereGeometry(1.3, 20, 20), cMat);
  p4.position.set(0.3, 0.55, 0.65);
  cg.add(p1, p2, p3, p4);

  const ang = (i / 16) * Math.PI * 2;
  const rad = 52 + (i % 4) * 9;
  const baseY = 14 + (i % 4) * 2.8;
  cg.position.set(Math.cos(ang) * rad, baseY, Math.sin(ang) * rad);
  scene.add(cg);
  skyClouds.push({ mesh: cg, ang, rad, speed: 0.018 + (i % 3) * 0.005, baseY });
}

// 星空粒子
const starCount = 350;
const starGeo = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI * 0.42;
  const r = 140 + Math.random() * 30;
  starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  starPositions[i * 3 + 1] = r * Math.cos(phi) + 15;
  starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
}
starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
const starMat = new THREE.PointsMaterial({ color: 0xfef08a, size: 1.5, transparent: true, opacity: 0 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// ==========================================
// 5. 建立 15 座城市主題機關建築與街區廣場
// ==========================================
const islandGroups = new Map();
const pickableMeshes = [];
const nightBeaconMaterials = [];
const animatedProps = [];

// 模擬城市 4x4 方形街區座標映射函式
function gridToWorld(gx, gz) {
  const x = (gx - 1.5) * BLOCK_SIZE;
  const z = (gz - 1.5) * BLOCK_SIZE;
  return new THREE.Vector3(x, 0, z);
}

function makeMat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.45,
    metalness: opts.metalness ?? 0.04,
    flatShading: false,
    ...opts
  });
}

function makeGlowMat(color) {
  const m = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.42,
    roughness: 0.25,
    flatShading: false
  });
  nightBeaconMaterials.push(m);
  return m;
}

// 產生立體建築正面中文招牌（如「⚖️ 智慧財產管理局」）
function createBuildingSignboard(signText, borderHexCss = "#f472b6") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // 圓潤膠囊白底 + 主題色外框
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = borderHexCss;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.roundRect(12, 12, 488, 104, 52);
  ctx.fill();
  ctx.stroke();

  // 建築機關名稱文字
  ctx.fillStyle = "#2d1e2f";
  ctx.font = "900 44px 'PingFang TC', 'Microsoft JhengHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(signText, 256, 66);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const signGeo = new THREE.PlaneGeometry(2.75, 0.68);
  const signMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
  const signMesh = new THREE.Mesh(signGeo, signMat);
  return signMesh;
}

// 輔助函式：在建築物外牆貼上發光玻璃窗格
function addBuildingWindows(parent, width, floors, startY, zFront, winMat) {
  const cols = Math.max(2, Math.floor(width / 0.72));
  const spacingX = (width * 0.72) / Math.max(1, cols - 1);
  for (let r = 0; r < floors; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = -width * 0.36 + c * spacingX;
      const wy = startY + r * 0.62;
      const wMesh = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.36, 0.08), winMat);
      wMesh.position.set(wx, wy, zFront);
      parent.add(wMesh);
    }
  }
}

function buildChapterLandmark(chId, unitHex, itemMeta, unitColorCss) {
  const g = new THREE.Group();
  const glow = makeGlowMat(unitHex);
  const whiteMat = makeMat(0xffffff);
  const creamMat = makeMat(0xfffbeb);
  const darkMat = makeMat(0x334155);
  const glassMat = makeGlowMat(0xbae6fd);
  const goldMat = makeGlowMat(0xfde047);
  const pinkMat = makeMat(0xff8fa3);

  let signY = 2.65;
  let signZ = 1.65;
  let crownY = 4.65;

  switch (chId) {
    case 1: {
      // 🏛️ Ch.01 數位科技博物館：圓頂玻璃科學館 + 门廊立柱 + 屋頂巨型發光靈感燈泡與數位環
      const hall = new THREE.Mesh(new THREE.BoxGeometry(3.3, 1.9, 2.5), creamMat);
      hall.position.y = 0.95;
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.45, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2), makeMat(0x6ee7b7));
      dome.position.y = 1.9;
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.05, 0.12), glassMat);
      door.position.set(0, 0.52, 1.26);
      g.add(hall, dome, door);
      for (const px of [-1.2, -0.6, 0.6, 1.2]) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 1.75, 18), whiteMat);
        col.position.set(px, 0.88, 1.32);
        g.add(col);
      }
      addBuildingWindows(g, 2.8, 2, 0.68, 1.26, glassMat);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 24), goldMat);
      bulb.position.y = 3.65;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.09, 16, 40), glow);
      ring.position.y = 3.65;
      ring.rotation.x = Math.PI / 3;
      g.add(bulb, ring);
      animatedProps.push({ mesh: ring, type: "spin", speed: 1.3 });
      signY = 2.15;
      signZ = 1.42;
      crownY = 4.75;
      break;
    }
    case 2: {
      // 🏦 Ch.02 二進位編碼資料銀行：金庫廊柱大樓 + 屋頂巨型 0 與 1 金幣雕塑 + 取樣聲波柱
      const bankBody = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 2.5), whiteMat);
      bankBody.position.y = 1.1;
      const roof = new THREE.Mesh(new THREE.BoxGeometry(3.65, 0.32, 2.75), makeMat(0x10b981));
      roof.position.y = 2.32;
      // 圓形銀行金庫大門
      const vaultDoor = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.18, 28), goldMat);
      vaultDoor.rotation.x = Math.PI / 2;
      vaultDoor.position.set(0, 0.72, 1.28);
      g.add(bankBody, roof, vaultDoor);
      addBuildingWindows(g, 2.9, 2, 0.75, 1.26, glassMat);
      const zero = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.16, 18, 32), goldMat);
      zero.position.set(-0.62, 3.25, 0);
      const one = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.78, 14, 20), goldMat);
      one.position.set(0.62, 3.25, 0);
      g.add(zero, one);
      signY = 2.32;
      signZ = 1.48;
      crownY = 4.45;
      break;
    }
    case 3: {
      // 🏭 Ch.03 半導體晶圓科技廠：晶圓無塵室廠房 + 金色 IC 針腳外牆 + 屋頂巨型 CPU 核心
      const fab = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.85, 2.8), makeMat(0xe2e8f0));
      fab.position.y = 0.92;
      const pcbRoof = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.28, 3.0), makeMat(0x10b981));
      pcbRoof.position.y = 1.95;
      const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.42, 1.75), darkMat);
      cpuDie.position.y = 2.28;
      const cpuCore = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.48, 28), glow);
      cpuCore.position.y = 2.35;
      g.add(fab, pcbRoof, cpuDie, cpuCore);
      addBuildingWindows(g, 3.0, 2, 0.65, 1.41, glassMat);
      // 金色 IC 晶片排針腳
      for (let i = -3; i <= 3; i++) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.24), goldMat);
        pin.position.set(i * 0.48, 0.24, 1.46);
        g.add(pin);
      }
      signY = 2.02;
      signZ = 1.56;
      crownY = 3.85;
      break;
    }
    case 4: {
      // 🏢 Ch.04 雲端運算系統大樓：藍紫粉三層階梯式玻璃摩天大樓 + 頂樓漂浮雲端資料中心
      const layerColors = [0x60a5fa, 0xa78bfa, 0xf472b6];
      for (let i = 0; i < 3; i++) {
        const w = 3.2 - i * 0.45;
        const d = 2.4 - i * 0.32;
        const floorBox = new THREE.Mesh(new THREE.BoxGeometry(w, 0.92, d), makeMat(layerColors[i]));
        floorBox.position.y = 0.46 + i * 0.92;
        g.add(floorBox);
        addBuildingWindows(g, w * 0.85, 1, 0.48 + i * 0.92, d / 2 + 0.02, glassMat);
      }
      const cloud = new THREE.Group();
      const c1 = new THREE.Mesh(new THREE.SphereGeometry(0.75, 24, 24), whiteMat);
      const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.58, 24, 24), whiteMat);
      c2.position.set(0.65, -0.08, 0.1);
      const c3 = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 24), whiteMat);
      c3.position.set(-0.62, -0.1, -0.1);
      cloud.add(c1, c2, c3);
      cloud.position.y = 3.55;
      g.add(cloud);
      animatedProps.push({ mesh: cloud, type: "float", baseY: 3.55, speed: 2.2 });
      signY = 2.38;
      signZ = 1.32;
      crownY = 4.65;
      break;
    }
    case 5: {
      // 🧪 Ch.05 AI 量子研發總部：雙塔未來實驗室 + 空中走廊 + 旋轉黃金 AI 核心與精密齒輪
      const towerL = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.92, 2.6, 28), whiteMat);
      towerL.position.set(-1.05, 1.3, 0);
      const towerR = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.92, 2.6, 28), whiteMat);
      towerR.position.set(1.05, 1.3, 0);
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 1.15), glow);
      bridge.position.set(0, 1.65, 0.25);
      g.add(towerL, towerR, bridge);
      const aiCore = new THREE.Mesh(new THREE.SphereGeometry(0.68, 28, 28), goldMat);
      aiCore.position.y = 3.35;
      const aiRing = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.09, 16, 40), pinkMat);
      aiRing.position.y = 3.35;
      aiRing.rotation.x = Math.PI / 4;
      g.add(aiCore, aiRing);
      animatedProps.push({ mesh: aiRing, type: "spin", speed: 1.6 });
      signY = 2.42;
      signZ = 1.15;
      crownY = 4.65;
      break;
    }
    case 6: {
      // 🎬 Ch.06 數位多媒體文創大樓：影視文創大樓 + 場記板屋簷 + 3D 統計圖表與文件雕塑
      const studio = new THREE.Mesh(new THREE.BoxGeometry(3.3, 2.35, 2.4), creamMat);
      studio.position.y = 1.18;
      const awning = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.36, 2.6), pinkMat);
      awning.position.y = 2.42;
      g.add(studio, awning);
      addBuildingWindows(g, 2.8, 3, 0.58, 1.21, glassMat);
      const doc = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.15, 0.22), whiteMat);
      doc.position.set(-0.62, 3.15, 0);
      doc.rotation.y = 0.2;
      const chart = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.18, 28), goldMat);
      chart.position.set(0.65, 3.15, 0);
      g.add(doc, chart);
      signY = 2.45;
      signZ = 1.38;
      crownY = 4.5;
      break;
    }
    case 7: {
      // 🏟️ Ch.07 電競網際娛樂巨蛋：圓弧巨蛋體育館 + 霓虹光環 + 屋頂全息地球儀
      const stadiumBase = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 2.15, 1.25, 36), whiteMat);
      stadiumBase.position.y = 0.62;
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.88, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2), makeMat(0xfde047));
      dome.scale.set(1, 0.72, 1);
      dome.position.y = 1.22;
      const neonBelt = new THREE.Mesh(new THREE.TorusGeometry(1.98, 0.1, 16, 48), pinkMat);
      neonBelt.rotation.x = Math.PI / 2;
      neonBelt.position.y = 1.22;
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.68, 28, 28), glow);
      globe.position.y = 3.35;
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.07, 14, 36), goldMat);
      orbit.position.y = 3.35;
      orbit.rotation.x = Math.PI / 2.6;
      g.add(stadiumBase, dome, neonBelt, globe, orbit);
      animatedProps.push({ mesh: orbit, type: "spin", speed: 1.2 });
      signY = 1.95;
      signZ = 1.95;
      crownY = 4.55;
      break;
    }
    case 8: {
      // 💻 Ch.08 軟體工程創客學院：創客教學大樓 + 巨型寬螢幕程式終端機外牆 + 開發齒輪
      const campus = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.15, 2.3), whiteMat);
      campus.position.y = 1.08;
      const monitorFrame = new THREE.Mesh(new THREE.BoxGeometry(2.65, 1.45, 0.28), makeMat(0x8b5cf6));
      monitorFrame.position.set(0, 2.95, 0.2);
      const screen = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.18, 0.32), glow);
      screen.position.set(0, 2.95, 0.22);
      g.add(campus, monitorFrame, screen);
      addBuildingWindows(g, 2.9, 2, 0.65, 1.16, glassMat);
      signY = 2.08;
      signZ = 1.28;
      crownY = 4.45;
      break;
    }
    case 9: {
      // 🏬 Ch.09 行動 App 商城中心：智慧型手機摩天百貨大樓 + 9 宮格繽紛 App 圖示櫥窗
      const mallBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.15, 2.3), creamMat);
      mallBase.position.y = 0.58;
      const phoneTower = new THREE.Mesh(new THREE.BoxGeometry(2.15, 2.95, 0.95), pinkMat);
      phoneTower.position.y = 2.15;
      const phoneScreen = new THREE.Mesh(new THREE.BoxGeometry(1.85, 2.45, 0.98), darkMat);
      phoneScreen.position.set(0, 2.18, 0.02);
      g.add(mallBase, phoneTower, phoneScreen);
      const appColors = [0x38bdf8, 0x34d399, 0xfbbf24, 0xf472b6, 0xa78bfa, 0xfb923c];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const iconBox = new THREE.Mesh(
            new THREE.BoxGeometry(0.42, 0.42, 0.08),
            makeGlowMat(appColors[(r * 3 + c) % appColors.length])
          );
          iconBox.position.set((c - 1) * 0.54, 1.45 + r * 0.62, 0.52);
          g.add(iconBox);
        }
      }
      signY = 1.25;
      signZ = 1.28;
      crownY = 4.35;
      break;
    }
    case 10: {
      // ⚖️ Ch.10 智慧財產管理局：莊重白色古典廊柱市政廳 + 三角山牆屋頂 + 黃金公平天平與專利護盾
      const steps = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.35, 2.9), makeMat(0xe2e8f0));
      steps.position.y = 0.18;
      const bureauHall = new THREE.Mesh(new THREE.BoxGeometry(3.3, 2.05, 2.3), whiteMat);
      bureauHall.position.y = 1.2;
      // 古典四大羅馬廊柱
      for (const cx of [-1.25, -0.45, 0.45, 1.25]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 2.05, 20), creamMat);
        pillar.position.set(cx, 1.2, 1.28);
        g.add(pillar);
      }
      // 古典山牆三角屋頂
      const pediment = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 2.35, 0.95, 4), makeMat(0xf59e0b));
      pediment.rotation.y = Math.PI / 4;
      pediment.scale.set(1.15, 1, 0.85);
      pediment.position.y = 2.68;
      // 屋頂黃金公平天平（Scales of Justice）與智慧財產權護盾
      const scalePillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.15, 20), goldMat);
      scalePillar.position.y = 3.45;
      const beam = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 1.65, 12, 20), goldMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.y = 3.95;
      const panL = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.18, 0.16, 20), goldMat);
      panL.position.set(-0.78, 3.55, 0);
      const panR = panL.clone();
      panR.position.x = 0.78;
      const shield = new THREE.Mesh(new THREE.SphereGeometry(0.48, 24, 24), glow);
      shield.scale.set(1.0, 1.15, 0.35);
      shield.position.set(0, 2.55, 1.32);
      g.add(steps, bureauHall, pediment, scalePillar, beam, panL, panR, shield);
      addBuildingWindows(g, 2.6, 2, 0.75, 1.16, glassMat);
      signY = 2.18;
      signZ = 1.48;
      crownY = 4.75;
      break;
    }
    case 11: {
      // 📡 Ch.11 電信通訊衛星總局：電信大樓 + 紅白相間高聳微波電塔 + 衛星碟形天線與電波環
      const telecomBldg = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.85, 2.3), whiteMat);
      telecomBldg.position.y = 0.92;
      const tower = new THREE.Mesh(new THREE.ConeGeometry(0.65, 2.35, 28), pinkMat);
      tower.position.y = 2.95;
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 20), goldMat);
      beacon.position.y = 4.2;
      const wave = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.08, 16, 36), glow);
      wave.rotation.x = Math.PI / 2;
      wave.position.y = 3.85;
      g.add(telecomBldg, tower, beacon, wave);
      addBuildingWindows(g, 2.7, 2, 0.65, 1.16, glassMat);
      animatedProps.push({ mesh: wave, type: "pulse", speed: 2.2 });
      signY = 1.98;
      signZ = 1.32;
      crownY = 4.95;
      break;
    }
    case 12: {
      // 🖧 Ch.12 光纖路由機房中心：網路交換機房大樓 + 伺服器機櫃燈號牆 + 屋頂四天線巨型無線路由器
      const dcBldg = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.15, 2.4), darkMat);
      dcBldg.position.y = 1.08;
      const routerRoof = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, 0.42, 32), whiteMat);
      routerRoof.position.y = 2.35;
      g.add(dcBldg, routerRoof);
      addBuildingWindows(g, 2.8, 3, 0.55, 1.21, glow);
      for (let x of [-0.75, 0.75]) {
        for (let z of [-0.45, 0.45]) {
          const ant = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 1.05, 12, 18), goldMat);
          ant.position.set(x, 3.05, z);
          g.add(ant);
        }
      }
      signY = 2.18;
      signZ = 1.36;
      crownY = 4.35;
      break;
    }
    case 13: {
      // 🚉 Ch.13 網路拓樸轉運總站：六角中央車站大樓 + 五座放射狀星狀拓樸月台廊道
      const centralStation = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, 1.95, 6), whiteMat);
      centralStation.position.y = 0.98;
      const stationDome = new THREE.Mesh(new THREE.SphereGeometry(1.15, 24, 20), goldMat);
      stationDome.scale.set(1, 0.55, 1);
      stationDome.position.y = 2.05;
      g.add(centralStation, stationDome);
      for (let i = 0; i < 5; i++) {
        const ang = (i / 5) * Math.PI * 2;
        const nx = Math.cos(ang) * 1.95;
        const nz = Math.sin(ang) * 1.95;
        const terminal = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 1.05, 20), glow);
        terminal.position.set(nx, 0.52, nz);
        const concourse = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.45, 1.65), pinkMat);
        concourse.rotation.y = -ang + Math.PI / 2;
        concourse.position.set(nx * 0.5, 0.42, nz * 0.5);
        g.add(terminal, concourse);
      }
      signY = 2.35;
      signZ = 1.35;
      crownY = 3.95;
      break;
    }
    case 14: {
      // 🗼 Ch.14 OSI 七層協定摩天塔：七層彩虹玻璃摩天大樓（對應 OSI 七層架構）+ 頂樓通訊光塔
      const rainbow = [0xff8fa3, 0xfdba74, 0xfde047, 0x6ee7b7, 0x7dd3fc, 0xa5b4fc, 0xd8b4fe];
      for (let i = 0; i < 7; i++) {
        const w = 2.9 - i * 0.18;
        const d = 2.2 - i * 0.14;
        const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.44, d), makeMat(rainbow[i]));
        floor.position.y = 0.22 + i * 0.46;
        g.add(floor);
      }
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.95, 20), goldMat);
      spire.position.y = 3.85;
      g.add(spire);
      signY = 2.15;
      signZ = 1.25;
      crownY = 4.75;
      break;
    }
    case 15: {
      // 🧭 Ch.15 DNS 網域導航總署：領航市政總署大樓 + 屋頂巨型 3D 地圖定位針 📍 與旋轉雷達光環
      const navHQ = new THREE.Mesh(new THREE.BoxGeometry(3.3, 1.95, 2.3), whiteMat);
      navHQ.position.y = 0.98;
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.14, 16, 32, Math.PI), glow);
      arch.position.set(0, 0.45, 1.18);
      const pinHead = new THREE.Mesh(new THREE.SphereGeometry(0.72, 28, 28), goldMat);
      pinHead.position.y = 3.55;
      const pinHalo = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.09, 16, 36), pinkMat);
      pinHalo.position.y = 3.55;
      pinHalo.rotation.x = Math.PI / 3;
      const pinTip = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.05, 28), glow);
      pinTip.rotation.x = Math.PI;
      pinTip.position.y = 2.55;
      g.add(navHQ, arch, pinHead, pinHalo, pinTip);
      addBuildingWindows(g, 2.8, 2, 0.72, 1.16, glassMat);
      animatedProps.push({ mesh: pinHalo, type: "spin", speed: 1.3 });
      signY = 2.08;
      signZ = 1.32;
      crownY = 4.75;
      break;
    }
  }

  // 掛載 3D 立體中文機關建築招牌（如「智慧財產管理局」）
  const signText = itemMeta?.signText || `第 ${chId} 館`;
  const signMesh = createBuildingSignboard(signText, unitColorCss);
  signMesh.position.set(0, signY, signZ);
  g.add(signMesh);

  // 城市街區行道樹與發光街燈點綴
  const treeCoords = [
    [-2.85, 1.95],
    [2.85, -1.85],
    [-2.45, -2.25]
  ];
  const candyFoliageColors = [0x6ee7b7, 0x5eead4, 0xf9a8d4, 0xfde047];
  treeCoords.forEach(([tx, tz], idx) => {
    if ((chId + idx) % 2 === 0) {
      const trunk = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.45, 12, 20), makeMat(0xd4a373));
      trunk.position.set(tx, 0.32, tz);
      const foliage = new THREE.Mesh(
        new THREE.SphereGeometry(0.68, 24, 24),
        makeMat(candyFoliageColors[(chId + idx) % candyFoliageColors.length])
      );
      foliage.position.set(tx, 1.02, tz);
      g.add(trunk, foliage);
    }
  });

  // 建築物前方廣場雙側暖光城市路燈
  for (const lx of [-2.35, 2.35]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 1.25, 12), darkMat);
    pole.position.set(lx, 0.62, 2.15);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), goldMat);
    bulb.position.set(lx, 1.32, 2.15);
    g.add(pole, bulb);
  }

  // 關卡滿 3 星時的圓潤黃金珍珠皇冠
  const crown = new THREE.Group();
  const crownRing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.13, 20, 36), goldMat);
  crownRing.rotation.x = Math.PI / 2;
  crown.add(crownRing);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), goldMat);
    pearl.position.set(Math.cos(a) * 0.46, 0.18, Math.sin(a) * 0.46);
    crown.add(pearl);
  }
  crown.position.set(0, crownY, 0);
  crown.visible = false;
  g.add(crown);
  g.userData.crown = crown;
  animatedProps.push({ mesh: crown, type: "spinY", speed: 2.2 });

  g.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  return g;
}

// 建立 15 座《模擬城市》方正街區街廓與主題機關建築物
ISLAND_LAYOUT.forEach((item, index) => {
  const unit = getUnit(item.unit);
  const pos = gridToWorld(item.gx, item.gz);
  pos.y = 0;

  const group = new THREE.Group();
  group.position.copy(pos);
  group.userData = {
    chId: item.id,
    unitId: item.unit,
    baseY: 0,
    phase: index * 0.62,
    bName: item.bName,
    bIcon: item.bIcon
  };

  // 1. 模擬城市方正街區水泥地基（Block Foundation）
  const blockW = 10.8;
  const blockD = 10.8;
  const curbGeo = new THREE.BoxGeometry(blockW, 0.32, blockD);
  const curbMat = makeMat(0xcbd5e1, { roughness: 0.65 });
  const curb = new THREE.Mesh(curbGeo, curbMat);
  curb.position.y = 0.16;
  curb.receiveShadow = true;
  group.add(curb);

  // 2. 街區人行道紅磚/石板鋪面與綠化草皮帶
  const innerTileGeo = new THREE.BoxGeometry(blockW - 0.7, 0.42, blockD - 0.7);
  const innerTileMat = makeMat(0xf1f5f9, { roughness: 0.5 });
  const innerTile = new THREE.Mesh(innerTileGeo, innerTileMat);
  innerTile.position.y = 0.22;
  innerTile.receiveShadow = true;
  group.add(innerTile);

  // 街區周邊綠化草皮與小矮樹籬
  const hedgeMat = makeMat(0x4ade80, { roughness: 0.6 });
  for (const [hx, hz, hw, hd] of [
    [-blockW * 0.4, 0, 0.6, blockD * 0.78],
    [blockW * 0.4, 0, 0.6, blockD * 0.78],
    [0, -blockD * 0.4, blockW * 0.78, 0.6]
  ]) {
    const hedge = new THREE.Mesh(new THREE.BoxGeometry(hw, 0.35, hd), hedgeMat);
    hedge.position.set(hx, 0.38, hz);
    group.add(hedge);
  }

  // 街角消防栓與垃圾桶等 SimCity 城市細節
  const hydrant = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.42, 12), makeMat(0xef4444));
  hydrant.position.set(blockW * 0.42, 0.42, blockD * 0.42);
  group.add(hydrant);

  // 建築正門迎賓鋪面（連接前方幹道斑馬線）
  const entranceWalkway = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.08, 2.2),
    makeMat(unit.hex, { roughness: 0.4 })
  );
  entranceWalkway.position.set(0, 0.44, 4.4);
  entranceWalkway.receiveShadow = true;
  group.add(entranceWalkway);

  // 模擬城市方框選取指示燈
  const rimGeo = new THREE.BoxGeometry(blockW + 0.35, 0.06, blockD + 0.35);
  const rimMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, wireframe: true });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.position.y = 0.48;
  group.add(rim);
  group.userData.rimMat = rimMat;

  // 建立該章節專屬主題建築物與皇冠
  const landmark = buildChapterLandmark(item.id, unit.hex, item, unit.color);
  landmark.position.y = 0.44;
  group.add(landmark);
  group.userData.crown = landmark.userData.crown;

  group.traverse(child => {
    if (child.isMesh) {
      child.userData.chId = item.id;
      pickableMeshes.push(child);
    }
  });

  scene.add(group);
  islandGroups.set(item.id, group);

  // 建立城市建築雙層路牌標籤（上層：專屬建築名稱 + 星級；下層：對應章節主題）
  const chData = chapters[item.id] || { title: `第 ${item.id} 章`, icon: "📘" };
  const label = document.createElement("div");
  label.className = "island-label";
  label.style.setProperty("--unit-color", unit.color);
  label.dataset.id = item.id;
  label.innerHTML = `
    <div class="island-label-top">
      <span class="ch-badge">${String(item.id).padStart(2, "0")}</span>
      <span class="ch-title-text">${item.bIcon} ${item.bName}</span>
      <span class="island-stars" id="istars-${item.id}">☆☆☆</span>
    </div>
    <div class="island-label-sub">${chData.icon} ${chData.title}</div>
    <div class="island-peers-row" id="ipeers-${item.id}"></div>
  `;
  label.addEventListener("click", e => {
    e.stopPropagation();
    playSfx("pop");
    selectIsland(item.id);
  });
  labelsContainer.appendChild(label);
  group.userData.labelEl = label;
});

// ==========================================
// 6. 建立 20 條城市跨區高架光軌幹道與穿梭小列車（連接各街區）
// ==========================================
const linksGroup = new THREE.Group();
scene.add(linksGroup);
const linkObjects = [];
const rainbowPalette = [0xff8fa3, 0xfde047, 0x6ee7b7, 0x7dd3fc, 0xd8b4fe];

COLLAB_LINKS.forEach((link, idx) => {
  const gA = islandGroups.get(link.a);
  const gB = islandGroups.get(link.b);
  if (!gA || !gB) return;

  const pA = gA.position.clone();
  pA.y = 0.55;
  const pB = gB.position.clone();
  pB.y = 0.55;
  const mid = pA.clone().add(pB).multiplyScalar(0.5);
  mid.y = 1.65;

  // 跨街區城市捷運/高架資訊導軌
  const navCurve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
  const geo = new THREE.TubeGeometry(navCurve, 36, 0.08, 12, false);
  const baseColor = rainbowPalette[idx % rainbowPalette.length];
  const mat = new THREE.MeshStandardMaterial({
    color: baseColor,
    emissive: baseColor,
    emissiveIntensity: 0.35,
    roughness: 0.35,
    transparent: true,
    opacity: 0.48
  });
  const line = new THREE.Mesh(geo, mat);
  linksGroup.add(line);

  // 穿梭於高架軌道上的 Q 版捷運動能資料艙
  const dot = new THREE.Group();
  const trainBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.24, 0.55, 12, 16),
    new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.28 })
  );
  trainBody.rotation.x = Math.PI / 2;
  const trainCockpit = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  trainCockpit.position.set(0, 0.08, 0.28);
  dot.add(trainBody, trainCockpit);
  linksGroup.add(dot);

  linkObjects.push({ ...link, baseColor, curve: navCurve, line, mat, dot, t: Math.random() });
});

// ==========================================
// 7. Q版吉祥物「Bit 博士」（圓潤二頭身公仔 + 雲朵軟墊座）
// ==========================================
const mascotGroup = new THREE.Group();
{
  const soapbox = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.78, 0.44, 32), makeMat(0xfbbf24));
  soapbox.position.y = 0.22;
  mascotGroup.add(soapbox);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.36, 0.38, 16, 24), makeMat(0xf472b6));
  body.position.y = 0.88;
  // Q版圓頭
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 28, 28), makeMat(0xfff3b0));
  head.position.y = 1.62;
  // 蓬鬆雲朵捲髮
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 24), makeMat(0x4a3540));
  hair.position.set(0, 1.82, -0.06);
  // 圓框眼鏡
  const glasses = new THREE.Group();
  const frameL = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.035, 12, 24), makeMat(0x4a3540));
  frameL.position.set(-0.17, 1.62, 0.44);
  const frameR = frameL.clone();
  frameR.position.x = 0.17;
  glasses.add(frameL, frameR);
  // 粉紅腮紅
  const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), makeMat(0xf43f5e));
  cheekL.position.set(-0.28, 1.5, 0.4);
  const cheekR = cheekL.clone();
  cheekR.position.x = 0.28;
  // 揮手小手
  const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.35, 12, 20), makeMat(0x7dd3fc));
  arm.position.set(0.48, 1.15, 0);
  arm.rotation.z = -0.5;
  mascotGroup.userData.arm = arm;

  mascotGroup.add(body, head, hair, glasses, cheekL, cheekR, arm);
  mascotGroup.traverse(o => {
    if (o.isMesh) {
      o.castShadow = true;
      o.userData.isMascot = true;
      pickableMeshes.push(o);
    }
  });
}
scene.add(mascotGroup);

const mascotState = {
  fromId: 1,
  toId: 2,
  progress: 0,
  pauseTimer: 2.5,
  bubbleTimer: 0
};

const mascotBubble = document.getElementById("mascot-bubble");
function triggerMascotSpeech(customText) {
  const text = customText || MASCOT_QUIPS[Math.floor(Math.random() * MASCOT_QUIPS.length)];
  mascotBubble.textContent = text;
  mascotBubble.classList.remove("hidden");
  mascotState.bubbleTimer = 5.5;
}

document.getElementById("btn-mascot-Wave").addEventListener("click", () => {
  playSfx("pop");
  triggerMascotSpeech();
});

// 固定為晴朗明亮的蘇打白天城市光影
renderer.setClearColor(0xfce7f3);
scene.fog.color.setHex(0xfce7f3);
waterMat.color.setHex(0x7dd3fc);
dirLight.color.setHex(0xfffdf7);
dirLight.intensity = 1.38;
hemiLight.color.setHex(0xffffff);
starMat.opacity = 0;
nightBeaconMaterials.forEach(m => {
  m.emissiveIntensity = 0.38;
});

// ==========================================
// 9. 關卡選取、闖關任務書面板與星級計算
// ==========================================
const panelEl = document.getElementById("panel");
let activeSecIdx = 0;
let activeQuizIdx = 0;
let quizAnswers = {}; // { qi: selectedOi }

// 將重點句子開頭的「專有名詞：」自動轉為醒目螢光標籤，減輕長句閱讀負擔
function formatPointText(pt) {
  const colonIdx = pt.indexOf("：");
  if (colonIdx > 0 && colonIdx <= 18) {
    const head = pt.slice(0, colonIdx);
    const rest = pt.slice(colonIdx + 1);
    return `<span class="point-key">${head}</span>${rest}`;
  }
  return pt;
}

function starString(count) {
  const n = Math.max(0, Math.min(3, count || 0));
  return "⭐".repeat(n) + "☆".repeat(3 - n);
}

function selectIsland(chId, initialTab = null) {
  if (initialTab) activeTab = initialTab;
  const firstVisit = !gameState.visited[chId];
  if (selectedId !== chId) {
    activeSecIdx = 0;
    activeQuizIdx = 0;
    quizAnswers = {};
  }
  selectedId = chId;
  gameState.visited[chId] = true;

  if (firstVisit) {
    rewardPlayer(10, 5);
    broadcastActivity(`登上了 Ch.${chId}《${chapters[chId]?.title || ""}》展開探索！`, `探索 Ch.${chId} 知識寶箱`, chId);
  } else {
    saveGame();
    broadcastActivity(null, `正在研讀 Ch.${chId}`, chId);
  }

  const group = islandGroups.get(chId);
  if (group) {
    const p = group.position;
    const baseY = group.userData.baseY ?? p.y;
    const w = window.innerWidth;
    let camOffset, targetOffset;
    if (w <= 860) {
      // 手機與直向平板（底部抽屜式面板）：鏡頭拉高並將浮空島置於畫面上半部
      camOffset = new THREE.Vector3(p.x, baseY + 21, p.z + 25);
      targetOffset = new THREE.Vector3(p.x, baseY - 4.2, p.z);
    } else if (w <= 1180) {
      // 橫向平板（右側精巧面板）：浮空島往左偏，留出右側空間不重疊
      camOffset = new THREE.Vector3(p.x + 6.5, baseY + 17, p.z + 22);
      targetOffset = new THREE.Vector3(p.x + 4.2, baseY + 0.5, p.z);
    } else {
      camOffset = new THREE.Vector3(p.x + 8, baseY + 16, p.z + 21);
      targetOffset = new THREE.Vector3(p.x + 3.2, baseY + 0.6, p.z);
    }
    flyTo(camOffset, targetOffset, 820);
  }

  updateIslandHighlights();
  renderPanel(chId);
  panelEl.classList.remove("hidden");
}

function closePanel() {
  selectedId = null;
  panelEl.classList.remove("fullscreen");
  panelEl.classList.add("hidden");
  updateIslandHighlights();
}

function resetOverview() {
  playSfx("pop");
  stopTour();
  closePanel();
  activeUnitFilter = null;
  renderUnitLegend();
  updateIslandHighlights();
  flyTo(getOverviewCamPos(), DEFAULT_TARGET, 850);
}

function updateIslandHighlights() {
  document.body.classList.toggle("panel-open", Boolean(selectedId));
  islandGroups.forEach((group, id) => {
    const isSelected = id === selectedId;
    const unitMatch = !activeUnitFilter || group.userData.unitId === activeUnitFilter;
    const label = group.userData.labelEl;

    label.classList.toggle("active", isSelected);
    label.classList.toggle("dimmed", (!unitMatch && !isSelected) || (Boolean(selectedId) && !isSelected && window.innerWidth <= 1180));
    group.userData.rimMat.opacity = isSelected ? 0.98 : 0.32;
  });

  linkObjects.forEach(obj => {
    const isRel = selectedId && (obj.a === selectedId || obj.b === selectedId);
    obj.mat.opacity = selectedId ? (isRel ? 0.92 : 0.1) : 0.42;
    const col = isRel ? 0xfde047 : obj.baseColor;
    obj.mat.color.setHex(col);
    if (obj.mat.emissive) obj.mat.emissive.setHex(col);
    obj.dot.visible = showLinks && (!selectedId || isRel);
  });
}

function updateIslandBadges() {
  islandGroups.forEach((group, id) => {
    const sc = gameState.stars[id] || 0;
    const starEl = document.getElementById(`istars-${id}`);
    if (starEl) starEl.textContent = starString(sc);
    if (group.userData.crown) {
      group.userData.crown.visible = sc >= 3;
    }
  });
}

function renderPanel(chId) {
  const ch = chapters[chId];
  const meta = getIslandMeta(chId);
  const unit = getUnit(meta.unit);
  const relLinks = COLLAB_LINKS.filter(l => l.a === chId || l.b === chId);
  const curStars = gameState.stars[chId] || 0;

  let bodyHTML = "";
  if (activeTab === "sections") {
    const totalSec = ch.sections.length;
    activeSecIdx = Math.max(0, Math.min(totalSec - 1, activeSecIdx));
    const s = ch.sections[activeSecIdx];
    const key = `${chId}-${activeSecIdx}`;
    const isDone = !!gameState.readSections[key];

    bodyHTML = `
      <div class="section-stepper">
        <div class="stepper-pills">
          ${ch.sections
            .map((sec, idx) => {
              const sk = `${chId}-${idx}`;
              const done = !!gameState.readSections[sk];
              return `<button class="step-pill ${idx === activeSecIdx ? "active" : ""} ${done ? "done" : ""}" data-sidx="${idx}">
                ${done ? "✔ " : ""}小節 ${idx + 1}（${sec.code}）
              </button>`;
            })
            .join("")}
        </div>
        <span style="font-size:13.5px;font-weight:900;color:#475569;">進度：${activeSecIdx + 1} / ${totalSec}</span>
      </div>

      <div class="section-card">
        <div class="section-card-head">
          <h3><span class="section-code">${s.code}</span>${s.title}</h3>
          <button class="check-read-btn ${isDone ? "done" : ""}" data-skey="${key}">
            ${isDone ? "✔ 本節已讀完" : "🎁 讀完領 +15 XP"}
          </button>
        </div>
        <ul class="section-points">
          ${s.points.map(pt => `<li>${formatPointText(pt)}</li>`).join("")}
        </ul>
        <div class="section-footer-nav">
          <button class="candy-btn blue" id="sec-prev" ${activeSecIdx === 0 ? "disabled style='opacity:0.4;cursor:default'" : ""}>⬅ 上一小節</button>
          <span style="font-size:14px;font-weight:900;color:#64748b;">第 ${activeSecIdx + 1} / ${totalSec} 小節</span>
          ${
            activeSecIdx < totalSec - 1
              ? `<button class="candy-btn green" id="sec-next">下一小節 ➡</button>`
              : `<button class="candy-btn pink" id="sec-to-quiz">⚔️ 前往本關測驗！</button>`
          }
        </div>
      </div>`;
  } else if (activeTab === "terms") {
    bodyHTML = `
      <div class="flashcard-hint">🪄 點擊下方名詞卡即可標記「已學會」並領取 <b>+10 XP 與金幣</b>！</div>
      <div class="terms-grid">
      ${ch.terms
        .map((t, ti) => {
          const tkey = `${chId}-${ti}`;
          const mastered = !!gameState.masteredTerms[tkey];
          return `
        <div class="term-card ${mastered ? "mastered" : ""}" data-tkey="${tkey}">
          <div class="term-head">
            <div class="term-name">🃏 ${t.term}</div>
            <span class="term-tag">${mastered ? "✔ 已收入圖鑑" : "點我收集 +10 XP"}</span>
          </div>
          <div class="term-desc">${t.desc}</div>
        </div>`;
        })
        .join("")}
    </div>`;
  } else if (activeTab === "quiz") {
    const totalQ = ch.quiz.length;
    activeQuizIdx = Math.max(0, Math.min(totalQ - 1, activeQuizIdx));
    const q = ch.quiz[activeQuizIdx];
    const pickedOi = quizAnswers[activeQuizIdx];
    const isAnswered = pickedOi !== undefined;
    const correctCount = Object.entries(quizAnswers).filter(([qi, oi]) => ch.quiz[Number(qi)].answer === oi).length;

    bodyHTML = `
      <div class="quiz-banner">
        <span>🎯 答對 2 題 ⭐ · 4 題 ⭐⭐ · 5 題全對 ⭐⭐⭐</span>
        <span id="stage-quiz-score">目前已答對：${correctCount} / ${totalQ} 題</span>
      </div>

      <div class="section-stepper">
        <div class="stepper-pills">
          ${ch.quiz
            .map((_, idx) => {
              const ansOi = quizAnswers[idx];
              const doneClass = ansOi !== undefined ? "done" : "";
              const mark = ansOi === undefined ? "" : ansOi === ch.quiz[idx].answer ? "✅ " : "❌ ";
              return `<button class="step-pill ${idx === activeQuizIdx ? "active" : ""} ${doneClass}" data-qidx="${idx}">
                ${mark}第 ${idx + 1} 題
              </button>`;
            })
            .join("")}
        </div>
        <button class="step-pill" id="quiz-reset" title="重新挑戰本關測驗">🔄 重測</button>
      </div>

      <div class="quiz-item" data-qi="${activeQuizIdx}">
        <div class="quiz-q">Q${activeQuizIdx + 1}. ${q.q}</div>
        <div class="quiz-options">
          ${q.options
            .map((opt, oi) => {
              let cls = "quiz-opt";
              if (isAnswered) {
                if (oi === q.answer) cls += " correct";
                else if (oi === pickedOi) cls += " wrong";
              }
              return `<button class="${cls}" data-qi="${activeQuizIdx}" data-oi="${oi}" ${isAnswered ? "disabled" : ""}>(${String.fromCharCode(65 + oi)}) ${opt}</button>`;
            })
            .join("")}
        </div>
        <div class="quiz-explain ${isAnswered ? "" : "hidden"}" id="exp-${activeQuizIdx}">💡 <b>詳解：</b>${q.explain}</div>
        <div class="section-footer-nav">
          <button class="candy-btn blue" id="q-prev" ${activeQuizIdx === 0 ? "disabled style='opacity:0.4;cursor:default'" : ""}>⬅ 上一題</button>
          <span style="font-size:14px;font-weight:900;color:#64748b;">第 ${activeQuizIdx + 1} / ${totalQ} 題</span>
          <button class="candy-btn green" id="q-next" ${activeQuizIdx === totalQ - 1 ? "disabled style='opacity:0.4;cursor:default'" : ""}>下一題 ➡</button>
        </div>
      </div>`;
  } else if (activeTab === "links") {
    bodyHTML = relLinks
      .map(l => {
        const otherId = l.a === chId ? l.b : l.a;
        const otherCh = chapters[otherId];
        return `
        <div class="link-card" data-goto="${otherId}">
          <div class="link-card-head">
            <span>🌈 通往關卡 ${String(otherId).padStart(2, "0")}：${otherCh.icon} ${otherCh.title}</span>
            <span>傳送 ➔</span>
          </div>
          <div class="link-card-desc">${l.desc}</div>
        </div>`;
      })
      .join("");
  }

  const prevId = chId > 1 ? chId - 1 : 15;
  const nextId = chId < 15 ? chId + 1 : 1;

  panelEl.innerHTML = `
    <div class="panel-drag-handle" id="panel-drag-handle" title="按住可切換全螢幕或抽屜模式"></div>
    <div class="panel-header">
      <div class="panel-top-row">
        <span class="unit-pill"><span class="unit-dot" style="background:${unit.color}"></span>${unit.code} · ${unit.name}</span>
        <div class="panel-nav-btns">
          <button id="panel-size-toggle" title="切換全螢幕/抽屜模式">⤢</button>
          <button id="panel-prev" title="上一關">◀ 關卡 ${prevId}</button>
          <button id="panel-next" title="下一關">關卡 ${nextId} ▶</button>
          <button id="panel-close" title="關閉（Esc）">✕</button>
        </div>
      </div>
      <div class="panel-title-row">
        <div class="panel-title">
          <span>${meta?.bIcon || ch.icon}</span>
          <span>第 ${ch.id} 關｜${meta?.bName || ch.title}</span>
        </div>
        <div class="stage-stars-box" id="panel-stars-box" title="本關最高星數">${starString(curStars)}</div>
      </div>
      <div style="font-size:13.5px;font-weight:800;color:var(--unit-color,#3b82f6);margin-top:2px;">對應教學單元：${ch.icon} ${ch.title}</div>
      <p class="panel-summary">${ch.summary}</p>
    </div>
    <div class="panel-tabs">
      <button class="tab-btn ${activeTab === "sections" ? "active" : ""}" data-tab="sections">📖 知識寶箱 (${ch.sections.length})</button>
      <button class="tab-btn ${activeTab === "terms" ? "active" : ""}" data-tab="terms">🃏 魔法圖鑑 (${ch.terms.length})</button>
      <button class="tab-btn ${activeTab === "quiz" ? "active" : ""}" data-tab="quiz">⚔️ 闖關挑戰 (${ch.quiz.length})</button>
      <button class="tab-btn ${activeTab === "links" ? "active" : ""}" data-tab="links">🌈 彩虹橋 (${relLinks.length})</button>
    </div>
    <div class="panel-body">${bodyHTML}</div>
  `;

  const sizeBtn = panelEl.querySelector("#panel-size-toggle");
  const dragHandle = panelEl.querySelector("#panel-drag-handle");
  const togglePanelSize = () => {
    playSfx("pop");
    const isFull = panelEl.classList.toggle("fullscreen");
    if (sizeBtn) sizeBtn.textContent = isFull ? "⤡" : "⤢";
  };
  if (sizeBtn) sizeBtn.addEventListener("click", togglePanelSize);
  if (dragHandle) dragHandle.addEventListener("click", togglePanelSize);

  panelEl.querySelector("#panel-close").addEventListener("click", () => {
    playSfx("pop");
    closePanel();
  });
  panelEl.querySelector("#panel-prev").addEventListener("click", () => {
    playSfx("pop");
    selectIsland(prevId);
  });
  panelEl.querySelector("#panel-next").addEventListener("click", () => {
    playSfx("pop");
    selectIsland(nextId);
  });

  panelEl.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      playSfx("pop");
      activeTab = btn.dataset.tab;
      renderPanel(chId);
    });
  });

  // 小節切換按鈕事件
  panelEl.querySelectorAll(".step-pill[data-sidx]").forEach(btn => {
    btn.addEventListener("click", () => {
      playSfx("pop");
      activeSecIdx = Number(btn.dataset.sidx);
      renderPanel(chId);
    });
  });
  const secPrev = panelEl.querySelector("#sec-prev");
  if (secPrev) {
    secPrev.addEventListener("click", () => {
      if (activeSecIdx > 0) {
        playSfx("pop");
        activeSecIdx--;
        renderPanel(chId);
      }
    });
  }
  const secNext = panelEl.querySelector("#sec-next");
  if (secNext) {
    secNext.addEventListener("click", () => {
      if (activeSecIdx < ch.sections.length - 1) {
        playSfx("pop");
        activeSecIdx++;
        renderPanel(chId);
      }
    });
  }
  const secToQuiz = panelEl.querySelector("#sec-to-quiz");
  if (secToQuiz) {
    secToQuiz.addEventListener("click", () => {
      playSfx("pop");
      activeTab = "quiz";
      renderPanel(chId);
    });
  }

  // 知識寶箱讀完領獎（並自動跳下一小節）
  panelEl.querySelectorAll(".check-read-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const key = btn.dataset.skey;
      if (!gameState.readSections[key]) {
        gameState.readSections[key] = true;
        playSfx("coin");
        rewardPlayer(15, 10, e);
      }
      if (activeSecIdx < ch.sections.length - 1) {
        activeSecIdx++;
      }
      renderPanel(chId);
    });
  });

  // 魔法圖鑑收集領獎
  panelEl.querySelectorAll(".term-card").forEach(card => {
    card.addEventListener("click", e => {
      const key = card.dataset.tkey;
      if (gameState.masteredTerms[key]) return;
      gameState.masteredTerms[key] = true;
      card.classList.add("mastered");
      card.querySelector(".term-tag").textContent = "✔ 已收入圖鑑";
      playSfx("coin");
      rewardPlayer(10, 5, e);
    });
  });

  // 闖關測驗題號切換與作答
  panelEl.querySelectorAll(".step-pill[data-qidx]").forEach(btn => {
    btn.addEventListener("click", () => {
      playSfx("pop");
      activeQuizIdx = Number(btn.dataset.qidx);
      renderPanel(chId);
    });
  });
  const qPrev = panelEl.querySelector("#q-prev");
  if (qPrev) {
    qPrev.addEventListener("click", () => {
      if (activeQuizIdx > 0) {
        playSfx("pop");
        activeQuizIdx--;
        renderPanel(chId);
      }
    });
  }
  const qNext = panelEl.querySelector("#q-next");
  if (qNext) {
    qNext.addEventListener("click", () => {
      if (activeQuizIdx < ch.quiz.length - 1) {
        playSfx("pop");
        activeQuizIdx++;
        renderPanel(chId);
      }
    });
  }
  const qReset = panelEl.querySelector("#quiz-reset");
  if (qReset) {
    qReset.addEventListener("click", () => {
      playSfx("pop");
      quizAnswers = {};
      activeQuizIdx = 0;
      renderPanel(chId);
    });
  }

  panelEl.querySelectorAll(".quiz-opt").forEach(btn => {
    btn.addEventListener("click", e => {
      const qi = Number(btn.dataset.qi);
      const oi = Number(btn.dataset.oi);
      if (quizAnswers[qi] !== undefined) return;
      quizAnswers[qi] = oi;

      const ans = ch.quiz[qi].answer;
      if (oi === ans) {
        gameState.streak = (gameState.streak || 0) + 1;
        gameState.bestStreak = Math.max(gameState.bestStreak || 0, gameState.streak);
        playSfx("correct");
        rewardPlayer(25, 15, e);
      } else {
        gameState.streak = 0;
        playSfx("wrong");
        saveGame();
      }

      const answeredCount = Object.keys(quizAnswers).length;
      const correctCount = Object.entries(quizAnswers).filter(([k, v]) => ch.quiz[Number(k)].answer === v).length;

      if (answeredCount === ch.quiz.length) {
        let earnedStars = 0;
        if (correctCount >= 5) earnedStars = 3;
        else if (correctCount >= 4) earnedStars = 2;
        else if (correctCount >= 2) earnedStars = 1;

        const prevStars = gameState.stars[chId] || 0;
        if (earnedStars > prevStars) {
          gameState.stars[chId] = earnedStars;
        }

        if (chId === gameState.questCh && earnedStars >= 1) {
          gameState.questCh = (chId % 15) + 1;
          rewardPlayer(40, 30, e);
          renderQuestBox();
        }

        saveGame();

        if (earnedStars === 3) {
          playSfx("fanfare");
          spawnConfetti(window.innerWidth - 320, window.innerHeight / 2, 55);
          triggerMascotSpeech(`👑 太神啦！第 ${chId} 關 5 題全對奪得 ⭐⭐⭐ 三星滿貫！島上皇冠已經升起囉！`);
          broadcastActivity(`在 Ch.${chId}《${ch.title}》奪得 ⭐⭐⭐ 三星滿貫皇冠！👑`, `Ch.${chId} 三星通關 👑`, chId);
        } else if (earnedStars >= 1) {
          playSfx("fanfare");
          spawnConfetti(window.innerWidth - 320, window.innerHeight / 2, 30);
          broadcastActivity(`完成了 Ch.${chId}《${ch.title}》闖關挑戰，獲得 ${"⭐".repeat(earnedStars)}！`, `挑戰 Ch.${chId} 測驗中`, chId);
        }
      }

      renderPanel(chId);
    });
  });

  panelEl.querySelectorAll(".link-card").forEach(card => {
    card.addEventListener("click", () => {
      playSfx("pop");
      selectIsland(Number(card.dataset.goto), "sections");
    });
  });
}

// ==========================================
// 10. 頂部勇者 HUD、左側王國面板、懸賞任務與成就徽章館
// ==========================================
function renderTopHUD() {
  const info = getLevelInfo(gameState.xp);
  document.getElementById("hud-avatar").textContent = info.avatar;
  document.getElementById("hud-level").textContent = `Lv.${info.lv}`;
  document.getElementById("hud-title").textContent = gameState.myName ? `${gameState.myName} · ${info.title}` : info.title;
  document.getElementById("hud-xp-fill").style.width = `${info.curLvXp}%`;
  document.getElementById("hud-xp-text").textContent = `${info.curLvXp} / 100 XP`;
  document.getElementById("hud-stars").textContent = totalStars();
  document.getElementById("hud-coins").textContent = gameState.coins;
  document.getElementById("hud-streak").textContent = gameState.bestStreak || 0;
}

const unitListEl = document.getElementById("unit-list");
const questBoxEl = document.getElementById("quest-box");
const progressEl = document.getElementById("progress");

function renderUnitLegend() {
  unitListEl.innerHTML = UNITS.map(u => {
    const unitStars = u.chapters.reduce((sum, cid) => sum + (gameState.stars[cid] || 0), 0);
    const maxStars = u.chapters.length * 3;
    return `
    <button class="unit-btn ${activeUnitFilter === u.id ? "active" : ""}" style="--u-color:${u.color}" data-uid="${u.id}">
      <div class="unit-btn-left">
        <span class="unit-dot"></span>
        <span>${u.name}</span>
      </div>
      <span class="unit-count">⭐ ${unitStars}/${maxStars}</span>
    </button>`;
  }).join("");

  unitListEl.querySelectorAll(".unit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      playSfx("pop");
      const uid = Number(btn.dataset.uid);
      activeUnitFilter = activeUnitFilter === uid ? null : uid;
      renderUnitLegend();
      updateIslandHighlights();
    });
  });
}

function renderQuestBox() {
  const qid = gameState.questCh || 1;
  const ch = chapters[qid] || { title: `第 ${qid} 章`, icon: "🎯" };
  questBoxEl.innerHTML = `
    <div class="quest-title"><span>📜 今日懸賞任務</span><span>🎁 +40 XP</span></div>
    <div class="quest-desc">前往「關卡 ${String(qid).padStart(2, "0")} ${ch.icon} ${ch.title}」完成闖關挑戰並奪星！</div>
    <button class="quest-go" id="btn-quest-go">🚀 立即出發</button>
  `;
  questBoxEl.querySelector("#btn-quest-go").addEventListener("click", () => {
    playSfx("pop");
    selectIsland(qid, "quiz");
  });
}

function renderProgressUI() {
  const visitedCount = Object.keys(gameState.visited).length;
  const starsCount = totalStars();
  const pct = Math.round((starsCount / 45) * 100);
  progressEl.innerHTML = `
    <div class="progress-row"><span>🏝️ 已解鎖島嶼</span><b>${visitedCount} / 15</b></div>
    <div class="progress-row"><span>⭐ 總奪星進度</span><b>${starsCount} / 45 (${pct}%)</b></div>
    <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
  `;
  renderUnitLegend();
}

renderTopHUD();
renderQuestBox();
renderProgressUI();
updateIslandBadges();

// 成就徽章館與跨裝置進度存檔中心 Modal
const modalEl = document.getElementById("modal");
const modalBox = modalEl.querySelector(".modal-box");

function applyLoadedSaveObject(rawObj) {
  const safe = sanitizeSaveData(rawObj);
  if (safe.myName) safe.hasSetCustomName = true;
  Object.assign(gameState, safe);
  saveGame();
  renderQuestBox();
  renderLiveTickerUI();
  if (selectedId && !panelEl.classList.contains("hidden")) {
    openPanel(selectedId);
  }
}

function encodeSavePasscode() {
  const jsonStr = JSON.stringify(gameState);
  const bytes = new TextEncoder().encode(jsonStr);
  let binary = "";
  bytes.forEach(b => {
    binary += String.fromCharCode(b);
  });
  return "DTISLAND1:" + btoa(binary);
}

function decodeSavePasscode(codeStr) {
  const trimmed = String(codeStr || "").trim().replace(/^DTISLAND1:/i, "").trim();
  if (!trimmed) throw new Error("通行碼為空");
  const binary = atob(trimmed);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const jsonStr = new TextDecoder().decode(bytes);
  return JSON.parse(jsonStr);
}

function openBadgesModal() {
  playSfx("pop");
  const info = getLevelInfo(gameState.xp);
  const unlockedCount = BADGES.filter(b => b.check(gameState)).length;
  const visitedCount = Object.keys(gameState.visited).length;
  const starsCount = totalStars();

  modalBox.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <h2 style="font-size:21px;font-weight:900;">🏆 勇者成就館 ＆ 💾 進度存檔中心</h2>
      <button id="modal-close" class="candy-btn pink" style="padding:5px 12px;">✕</button>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:14px 18px;background:linear-gradient(135deg,#fdf2f8,#fef3c7);border:2px solid #f9a8d4;border-radius:22px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="font-size:38px;">${escapeHTML(info.avatar)}</div>
        <div>
          <div style="font-size:17px;font-weight:900;">${escapeHTML(gameState.myName || "新手探險家")} · Lv.${info.lv} ${escapeHTML(info.title)}</div>
          <div style="font-size:14px;font-weight:700;color:#7d6370;">⭐ 奪星：${starsCount}/45 ｜ 🏝️ 島嶼：${visitedCount}/15 ｜ 總經驗：${gameState.xp} XP ｜ 💰 ${gameState.coins}</div>
        </div>
      </div>
      <span class="save-auto-badge">✅ 本機瀏覽器已自動保存進度</span>
    </div>

    <!-- 跨裝置存檔 / 讀檔中心 -->
    <div class="save-center-box">
      <div class="save-center-title">☁️ 跨裝置雲端存檔 ＆ 🔑 冒險通行碼（換電腦／平板也能接續闖關！）</div>
      <div class="save-center-desc">本機進度會隨每次答題自動儲存。若在學校電腦教室或想換設備玩，可使用「雲端同步」或複製「冒險通行碼」：</div>

      <div class="save-cloud-row">
        <input id="cloud-save-key" class="save-input" type="text" maxlength="20" placeholder="帳號或學號暱稱" value="${escapeHTML(gameState.myName || "")}" />
        <input id="cloud-save-pin" class="save-input pin" type="password" maxlength="12" placeholder="自訂 4~12 碼密碼" />
        <button type="button" id="btn-cloud-upload" class="candy-btn pink">☁️ 雲端備份</button>
        <button type="button" id="btn-cloud-download" class="candy-btn blue">📥 雲端讀取</button>
      </div>

      <div class="save-passcode-row">
        <button type="button" id="btn-copy-code" class="candy-btn yellow">🔑 複製冒險通行碼</button>
        <button type="button" id="btn-paste-code" class="candy-btn green">📋 貼上通行碼還原</button>
        <button type="button" id="btn-export-json" class="candy-btn blue">💾 下載存檔 (.json)</button>
        <label class="candy-btn purple" style="cursor:pointer;display:inline-flex;align-items:center;">
          📂 匯入存檔檔
          <input id="input-import-json" type="file" accept=".json,application/json" style="display:none;" />
        </label>
        <button type="button" id="btn-reset-save" class="candy-btn" style="background:#fff1f2;color:#be123c;border-color:#fecdd3;">🗑️ 重置進度</button>
      </div>

      <div id="passcode-drawer" class="passcode-drawer hidden">
        <textarea id="passcode-textarea" rows="2" placeholder="請在此貼上「DTISLAND1:...」開頭的冒險通行碼，再點擊確認還原"></textarea>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:6px;">
          <button type="button" id="btn-passcode-cancel" class="candy-btn blue" style="padding:5px 12px;">取消</button>
          <button type="button" id="btn-passcode-apply" class="candy-btn green" style="padding:5px 14px;">✅ 確認還原進度</button>
        </div>
      </div>

      <div id="save-status-msg" class="save-status-msg hidden"></div>
    </div>

    <div style="font-size:15px;font-weight:900;color:#831843;margin:12px 0 4px;">🎖️ 勇者成就徽章（已解鎖 ${unlockedCount} / ${BADGES.length}）</div>
    <div class="badge-grid">
      ${BADGES.map(b => {
        const ok = b.check(gameState);
        return `
        <div class="badge-item ${ok ? "unlocked" : ""}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${b.desc}</div>
        </div>`;
      }).join("")}
    </div>
  `;
  modalEl.classList.remove("hidden");
  modalBox.querySelector("#modal-close").onclick = () => modalEl.classList.add("hidden");

  const statusEl = modalBox.querySelector("#save-status-msg");
  const showSaveStatus = (msg, isErr = false) => {
    statusEl.textContent = msg;
    statusEl.className = `save-status-msg ${isErr ? "err" : "ok"}`;
  };

  // 1. 雲端備份
  modalBox.querySelector("#btn-cloud-upload").addEventListener("click", async () => {
    playSfx("pop");
    const accountKey = modalBox.querySelector("#cloud-save-key").value.trim();
    const pin = modalBox.querySelector("#cloud-save-pin").value.trim();
    if (!accountKey || accountKey.length < 2) {
      showSaveStatus("⚠️ 請輸入至少 2 個字的帳號或學號暱稱！", true);
      return;
    }
    if (!pin || pin.length < 4) {
      showSaveStatus("⚠️ 請設定 4～12 碼的保護密碼，避免被別人覆蓋喔！", true);
      return;
    }
    try {
      showSaveStatus("⏳ 正在上傳備份至動態島雲端伺服器…");
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountKey, pin, saveData: gameState })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showSaveStatus(`❌ 雲端備份失敗：${data.error || "請改用下方冒險通行碼備份"}`, true);
        return;
      }
      playSfx("correct");
      showSaveStatus(`🎉 雲端備份成功！帳號「${accountKey}」的進度（⭐ ${totalStars()} 星 / ${gameState.xp} XP）已安全保存！`);
    } catch (_) {
      showSaveStatus("⚠️ 目前為離線或純靜態模式，請點擊下方「🔑 複製冒險通行碼」或「💾 下載存檔」保存進度！", true);
    }
  });

  // 2. 雲端讀取
  modalBox.querySelector("#btn-cloud-download").addEventListener("click", async () => {
    playSfx("pop");
    const accountKey = modalBox.querySelector("#cloud-save-key").value.trim();
    const pin = modalBox.querySelector("#cloud-save-pin").value.trim();
    if (!accountKey || !pin) {
      showSaveStatus("⚠️ 請輸入當初備份的「帳號／暱稱」與「保護密碼」！", true);
      return;
    }
    try {
      showSaveStatus("⏳ 正在從雲端讀取你的闖關進度…");
      const res = await fetch("/api/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountKey, pin })
      });
      const data = await res.json();
      if (!res.ok || !data.ok || !data.saveData) {
        showSaveStatus(`❌ 讀取失敗：${data.error || "找不到存檔或密碼不正確"}`, true);
        return;
      }
      applyLoadedSaveObject(data.saveData);
      playSfx("fanfare");
      spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 45);
      openBadgesModal();
      const newStatus = modalBox.querySelector("#save-status-msg");
      if (newStatus) {
        newStatus.textContent = `🎉 成功載入「${gameState.myName}」的雲端進度（更新於 ${data.updatedAt || "剛剛"}）！`;
        newStatus.className = "save-status-msg ok";
      }
    } catch (_) {
      showSaveStatus("⚠️ 無法連線至雲端伺服器，請使用「📋 貼上通行碼還原」或「📂 匯入存檔檔」！", true);
    }
  });

  // 3. 複製冒險通行碼
  modalBox.querySelector("#btn-copy-code").addEventListener("click", async () => {
    playSfx("pop");
    try {
      const code = encodeSavePasscode();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        showSaveStatus("🔑 冒險通行碼已複製到剪貼簿！你可以貼在記事本或傳給自己，下次貼上即可還原進度！");
      } else {
        const drawer = modalBox.querySelector("#passcode-drawer");
        const ta = modalBox.querySelector("#passcode-textarea");
        drawer.classList.remove("hidden");
        ta.value = code;
        ta.select();
        showSaveStatus("🔑 請全選並複製下方通行碼保存：");
      }
    } catch (_) {
      showSaveStatus("❌ 產生通行碼失敗", true);
    }
  });

  // 4. 展開貼上通行碼輸入框
  const drawer = modalBox.querySelector("#passcode-drawer");
  const ta = modalBox.querySelector("#passcode-textarea");
  modalBox.querySelector("#btn-paste-code").addEventListener("click", () => {
    playSfx("pop");
    drawer.classList.toggle("hidden");
    if (!drawer.classList.contains("hidden")) {
      ta.value = "";
      ta.focus();
    }
  });
  modalBox.querySelector("#btn-passcode-cancel").addEventListener("click", () => {
    drawer.classList.add("hidden");
  });
  modalBox.querySelector("#btn-passcode-apply").addEventListener("click", () => {
    try {
      const parsed = decodeSavePasscode(ta.value);
      applyLoadedSaveObject(parsed);
      playSfx("fanfare");
      spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 45);
      openBadgesModal();
      const newStatus = modalBox.querySelector("#save-status-msg");
      if (newStatus) {
        newStatus.textContent = `🎉 冒險通行碼還原成功！歡迎回來，${gameState.myName || "探險家"}！`;
        newStatus.className = "save-status-msg ok";
      }
    } catch (_) {
      playSfx("wrong");
      showSaveStatus("❌ 通行碼格式不正確，請確認是否完整複製「DTISLAND1:...」字串！", true);
    }
  });

  // 5. 下載 JSON 存檔檔
  modalBox.querySelector("#btn-export-json").addEventListener("click", () => {
    playSfx("pop");
    const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeName = (gameState.myName || "勇者").replace(/[^a-zA-Z0-9\u4e00-\u9fa5_-]/g, "");
    a.href = url;
    a.download = `數位科技動態島存檔_${safeName}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showSaveStatus("💾 已下載存檔檔案 (.json)！下次可點「📂 匯入存檔檔」讀取進度。");
  });

  // 6. 匯入 JSON 存檔檔
  modalBox.querySelector("#input-import-json").addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024) {
      showSaveStatus("❌ 檔案過大，非有效的動態島存檔檔！", true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        applyLoadedSaveObject(parsed);
        playSfx("fanfare");
        spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 45);
        openBadgesModal();
        const newStatus = modalBox.querySelector("#save-status-msg");
        if (newStatus) {
          newStatus.textContent = `🎉 成功從檔案匯入「${gameState.myName || "探險家"}」的闖關進度！`;
          newStatus.className = "save-status-msg ok";
        }
      } catch (_) {
        playSfx("wrong");
        showSaveStatus("❌ 存檔檔案格式錯誤，無法解析！", true);
      }
    };
    reader.readAsText(file);
  });

  // 7. 重置本機進度
  modalBox.querySelector("#btn-reset-save").addEventListener("click", () => {
    if (!window.confirm("確定要清除本機目前的闖關進度並從頭開始嗎？（建議先複製通行碼或雲端備份喔！）")) return;
    const keepName = gameState.myName;
    const keepAvatar = gameState.myAvatar;
    const fresh = sanitizeSaveData({});
    fresh.myName = keepName;
    fresh.myAvatar = keepAvatar;
    fresh.hasSetCustomName = Boolean(keepName);
    Object.assign(gameState, fresh);
    gameState.visited = {};
    gameState.stars = {};
    gameState.readSections = {};
    gameState.masteredTerms = {};
    saveGame();
    renderQuestBox();
    openBadgesModal();
    const newStatus = modalBox.querySelector("#save-status-msg");
    if (newStatus) {
      newStatus.textContent = "🔄 已重置本機闖關進度！可以重新開始挑戰囉！";
      newStatus.className = "save-status-msg ok";
    }
  });
}

document.getElementById("btn-badges").addEventListener("click", openBadgesModal);
document.getElementById("player-hud").addEventListener("click", openBadgesModal);

// 魔王挑戰賽 Modal（BOSS 戰：隨機 5 題，打扣魔王血條）
function openBossQuizModal() {
  playSfx("pop");
  const pool = [];
  for (let i = 1; i <= 15; i++) {
    const ch = chapters[i];
    if (!ch) continue;
    ch.quiz.forEach(q => pool.push({ chId: i, chTitle: ch.title, ...q }));
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const picked = pool.slice(0, 5);
  let bossHp = 100;
  let answered = 0;

  modalBox.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <h2 style="font-size:20px;font-weight:900;">⚔️ 數位魔王隨機挑戰賽！</h2>
      <div style="display:flex;gap:8px;align-items:center;">
        <button id="modal-new" class="candy-btn blue" style="padding:5px 11px;">🔄 換一隻魔王</button>
        <button id="modal-close" class="candy-btn pink" style="padding:5px 11px;">✕</button>
      </div>
    </div>
    <div style="padding:14px 18px;background:linear-gradient(135deg,#ffe4e6,#fce7f3);border:2px solid #f9a8d4;border-radius:18px;margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-weight:900;margin-bottom:6px;">
        <span id="boss-status">👾 混沌 Bug 大魔王（每答對 1 題扣 20% HP！）</span>
        <span id="boss-hp-text" style="color:#e11d48;">HP: 100%</span>
      </div>
      <div class="progress-bar" style="height:14px;background:#ffffff;">
        <div id="boss-hp-bar" style="height:100%;width:100%;background:linear-gradient(90deg,#ef4444,#f97316);transition:width 0.35s;"></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${picked
        .map(
          (item, idx) => `
        <div class="quiz-item" data-idx="${idx}">
          <div style="font-size:12px;color:#0284c7;font-weight:900;">📍 來自關卡 Ch.${item.chId} ${item.chTitle}</div>
          <div class="quiz-q">${idx + 1}. ${item.q}</div>
          <div class="quiz-options">
            ${item.options
              .map(
                (opt, oi) =>
                  `<button class="quiz-opt" data-idx="${idx}" data-oi="${oi}">(${String.fromCharCode(65 + oi)}) ${opt}</button>`
              )
              .join("")}
          </div>
          <div class="quiz-explain hidden" id="mexp-${idx}">💡 <b>解析：</b>${item.explain}</div>
        </div>`
        )
        .join("")}
    </div>
  `;

  modalEl.classList.remove("hidden");
  modalBox.querySelector("#modal-close").onclick = () => modalEl.classList.add("hidden");
  modalBox.querySelector("#modal-new").onclick = openBossQuizModal;

  modalBox.querySelectorAll(".quiz-opt").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = Number(btn.dataset.idx);
      const oi = Number(btn.dataset.oi);
      const ans = picked[idx].answer;
      const box = btn.closest(".quiz-item");
      box.querySelectorAll(".quiz-opt").forEach((b, i) => {
        b.disabled = true;
        if (i === ans) b.classList.add("correct");
      });
      answered++;
      if (oi === ans) {
        bossHp = Math.max(0, bossHp - 20);
        playSfx("correct");
        rewardPlayer(30, 20, e);
      } else {
        btn.classList.add("wrong");
        playSfx("wrong");
      }
      modalBox.querySelector("#boss-hp-bar").style.width = `${bossHp}%`;
      modalBox.querySelector("#boss-hp-text").textContent = `HP: ${bossHp}%`;
      box.querySelector(`#mexp-${idx}`).classList.remove("hidden");

      if (bossHp === 0) {
        modalBox.querySelector("#boss-status").textContent = "🎉 成功討伐混沌 Bug 大魔王！獲頒傳奇寶箱！";
        playSfx("fanfare");
        spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 65);
        rewardPlayer(50, 50, e);
      } else if (answered === 5) {
        modalBox.querySelector("#boss-status").textContent = `⚡ 戰鬥結束！魔王剩餘 ${bossHp}% HP，再挑戰一次吧！`;
      }
    });
  });
}

document.getElementById("btn-quiz").addEventListener("click", openBossQuizModal);

// 全文搜尋
const searchInput = document.getElementById("search");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchResults.classList.add("hidden");
    return;
  }

  const hits = [];
  for (let id = 1; id <= 15; id++) {
    const ch = chapters[id];
    if (!ch) continue;
    let matchText = "";
    if (ch.title.toLowerCase().includes(q) || ch.summary.toLowerCase().includes(q)) {
      matchText = ch.summary;
    }
    if (!matchText) {
      for (const t of ch.terms) {
        if (t.term.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) {
          matchText = `${t.term}：${t.desc}`;
          break;
        }
      }
    }
    if (!matchText) {
      for (const s of ch.sections) {
        for (const p of s.points) {
          if (p.toLowerCase().includes(q)) {
            matchText = p;
            break;
          }
        }
        if (matchText) break;
      }
    }
    if (matchText) hits.push({ id, ch, snippet: matchText });
  }

  if (hits.length === 0) {
    searchResults.innerHTML = `<div class="search-item"><div class="search-item-snippet">找不到包含「${escapeHTML(searchInput.value)}」的寶藏知識</div></div>`;
  } else {
    const escapedQ = escapeHTML(q);
    const safeQ = escapedQ.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const reg = new RegExp(`(${safeQ})`, "gi");
    searchResults.innerHTML = hits
      .map(
        h => {
          const safeSnippet = escapeHTML(h.snippet.slice(0, 75)).replace(reg, "<mark>$1</mark>");
          return `
      <div class="search-item" data-id="${h.id}">
        <div class="search-item-head">${escapeHTML(h.ch.icon)} 關卡 ${h.id} · ${escapeHTML(h.ch.title)}</div>
        <div class="search-item-snippet">${safeSnippet}…</div>
      </div>`;
        }
      )
      .join("");
    searchResults.querySelectorAll(".search-item[data-id]").forEach(item => {
      item.addEventListener("click", () => {
        playSfx("pop");
        selectIsland(Number(item.dataset.id), "sections");
        searchResults.classList.add("hidden");
      });
    });
  }
  searchResults.classList.remove("hidden");
});

document.addEventListener("click", e => {
  if (!e.target.closest(".search")) searchResults.classList.add("hidden");
});

// 冒險地圖冊（List View）
const listViewEl = document.getElementById("list-view");
const btnList = document.getElementById("btn-list");

function toggleListView(force) {
  playSfx("pop");
  const show = force ?? listViewEl.classList.contains("hidden");
  btnList.classList.toggle("on", show);
  if (!show) {
    listViewEl.classList.add("hidden");
    return;
  }

  listViewEl.innerHTML = `
    <div class="list-header">
      <h2 style="font-size:22px;font-weight:900;">🗺️ 數位科技大冒險 · 15 座關卡地圖冊</h2>
      <button id="close-list" class="candy-btn pink" style="padding:7px 16px;">返回 3D 冒險島 ✕</button>
    </div>
    ${UNITS.map(
      u => `
      <div class="list-unit-block">
        <div class="list-unit-title" style="color:${u.color}">
          <span class="unit-dot" style="background:${u.color}"></span>
          <span>${u.code}｜${u.name}</span>
        </div>
        <div class="list-grid">
          ${u.chapters
            .map(cid => {
              const c = chapters[cid];
              const meta = getIslandMeta(cid);
              const sc = gameState.stars[cid] || 0;
              return `
              <div class="list-card" data-cid="${cid}">
                <div class="list-card-top">
                  <span>關卡 ${String(cid).padStart(2, "0")} · ${meta?.bName || ""}</span>
                  <span>${starString(sc)}</span>
                </div>
                <h4>${meta?.bIcon || c.icon} ${meta?.bName || c.title}</h4>
                <div style="font-size:12px;color:#64748b;font-weight:700;margin-bottom:4px;">單元：${c.icon} ${c.title}</div>
                <p>${c.summary}</p>
              </div>`;
            })
            .join("")}
        </div>
      </div>`
    ).join("")}
  `;
  listViewEl.classList.remove("hidden");

  listViewEl.querySelector("#close-list").addEventListener("click", () => toggleListView(false));
  listViewEl.querySelectorAll(".list-card").forEach(card => {
    card.addEventListener("click", () => {
      toggleListView(false);
      selectIsland(Number(card.dataset.cid), "sections");
    });
  });
}

// 巡島號自動導覽
const tourCard = document.getElementById("tour-card");
const btnTour = document.getElementById("btn-tour");

function startTour() {
  playSfx("pop");
  stopTour();
  btnTour.classList.add("on");
  let cur = selectedId || 1;
  selectIsland(cur, "sections");
  renderTourCard(cur);

  tourTimer = setInterval(() => {
    cur = cur < 15 ? cur + 1 : 1;
    selectIsland(cur, "sections");
    renderTourCard(cur);
  }, 6500);
}

function stopTour() {
  if (tourTimer) {
    clearInterval(tourTimer);
    tourTimer = null;
  }
  btnTour.classList.remove("on");
  tourCard.classList.add("hidden");
}

function renderTourCard(cur) {
  const ch = chapters[cur];
  tourCard.classList.remove("hidden");
  tourCard.innerHTML = `
    <div style="font-size:13px;font-weight:900;color:#0284c7;">🚂 巡島號列車行駛中（第 ${cur} / 15 站）</div>
    <div style="font-size:14.5px;font-weight:900;">${ch.icon} ${ch.title}</div>
    <div class="tour-controls">
      <button id="tour-prev">⏮ 上一島</button>
      <button id="tour-stop">⏹ 下車</button>
      <button id="tour-next">下一島 ⏭</button>
    </div>
  `;
  tourCard.querySelector("#tour-prev").onclick = () => {
    const p = cur > 1 ? cur - 1 : 15;
    selectIsland(p);
    renderTourCard(p);
  };
  tourCard.querySelector("#tour-next").onclick = () => {
    const n = cur < 15 ? cur + 1 : 1;
    selectIsland(n);
    renderTourCard(n);
  };
  tourCard.querySelector("#tour-stop").onclick = stopTour;
}

// ==========================================
// 11.5 島上其他使用者（真人在線同步 + 智慧虛擬學伴）即時動態系統
// ==========================================
const RANDOM_NAMES = ["小桃子", "阿哲", "米奇", "泡芙", "小櫻", "可樂", "布丁", "星奈", "阿緯", "糰子"];
const PEER_COLORS = [0xf472b6, 0x60a5fa, 0x34d399, 0xfbbf24, 0xc084fc, 0xfb923c];

if (!gameState.myId) {
  gameState.myId = "u_" + Math.random().toString(36).slice(2, 9);
}
if (!gameState.myName) {
  gameState.myName = "新進學員";
}
if (!gameState.myAvatar) {
  gameState.myAvatar = "🐣";
}
saveGame();

let myCurrentAction = "全景探索中";
let showPeers = true;

function sanitizePeerObject(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id || "").trim();
  if (!/^[a-zA-Z0-9_-]{3,36}$/.test(id)) return null;
  const avatar = AVATAR_CHOICES.includes(raw.avatar) ? raw.avatar : "🐣";
  const name = cleanUserText(raw.name, "神秘學員", 12);
  const action = cleanUserText(raw.action, "探索島嶼中", 28);
  const chId = Math.max(1, Math.min(15, Number(raw.chId) || 1));
  const stars = Math.max(0, Math.min(45, Number(raw.stars) || 0));
  const lv = Math.max(1, Math.min(8, Number(raw.lv) || 1));
  return { id, name, avatar, color: "#f472b6", chId, action, stars, lv, ts: Date.now() };
}

// 預設 4 位活潑的 AI 虛擬學伴，讓單人練習時島上也熱鬧滾滾！
const aiClassmates = [
  { id: "ai_1", name: "小櫻學伴", avatar: "🐰", color: "#f472b6", hex: 0xf472b6, chId: 2, targetChId: 2, action: "研讀 2-1 數字系統", stars: 12, lv: 3, offsetAngle: 0.6 },
  { id: "ai_2", name: "阿凱同學", avatar: "🦊", color: "#60a5fa", hex: 0x60a5fa, chId: 4, targetChId: 4, action: "挑戰雲端服務測驗", stars: 18, lv: 4, offsetAngle: 2.1 },
  { id: "ai_3", name: "奶茶喵喵", avatar: "🐱", color: "#fbbf24", hex: 0xfbbf24, chId: 11, targetChId: 11, action: "收集通訊小辭典", stars: 9, lv: 2, offsetAngle: 3.7 },
  { id: "ai_4", name: "宇軒學長", avatar: "🐼", color: "#34d399", hex: 0x34d399, chId: 15, targetChId: 15, action: "練習 IPv4 子網路遮罩", stars: 27, lv: 6, offsetAngle: 5.1 }
];

const remoteRealPeers = new Map(); // 來自 /api/state 或 BroadcastChannel 的真人分頁/同學
const peer3DEntities = new Map();  // id -> { group, tagEl, curPos, targetPos, phase }
const peersRootGroup = new THREE.Group();
scene.add(peersRootGroup);

const activityFeedList = [
  { id: "init_1", text: "🐰 小櫻學伴 在 Ch.02《數位化概念》獲得了 ⭐⭐！", chId: 2 },
  { id: "init_2", text: "🐼 宇軒學長 在 Ch.15《IP位址與網域名稱》奪得 ⭐⭐⭐ 皇冠！", chId: 15 },
  { id: "init_3", text: "🦊 阿凱同學 正在 Ch.04 研讀 IaaS、PaaS、SaaS 雲端架構", chId: 4 }
];
const seenEventIds = new Set(["init_1", "init_2", "init_3"]);

const PEER_GREETINGS = [
  "嗨！這關的重點超有趣，我們一起拿 ⭐⭐⭐ 滿星吧！",
  "哈囉～你也來挑戰這座島嶼嗎？加油加油！🙌",
  "剛翻完魔法小辭典，原來數位科技這麼好玩！✨",
  "嘿！有空去打上面的「⚔️ 魔王戰」試試身手喔！",
  "耶～遇到學伴了！一起集滿 45 顆星解鎖傳奇島主吧！"
];

// 產生 Q版擬人化動物帽兜學伴半身立繪 SVG（用於頭頂名牌與共學看板）
function buildChibiPortraitHTML(avatarEmoji, accentColor = "#f472b6") {
  const safeAv = escapeHTML(avatarEmoji || "🐣");
  const safeCol = /^#[0-9a-fA-F]{3,8}$/.test(accentColor) ? accentColor : "#f472b6";
  return `
    <span class="chibi-portrait" style="--hood-color:${safeCol};">
      <svg viewBox="0 0 44 44" width="28" height="28" aria-hidden="true">
        <!-- 擬人化動物連帽兜與小耳朵 -->
        <circle cx="11" cy="11" r="6" fill="${safeCol}" />
        <circle cx="33" cy="11" r="6" fill="${safeCol}" />
        <circle cx="11" cy="11" r="3.2" fill="#fff0f6" />
        <circle cx="33" cy="11" r="3.2" fill="#fff0f6" />
        <!-- 身體與書包帶 -->
        <path d="M10 42 C10 31, 34 31, 34 42 Z" fill="${safeCol}" />
        <path d="M17 33 L22 39 L27 33" fill="#ffffff" />
        <!-- 圓潤連帽頭套外圈 -->
        <circle cx="22" cy="21" r="14" fill="${safeCol}" />
        <!-- Q版粉嫩臉蛋 -->
        <circle cx="22" cy="22.5" r="11" fill="#ffe8d6" />
        <!-- 劉海弧線 -->
        <path d="M12 18 Q22 12 32 18" fill="none" stroke="${safeCol}" stroke-width="2.5" stroke-linecap="round" />
        <!-- 水汪汪大眼睛 + 眼神光 -->
        <circle cx="17.5" cy="22.5" r="2.1" fill="#2d1e2f" />
        <circle cx="26.5" cy="22.5" r="2.1" fill="#2d1e2f" />
        <circle cx="16.9" cy="21.8" r="0.8" fill="#ffffff" />
        <circle cx="25.9" cy="21.8" r="0.8" fill="#ffffff" />
        <!-- 粉紅腮紅 -->
        <ellipse cx="14.2" cy="25" rx="2.3" ry="1.3" fill="#fb7185" opacity="0.65" />
        <ellipse cx="29.8" cy="25" rx="2.3" ry="1.3" fill="#fb7185" opacity="0.65" />
        <!-- 微笑小嘴 -->
        <path d="M19.5 25.8 Q22 28.2 24.5 25.8" fill="none" stroke="#9d174d" stroke-width="1.6" stroke-linecap="round" />
      </svg>
      <span class="chibi-animal-badge">${safeAv}</span>
    </span>
  `;
}

// 根據动作文字推斷擬人化表情與動作小圖示
function getHumanizedActionBadge(actionStr = "") {
  if (actionStr.includes("測驗") || actionStr.includes("挑戰")) return "✍️ 振筆解題中";
  if (actionStr.includes("圖鑑") || actionStr.includes("辭典")) return "🃏 翻閱圖鑑中";
  if (actionStr.includes("研讀") || actionStr.includes("寶箱")) return "📖 專心研讀中";
  return "🏃 活力探索中";
}

// 建立 3D Q版二頭身擬人化學伴公仔（含五官、雙手雙腳、小書包、課本與對應動物立體耳帽）
function createPeerPawnMesh(hexColor, avatarEmoji = "🐣") {
  const g = new THREE.Group();

  // 腳底柔和光環底座
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.38, 0.52, 36),
    new THREE.MeshBasicMaterial({ color: hexColor, side: THREE.DoubleSide, transparent: true, opacity: 0.75 })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.05;
  g.add(ring);

  // 1. 擬人化雙腿與撞色小球鞋（走路時可前後擺動）
  const legMat = makeMat(0x4a3540);
  const shoeMat = makeMat(hexColor);

  const legL = new THREE.Group();
  legL.position.set(-0.13, 0.34, 0);
  const thighL = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.16, 12, 16), legMat);
  thighL.position.y = -0.08;
  const shoeL = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 16), shoeMat);
  shoeL.scale.set(1, 0.72, 1.35);
  shoeL.position.set(0, -0.2, 0.04);
  legL.add(thighL, shoeL);

  const legR = legL.clone();
  legR.position.x = 0.13;
  g.add(legL, legR);

  // 2. Q版二頭身圓潤身體（連帽探險服 + 白色小領巾 + 背後雙色小書包）
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.27, 0.28, 18, 28), makeMat(hexColor));
  torso.position.y = 0.64;
  g.add(torso);

  // 白色圓領巾
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.045, 12, 24), makeMat(0xffffff));
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 0.86;
  g.add(collar);

  // 背後立體探險小書包
  const backpack = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 20), makeMat(0xfef08a));
  backpack.scale.set(0.95, 1.1, 0.65);
  backpack.position.set(0, 0.64, -0.23);
  const packPocket = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), makeMat(0xffffff));
  packPocket.scale.set(1, 0.7, 0.5);
  packPocket.position.set(0, 0.58, -0.32);
  g.add(backpack, packPocket);

  // 3. 擬人化雙臂與粉嫩小圓手（左手拿小課本，右手揮手打招呼）
  const skinMat = makeMat(0xffe5d4);
  const sleeveMat = makeMat(hexColor);

  const armL = new THREE.Group();
  armL.position.set(-0.32, 0.78, 0);
  const upperArmL = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.18, 12, 16), sleeveMat);
  upperArmL.position.y = -0.1;
  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 14), skinMat);
  handL.position.y = -0.23;
  // 左手拿著迷你數位寶典小書
  const miniBook = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.05), makeMat(0x38bdf8));
  miniBook.position.set(-0.04, -0.24, 0.1);
  miniBook.rotation.set(0.4, 0.3, 0.2);
  armL.add(upperArmL, handL, miniBook);
  armL.rotation.z = 0.32;

  const armR = new THREE.Group();
  armR.position.set(0.32, 0.78, 0);
  const upperArmR = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.18, 12, 16), sleeveMat);
  upperArmR.position.y = -0.1;
  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 14), skinMat);
  handR.position.y = -0.23;
  armR.add(upperArmR, handR);
  armR.rotation.z = -0.45;
  g.add(armL, armR);

  // 4. Q版擬人化頭部（含粉嫩臉龐、水汪汪大眼、眼神高光、腮紅、微笑與動物連帽耳飾）
  const headGroup = new THREE.Group();
  headGroup.position.y = 1.22;

  // 粉嫩圓臉蛋
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.35, 28, 28), skinMat);
  headGroup.add(face);

  // 動物連帽頭套後腦勺包覆
  const hoodBack = new THREE.Mesh(new THREE.SphereGeometry(0.375, 26, 26), makeMat(hexColor));
  hoodBack.position.set(0, 0.04, -0.05);
  headGroup.add(hoodBack);

  // 水汪汪大眼睛 + 白色閃亮眼神光
  const eyeMat = makeMat(0x231924);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 14), eyeMat);
  eyeL.scale.set(0.9, 1.15, 0.6);
  eyeL.position.set(-0.12, 0.02, 0.31);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.12;

  const sparkL = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), sparkMat);
  sparkL.position.set(-0.105, 0.045, 0.345);
  const sparkR = sparkL.clone();
  sparkR.position.x = 0.135;

  // 粉紅蘋果肌腮紅
  const cheekMat = makeMat(0xfb7185);
  const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.062, 14, 14), cheekMat);
  cheekL.scale.set(1.2, 0.75, 0.5);
  cheekL.position.set(-0.21, -0.05, 0.28);
  const cheekR = cheekL.clone();
  cheekR.position.x = 0.21;

  // 微笑弧形小嘴
  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.055, 0.016, 10, 20, Math.PI),
    makeMat(0xbe185d)
  );
  smile.rotation.x = Math.PI;
  smile.position.set(0, -0.06, 0.33);

  headGroup.add(eyeL, eyeR, sparkL, sparkR, cheekL, cheekR, smile);

  // 5. 依學伴代表動物頭像 (avatarEmoji) 加上立體擬人化獸耳／頭飾
  const innerPinkMat = makeMat(0xfda4af);
  const earMainMat = makeMat(hexColor);

  if (avatarEmoji === "🐰") {
    // 長長立體兔耳朵（一隻微彎）
    const earL = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.28, 12, 18), makeMat(0xffffff));
    earL.position.set(-0.15, 0.44, -0.02);
    earL.rotation.z = 0.12;
    const innerL = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.2, 10, 14), innerPinkMat);
    innerL.position.set(-0.15, 0.43, 0.03);
    innerL.rotation.z = 0.12;

    const earR = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.28, 12, 18), makeMat(0xffffff));
    earR.position.set(0.16, 0.42, -0.02);
    earR.rotation.z = -0.32;
    const innerR = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.2, 10, 14), innerPinkMat);
    innerR.position.set(0.16, 0.41, 0.03);
    innerR.rotation.z = -0.32;
    headGroup.add(earL, innerL, earR, innerR);
  } else if (avatarEmoji === "🐱" || avatarEmoji === "🦊") {
    // 尖尖貓耳 / 狐狸耳 + 俏皮尾巴
    const coneMat = avatarEmoji === "🦊" ? makeMat(0xfb923c) : earMainMat;
    const earL = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.26, 20), coneMat);
    earL.position.set(-0.22, 0.34, -0.02);
    earL.rotation.z = 0.35;
    const earR = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.26, 20), coneMat);
    earR.position.set(0.22, 0.34, -0.02);
    earR.rotation.z = -0.35;
    headGroup.add(earL, earR);

    const tail = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.28, 12, 16), coneMat);
    tail.position.set(0, 0.45, -0.34);
    tail.rotation.x = -0.7;
    g.add(tail);
  } else if (avatarEmoji === "🦄") {
    // 獨角獸金色螺旋角 + 雙耳
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.32, 20), makeMat(0xfacc15));
    horn.position.set(0, 0.44, 0.16);
    horn.rotation.x = 0.28;
    const mane = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), makeMat(0xc084fc));
    mane.position.set(0, 0.34, 0.04);
    headGroup.add(horn, mane);
  } else if (avatarEmoji === "🐼") {
    // 黑白貓熊圓耳朵
    const pandaBlk = makeMat(0x27272a);
    const earL = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 18), pandaBlk);
    earL.position.set(-0.26, 0.31, -0.02);
    const earR = earL.clone();
    earR.position.x = 0.26;
    headGroup.add(earL, earR);
  } else if (avatarEmoji === "🐶") {
    // 小狗軟萌垂耳
    const dogEarMat = makeMat(0xfbbf24);
    const earL = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.22, 12, 16), dogEarMat);
    earL.position.set(-0.34, 0.08, 0.02);
    earL.rotation.z = 0.28;
    const earR = earL.clone();
    earR.position.x = 0.34;
    earR.rotation.z = -0.28;
    headGroup.add(earL, earR);
  } else if (avatarEmoji === "🦁") {
    // 小獅子太陽花鬃毛圈
    const mane = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.09, 14, 24), makeMat(0xf97316));
    mane.position.set(0, 0.04, 0.02);
    headGroup.add(mane);
  } else if (avatarEmoji === "🐣" || avatarEmoji === "🦉") {
    // 小雞 / 貓頭鷹：頭頂Q彈雙呆毛 + 小橘帽簷
    const tuft1 = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.14, 10, 14), makeMat(0xfacc15));
    tuft1.position.set(-0.04, 0.42, 0);
    tuft1.rotation.z = 0.25;
    const tuft2 = tuft1.clone();
    tuft2.position.x = 0.05;
    tuft2.rotation.z = -0.2;
    const beakVisor = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), makeMat(0xfb923c));
    beakVisor.scale.set(1.3, 0.5, 1.1);
    beakVisor.position.set(0, 0.24, 0.33);
    headGroup.add(tuft1, tuft2, beakVisor);
  } else {
    // 🐻 🐨 🐹 等圓滾滾雙層毛絨熊耳
    const earL = new THREE.Mesh(new THREE.SphereGeometry(0.135, 18, 18), earMainMat);
    earL.position.set(-0.26, 0.31, -0.02);
    const inL = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 14), innerPinkMat);
    inL.position.set(-0.26, 0.31, 0.06);
    const earR = earL.clone();
    earR.position.x = 0.26;
    const inR = inL.clone();
    inR.position.x = 0.26;
    headGroup.add(earL, inL, earR, inR);
  }

  g.add(headGroup);

  // 儲存可動關節供動畫迴圈進行走路擺手、揮手與轉頭
  g.userData.rig = {
    legL,
    legR,
    armL,
    armR,
    headGroup,
    ring
  };

  return g;
}

function triggerPeerGreeting(ent) {
  if (!ent) return;
  playSfx("pop");
  ent.greetTimer = 4.2;
  const quip = PEER_GREETINGS[Math.floor(Math.random() * PEER_GREETINGS.length)];
  ent.greetText = quip;
  renderPeerTagContent(ent);
}

function renderPeerTagContent(ent) {
  if (!ent || !ent.tagEl) return;
  const peer = ent.peerData;
  const colorStr = peer.color || "#f472b6";
  const portraitHTML = buildChibiPortraitHTML(peer.avatar, colorStr);
  const humanBadge = getHumanizedActionBadge(peer.action);
  const greetBubbleHTML =
    ent.greetTimer > 0 && ent.greetText
      ? `<div class="peer-greet-bubble">💬 ${escapeHTML(ent.greetText)}</div>`
      : "";

  ent.tagEl.innerHTML = `
    ${greetBubbleHTML}
    <div class="peer-tag-main">
      ${portraitHTML}
      <div class="peer-tag-info">
        <div class="peer-tag-top">
          <span class="peer-tag-name">${escapeHTML(peer.name)}</span>
          <span class="peer-tag-lv">Lv.${Number(peer.lv) || 1}</span>
        </div>
        <div class="peer-tag-act">${escapeHTML(humanBadge)} · ${escapeHTML(peer.action)}</div>
      </div>
    </div>
  `;
}

function ensurePeer3D(peer, idx) {
  let ent = peer3DEntities.get(peer.id);
  const isl = islandGroups.get(peer.chId) || islandGroups.get(1);
  const ang = peer.offsetAngle ?? (idx * 1.5 + 0.8);
  const islY = isl ? isl.position.y : 4.0;
  const target = new THREE.Vector3(
    isl.position.x + Math.cos(ang) * 2.25,
    islY + 1.05,
    isl.position.z + Math.sin(ang) * 2.25
  );
  const hex = peer.hex || PEER_COLORS[idx % PEER_COLORS.length];
  const colorCss = "#" + hex.toString(16).padStart(6, "0");
  peer.color = colorCss;

  if (!ent) {
    const meshGroup = createPeerPawnMesh(hex, peer.avatar);
    meshGroup.position.copy(target);
    meshGroup.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.userData.peerId = peer.id;
        pickableMeshes.push(o);
      }
    });
    peersRootGroup.add(meshGroup);

    const tagEl = document.createElement("div");
    tagEl.className = "peer-3d-tag";
    tagEl.addEventListener("click", e => {
      e.stopPropagation();
      triggerPeerGreeting(ent);
      selectIsland(ent.peerData.chId);
    });
    labelsContainer.appendChild(tagEl);

    ent = {
      id: peer.id,
      peerData: peer,
      lastAvatar: peer.avatar,
      hex,
      group: meshGroup,
      tagEl,
      curPos: target.clone(),
      targetPos: target.clone(),
      phase: idx * 1.3,
      greetTimer: 0,
      greetText: ""
    };
    peer3DEntities.set(peer.id, ent);
  } else if (ent.lastAvatar !== peer.avatar) {
    // 若使用者更換了代表動物頭像，即時重建 3D 擬人化角色模型
    peersRootGroup.remove(ent.group);
    const newMesh = createPeerPawnMesh(ent.hex, peer.avatar);
    newMesh.position.copy(ent.curPos);
    newMesh.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.userData.peerId = peer.id;
        pickableMeshes.push(o);
      }
    });
    peersRootGroup.add(newMesh);
    ent.group = newMesh;
    ent.lastAvatar = peer.avatar;
  }

  ent.peerData = peer;
  ent.targetPos.copy(target);
  renderPeerTagContent(ent);
  ent.tagEl.style.display = showPeers ? "flex" : "none";
}

function getAllActivePeers() {
  const list = [...remoteRealPeers.values(), ...aiClassmates];
  return list;
}

function pushFeedEvent(ev) {
  if (!ev || !ev.id || seenEventIds.has(ev.id)) return;
  const safeText = cleanUserText(ev.text, "", 80);
  if (!safeText) return;
  seenEventIds.add(ev.id);
  activityFeedList.unshift({
    id: String(ev.id).slice(0, 40),
    text: safeText,
    chId: Math.max(1, Math.min(15, Number(ev.chId) || 1))
  });
  if (activityFeedList.length > 12) activityFeedList.pop();

  // 手機版收合狀態時，在膠囊上跳出微型提示氣泡 3.5 秒
  const toastEl = document.getElementById("ticker-toast");
  if (toastEl) {
    toastEl.textContent = safeText;
    toastEl.classList.remove("hidden");
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 3500);
  }

  renderLiveTickerUI();
}

function renderLiveTickerUI() {
  const peers = getAllActivePeers();
  const totalCount = peers.length + 1; // +1 包含自己
  const onlineEl = document.getElementById("online-count");
  if (onlineEl) onlineEl.textContent = String(totalCount);
  const miniCountEl = document.getElementById("ticker-mini-count");
  if (miniCountEl) miniCountEl.textContent = `(${totalCount}人)`;

  const feedEl = document.getElementById("ticker-feed");
  if (feedEl) {
    feedEl.innerHTML = activityFeedList
      .slice(0, 4)
      .map(
        ev => `<div class="feed-item" data-chid="${Number(ev.chId) || 1}">${escapeHTML(ev.text)}</div>`
      )
      .join("");
    feedEl.querySelectorAll(".feed-item").forEach(item => {
      item.addEventListener("click", () => {
        playSfx("pop");
        selectIsland(Number(item.dataset.chid));
      });
    });
  }

  const barEl = document.getElementById("peer-avatars-bar");
  if (barEl) {
    const myInfo = getLevelInfo(gameState.xp);
    const myPortrait = buildChibiPortraitHTML(myInfo.avatar, "#f472b6");
    const myChip = `<span class="peer-chip" id="my-self-chip" style="border-color:#f472b6;background:#fdf2f8;" title="點我修改暱稱與代表頭像">${myPortrait}<span>我(${escapeHTML(gameState.myName)}) · Ch.${selectedId || 1}</span></span>`;
    const otherChips = peers
      .slice(0, 6)
      .map((p, idx) => {
        const hex = p.hex || PEER_COLORS[idx % PEER_COLORS.length];
        const col = "#" + hex.toString(16).padStart(6, "0");
        const pPortrait = buildChibiPortraitHTML(p.avatar, col);
        return `<span class="peer-chip" data-peerid="${escapeHTML(p.id)}" data-chid="${Number(p.chId) || 1}" title="${escapeHTML(p.name)}：${escapeHTML(p.action)}（點擊跟學伴打招呼並飛往 Ch.${Number(p.chId) || 1}）">${pPortrait}<span>${escapeHTML(p.name)} · Ch.${Number(p.chId) || 1}</span></span>`;
      })
      .join("");
    barEl.innerHTML = myChip + otherChips;
    const selfChipEl = barEl.querySelector("#my-self-chip");
    if (selfChipEl) {
      selfChipEl.addEventListener("click", () => openNameProfileModal(false));
    }
    barEl.querySelectorAll(".peer-chip[data-chid]").forEach(chip => {
      chip.addEventListener("click", () => {
        const pid = chip.dataset.peerid;
        const ent = pid ? peer3DEntities.get(pid) : null;
        if (ent) triggerPeerGreeting(ent);
        else playSfx("pop");
        selectIsland(Number(chip.dataset.chid));
      });
    });
  }

  // 更新每座島嶼路牌上的學伴小頭像群
  const byIsland = {};
  peers.forEach(p => {
    byIsland[p.chId] = byIsland[p.chId] || [];
    byIsland[p.chId].push(p);
  });
  for (let i = 1; i <= 15; i++) {
    const rowEl = document.getElementById(`ipeers-${i}`);
    if (!rowEl) continue;
    const arr = byIsland[i] || [];
    if (!showPeers || arr.length === 0) {
      rowEl.innerHTML = "";
    } else {
      rowEl.innerHTML = arr.map(p => `<span title="${escapeHTML(p.name)}：${escapeHTML(p.action)}">${escapeHTML(p.avatar)}</span>`).join("") +
        `<span style="font-size:10.5px;color:#be185d;font-weight:800;margin-left:2px;">${arr.length}人</span>`;
    }
  }

  // 同步 3D 模型與清除離線者
  const activeIds = new Set(peers.map(p => p.id));
  peer3DEntities.forEach((ent, id) => {
    if (!activeIds.has(id)) {
      peersRootGroup.remove(ent.group);
      ent.tagEl.remove();
      peer3DEntities.delete(id);
    }
  });
  peers.forEach((p, idx) => ensurePeer3D(p, idx));
}

// ==========================================
// 跨裝置全網即時學伴同步（支援 GitHub Pages 靜態託管 ＆ 跨網真人連線）
// ==========================================
const MQTT_BROKERS = [
  "wss://broker.emqx.io:8084/mqtt",
  "wss://broker.hivemq.com:8884/mqtt"
];
const MQTT_TOPIC_PEERS = "tech-island/v1/ducky6610/peers";
const MQTT_TOPIC_EVENTS = "tech-island/v1/ducky6610/events";

let mqttClient = null;
let currentBrokerIdx = 0;
let isMqttConnected = false;

function initRealtimeNetwork() {
  if (typeof window.mqtt === "undefined") return;
  const brokerUrl = MQTT_BROKERS[currentBrokerIdx % MQTT_BROKERS.length];
  try {
    const clientId = "ti_" + (gameState.myId || "u") + "_" + Math.random().toString(36).slice(2, 7);
    mqttClient = window.mqtt.connect(brokerUrl, {
      clientId,
      clean: true,
      connectTimeout: 5000,
      reconnectPeriod: 5000,
      keepalive: 25
    });

    mqttClient.on("connect", () => {
      isMqttConnected = true;
      mqttClient.subscribe([MQTT_TOPIC_PEERS, MQTT_TOPIC_EVENTS]);
      broadcastActivity("加入了數位科技動態島！🎉", "全景探索中", selectedId || 1);
    });

    mqttClient.on("message", (topic, payload) => {
      try {
        const text = new TextDecoder().decode(payload);
        const data = JSON.parse(text);
        if (topic === MQTT_TOPIC_PEERS && data && data.id && data.id !== gameState.myId) {
          const safePeer = sanitizePeerObject(data);
          if (safePeer) {
            remoteRealPeers.set(safePeer.id, safePeer);
            renderLiveTickerUI();
          }
        } else if (topic === MQTT_TOPIC_EVENTS && data && data.text) {
          pushFeedEvent(data);
        }
      } catch (_) {}
    });

    mqttClient.on("error", () => {
      isMqttConnected = false;
      currentBrokerIdx++;
      try { mqttClient.end(true); } catch (_) {}
      setTimeout(initRealtimeNetwork, 4000);
    });

    mqttClient.on("offline", () => {
      isMqttConnected = false;
    });
  } catch (_) {}
}

initRealtimeNetwork();

// 每 6 秒自動清理超過 20 秒未有心跳更新的離線學伴
setInterval(() => {
  const now = Date.now();
  let changed = false;
  remoteRealPeers.forEach((p, id) => {
    if (now - (p.ts || 0) > 20000) {
      remoteRealPeers.delete(id);
      changed = true;
    }
  });
  if (changed) renderLiveTickerUI();
}, 6000);

// 跨分頁 BroadcastChannel + 後端 /api/ping 雙重即時同步
const bcChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("dt_island_live_v1") : null;
if (bcChannel) {
  bcChannel.onmessage = e => {
    const msg = e.data;
    if (!msg || typeof msg !== "object") return;
    if (msg.peer && msg.peer.id !== gameState.myId) {
      const safePeer = sanitizePeerObject(msg.peer);
      if (safePeer) remoteRealPeers.set(safePeer.id, safePeer);
    }
    if (msg.event) pushFeedEvent(msg.event);
    renderLiveTickerUI();
  };
}

async function broadcastActivity(eventText = null, newAction = null, chOverride = null) {
  if (newAction) myCurrentAction = cleanUserText(newAction, "探索島嶼中", 28);
  const info = getLevelInfo(gameState.xp);
  const curCh = chOverride || selectedId || 1;
  const myPeerObj = {
    id: gameState.myId,
    name: gameState.myName,
    avatar: info.avatar,
    color: "#f472b6",
    chId: curCh,
    action: myCurrentAction,
    stars: totalStars(),
    lv: info.lv,
    ts: Date.now()
  };

  let evObj = null;
  if (eventText) {
    evObj = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      text: `${info.avatar} ${gameState.myName} ${cleanUserText(eventText, "", 60)}`,
      chId: curCh
    };
    pushFeedEvent(evObj);
  }

  // 1. MQTT 全球跨網即時廣播（GitHub Pages 跨裝置跨網路核心通道）
  if (mqttClient && isMqttConnected) {
    try {
      mqttClient.publish(MQTT_TOPIC_PEERS, JSON.stringify(myPeerObj));
      if (evObj) {
        mqttClient.publish(MQTT_TOPIC_EVENTS, JSON.stringify(evObj));
      }
    } catch (_) {}
  }

  // 2. 本機同瀏覽器多分頁即時廣播
  if (bcChannel) {
    bcChannel.postMessage({ peer: myPeerObj, event: evObj });
  }

  // 3. 本地／自架伺服器 /api/ping 回退支援
  try {
    const res = await fetch("/api/ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...myPeerObj, event: evObj ? evObj.text : null })
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.peers)) {
        data.peers.forEach(p => {
          if (p && p.id !== gameState.myId) {
            const safePeer = sanitizePeerObject(p);
            if (safePeer) remoteRealPeers.set(safePeer.id, safePeer);
          }
        });
      }
      if (Array.isArray(data.events)) {
        data.events.forEach(ev => pushFeedEvent(ev));
      }
      renderLiveTickerUI();
    }
  } catch (_) {
    // 靜態伺服器無 /api/ping 時，由 MQTT 與 BroadcastChannel 順暢接手
  }
}

// 定期心跳同步 + AI 虛擬學伴每隔幾秒在島嶼間自主學習移動
setInterval(() => {
  broadcastActivity();
}, 4000);

setInterval(() => {
  const ai = aiClassmates[Math.floor(Math.random() * aiClassmates.length)];
  const nextCh = Math.floor(Math.random() * 15) + 1;
  const chObj = chapters[nextCh] || { title: `第 ${nextCh} 章` };
  const acts = [
    { act: `研讀 Ch.${nextCh} 重點`, msg: `前往 Ch.${String(nextCh).padStart(2, "0")}《${chObj.title}》研讀重點寶箱 📖` },
    { act: `挑戰 Ch.${nextCh} 測驗`, msg: `在 Ch.${String(nextCh).padStart(2, "0")}《${chObj.title}》答對題目獲得 ⭐！` },
    { act: `收集 Ch.${nextCh} 圖鑑`, msg: `在 Ch.${String(nextCh).padStart(2, "0")} 收集了魔法小辭典卡牌 🃏` }
  ];
  const pick = acts[Math.floor(Math.random() * acts.length)];
  ai.chId = nextCh;
  ai.action = pick.act;
  pushFeedEvent({
    id: `ai-${Date.now()}`,
    text: `${ai.avatar} ${ai.name} ${pick.msg}`,
    chId: nextCh
  });
  renderLiveTickerUI();
}, 6500);

renderLiveTickerUI();

// ==========================================
// 登島歡迎與勇者自訂名稱 / 代表頭像視窗
// ==========================================
function openNameProfileModal(isInitial = false) {
  playSfx("pop");
  let pickedAvatar = AVATAR_CHOICES.includes(gameState.myAvatar) ? gameState.myAvatar : "🐣";
  const initialNameVal = gameState.hasSetCustomName ? gameState.myName : "";

  modalBox.innerHTML = `
    <div class="welcome-profile-box">
      <div class="welcome-badge">${isInitial ? "🎉 歡迎來到數位科技大冒險" : "✏️ 勇者名牌設定"}</div>
      <h2 class="welcome-title">${isInitial ? "先替自己取個響亮的勇者名稱吧！" : "修改你的島上暱稱與代表頭像"}</h2>
      <p class="welcome-sub">你的名字與代表動物會同步顯示在島上，跟其他在線學伴一起闖關奪星！</p>

      <div class="welcome-section">
        <label class="welcome-label" for="custom-name-input">🏷️ 你的勇者暱稱（1～12 字）</label>
        <div class="welcome-input-row">
          <input
            id="custom-name-input"
            type="text"
            maxlength="12"
            autocomplete="off"
            placeholder="例如：資一甲小桃、電神阿哲…"
            value="${escapeHTML(initialNameVal)}"
          />
          <button type="button" id="btn-random-name" class="candy-btn yellow" title="隨機產生可愛暱稱">🎲 隨機取名</button>
        </div>
      </div>

      <div class="welcome-section">
        <label class="welcome-label">🐾 選擇你的代表小動物頭像</label>
        <div class="avatar-picker-grid" id="avatar-picker-grid">
          ${AVATAR_CHOICES.map(
            av => `<button type="button" class="avatar-pick-btn ${av === pickedAvatar ? "selected" : ""}" data-av="${escapeHTML(av)}">${escapeHTML(av)}</button>`
          ).join("")}
        </div>
      </div>

      <div class="welcome-actions">
        ${!isInitial ? `<button type="button" id="btn-name-cancel" class="candy-btn blue">取消</button>` : ""}
        <button type="button" id="btn-welcome-load-save" class="candy-btn yellow">☁️ 讀取舊存檔</button>
        <button type="button" id="btn-name-confirm" class="candy-btn pink welcome-submit-btn">
          🚀 ${isInitial ? "開始登島冒險！" : "儲存名牌設定"}
        </button>
      </div>
    </div>
  `;

  modalEl.classList.remove("hidden");
  const nameInput = modalBox.querySelector("#custom-name-input");
  setTimeout(() => nameInput && nameInput.focus(), 80);

  const loadSaveBtn = modalBox.querySelector("#btn-welcome-load-save");
  if (loadSaveBtn) {
    loadSaveBtn.addEventListener("click", () => {
      openBadgesModal();
    });
  }

  modalBox.querySelectorAll(".avatar-pick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      playSfx("pop");
      pickedAvatar = btn.dataset.av;
      modalBox.querySelectorAll(".avatar-pick-btn").forEach(b => b.classList.toggle("selected", b === btn));
    });
  });

  modalBox.querySelector("#btn-random-name").addEventListener("click", () => {
    playSfx("pop");
    const rand = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)] + Math.floor(10 + Math.random() * 89);
    nameInput.value = rand;
    nameInput.focus();
  });

  const cancelBtn = modalBox.querySelector("#btn-name-cancel");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      playSfx("pop");
      modalEl.classList.add("hidden");
    });
  }

  const submitProfile = () => {
    const rawVal = nameInput.value.trim();
    const fallbackName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)] + Math.floor(10 + Math.random() * 89);
    const finalName = cleanUserText(rawVal, gameState.hasSetCustomName ? gameState.myName : fallbackName, 12);

    gameState.myName = finalName;
    gameState.myAvatar = pickedAvatar;
    gameState.hasSetCustomName = true;
    saveGame();
    renderLiveTickerUI();
    modalEl.classList.add("hidden");
    playSfx("fanfare");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 35);

    if (isInitial) {
      broadcastActivity("正式登上了數位科技動態島！🎉", "全景探索中", 1);
      triggerMascotSpeech(`歡迎「${finalName}」${pickedAvatar} 登島！點選任一座島嶼開始收集 ⭐⭐⭐ 吧！`);
    } else {
      broadcastActivity("換上了全新的勇者名牌 ✨");
      triggerMascotSpeech(`名牌已更新為「${finalName}」${pickedAvatar}！太好看啦！`);
    }
  };

  modalBox.querySelector("#btn-name-confirm").addEventListener("click", submitProfile);
  nameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitProfile();
    }
  });
}

// 切換顯示/隱藏學伴按鈕與改名按鈕
const btnPeers = document.getElementById("btn-peers");
const liveTickerEl = document.getElementById("live-ticker");
if (btnPeers) {
  btnPeers.addEventListener("click", () => {
    playSfx("pop");
    showPeers = !showPeers;
    btnPeers.classList.toggle("on", showPeers);
    peersRootGroup.visible = showPeers;
    liveTickerEl.classList.toggle("hidden", !showPeers);
    renderLiveTickerUI();
  });
}

const btnEditName = document.getElementById("btn-edit-name");
if (btnEditName) {
  btnEditName.addEventListener("click", e => {
    e.stopPropagation();
    openNameProfileModal(false);
  });
}

// 手機端導覽列折疊選單 ☰
const btnMobileToggle = document.getElementById("btn-mobile-toggle");
const topbarCollapsible = document.getElementById("topbar-collapsible");
if (btnMobileToggle && topbarCollapsible) {
  btnMobileToggle.addEventListener("click", e => {
    e.stopPropagation();
    playSfx("pop");
    const isOpen = topbarCollapsible.classList.toggle("open");
    const icon = btnMobileToggle.querySelector(".m-icon");
    if (icon) icon.textContent = isOpen ? "✕" : "☰";
  });
}

// 點擊頂部以外區域時自動收合手機選單
document.addEventListener("click", e => {
  if (!e.target.closest("#topbar")) {
    if (topbarCollapsible && topbarCollapsible.classList.contains("open")) {
      topbarCollapsible.classList.remove("open");
      if (btnMobileToggle) {
        const icon = btnMobileToggle.querySelector(".m-icon");
        if (icon) icon.textContent = "☰";
      }
    }
  }
});

// 手機端學伴看板點擊展開／收合
const tickerHead = document.getElementById("ticker-head");
if (tickerHead && liveTickerEl) {
  tickerHead.addEventListener("click", e => {
    if (e.target.closest("#btn-edit-name")) return;
    playSfx("pop");
    liveTickerEl.classList.toggle("collapsed");
  });
}

// ==========================================
// 11. 工具列與滑鼠/鍵盤事件綁定
// ==========================================
document.getElementById("btn-overview").addEventListener("click", resetOverview);
btnList.addEventListener("click", () => toggleListView());
btnTour.addEventListener("click", () => (tourTimer ? stopTour() : startTour()));

const btnLinks = document.getElementById("btn-links");
btnLinks.addEventListener("click", () => {
  playSfx("pop");
  showLinks = !showLinks;
  linksGroup.visible = showLinks;
  btnLinks.classList.toggle("on", showLinks);
  updateIslandHighlights();
});

const btnSound = document.getElementById("btn-sound");
btnSound.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  btnSound.textContent = soundEnabled ? "🔊" : "🔇";
  btnSound.classList.toggle("on", soundEnabled);
  if (soundEnabled) playSfx("coin");
});

// Raycaster 拾取
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downPos = { x: 0, y: 0 };

// 手機端觸控探索 3D 城市時，自動淡化按鈕並自動收合浮動視窗
renderer.domElement.addEventListener("touchstart", () => {
  document.body.classList.add("touch-exploring");
  if (topbarCollapsible && topbarCollapsible.classList.contains("open")) {
    topbarCollapsible.classList.remove("open");
    if (btnMobileToggle) {
      const icon = btnMobileToggle.querySelector(".m-icon");
      if (icon) icon.textContent = "☰";
    }
  }
  if (window.innerWidth <= 768) {
    if (liveTickerEl) liveTickerEl.classList.add("collapsed");
  }
}, { passive: true });

renderer.domElement.addEventListener("touchend", () => {
  document.body.classList.remove("touch-exploring");
}, { passive: true });

renderer.domElement.addEventListener("touchcancel", () => {
  document.body.classList.remove("touch-exploring");
}, { passive: true });

renderer.domElement.addEventListener("pointerdown", e => {
  downPos = { x: e.clientX, y: e.clientY };
});

renderer.domElement.addEventListener("pointerup", e => {
  if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 6) return;
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(pickableMeshes, false);
  if (hits.length > 0) {
    const obj = hits[0].object;
    if (obj.userData.isMascot) {
      playSfx("coin");
      triggerMascotSpeech();
      return;
    }
    if (obj.userData.peerId) {
      const ent = peer3DEntities.get(obj.userData.peerId);
      if (ent) {
        triggerPeerGreeting(ent);
        selectIsland(ent.peerData.chId);
        return;
      }
    }
    if (obj.userData.chId) {
      playSfx("pop");
      selectIsland(obj.userData.chId);
    }
  }
});

window.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "Escape") {
    modalEl.classList.add("hidden");
    toggleListView(false);
    closePanel();
  } else if (e.key.toLowerCase() === "h") {
    resetOverview();
  } else if (e.key.toLowerCase() === "l") {
    toggleListView();
  } else if (e.key.toLowerCase() === "b") {
    openBadgesModal();
  } else if (e.key.toLowerCase() === "t") {
    tourTimer ? stopTour() : startTour();
  } else if (e.key.toLowerCase() === "q") {
    openBossQuizModal();
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// 12. 主動畫迴圈
// ==========================================
const clock = new THREE.Clock();
const projVec = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();

  if (camAnim) {
    const u = Math.min(1, (performance.now() - camAnim.startTime) / camAnim.duration);
    const ease = 1 - Math.pow(1 - u, 3);
    camera.position.lerpVectors(camAnim.startPos, camAnim.endPos, ease);
    controls.target.lerpVectors(camAnim.startTarget, camAnim.endTarget, ease);
    if (u >= 1) camAnim = null;
  }
  controls.update();

  if (timeMode === "flow") {
    applyTimeOfDay(timeHours + dt * 1.4);
  }

  for (let i = 0; i < waterPos.count; i++) {
    const x = waterPos.getX(i);
    const z = waterPos.getZ(i);
    waterPos.setY(i, waterBaseY[i] + Math.sin(elapsed * 1.4 + x * 0.1 + z * 0.1) * 0.14);
  }
  waterPos.needsUpdate = true;
  waterGeo.computeVertexNormals();

  // 棉花糖白雲環繞
  skyClouds.forEach(c => {
    c.ang += dt * c.speed;
    c.mesh.position.x = Math.cos(c.ang) * c.rad;
    c.mesh.position.z = Math.sin(c.ang) * c.rad;
    c.mesh.position.y = c.baseY + Math.sin(elapsed + c.ang) * 0.4;
  });

  animatedProps.forEach(p => {
    if (p.type === "spin") {
      p.mesh.rotation.y += dt * p.speed;
      p.mesh.rotation.z += dt * p.speed * 0.5;
    } else if (p.type === "spinY") {
      p.mesh.rotation.y += dt * p.speed;
    } else if (p.type === "float") {
      p.mesh.position.y = p.baseY + Math.sin(elapsed * p.speed) * 0.22;
    } else if (p.type === "pulse") {
      const s = 1 + ((elapsed * p.speed) % 1) * 0.8;
      p.mesh.scale.set(s, s, s);
    }
  });

  if (showLinks) {
    linkObjects.forEach(obj => {
      obj.t = (obj.t + dt * 0.3) % 1;
      obj.curve.getPoint(obj.t, obj.dot.position);
      obj.dot.rotation.y += dt * 3;
    });
  }

  // 模擬城市馬路車輛動態更新（小汽車沿車道巡航）
  movingCars.forEach(car => {
    car.pos += dt * car.speed;
    const halfSpan = CITY_SPAN * 0.48;
    if (car.pos > halfSpan) car.pos = -halfSpan;
    if (car.pos < -halfSpan) car.pos = halfSpan;

    if (car.isNS) {
      car.group.position.set(car.laneCoord, 0.16, car.pos);
    } else {
      car.group.position.set(car.pos, 0.16, car.laneCoord);
    }
  });

  // 城市街區廣場維持平穩在地面（y = 0），並收集 2D 螢幕座標進行「防重疊自動避讓演算法」
  const visibleLabels = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isCompactScreen = vw <= 860;
  const estLabelW = isCompactScreen ? 165 : 205;
  const estLabelH = isCompactScreen ? 44 : 52;

  islandGroups.forEach((group, id) => {
    group.position.y = 0;
    projVec.set(group.position.x, group.position.y + 4.65, group.position.z).project(camera);
    const label = group.userData.labelEl;
    if (projVec.z > 1 || projVec.z < -1) {
      label.style.display = "none";
    } else {
      label.style.display = "flex";
      const rawX = (projVec.x * 0.5 + 0.5) * vw;
      const rawY = (-projVec.y * 0.5 + 0.5) * vh;
      const w = label.offsetWidth || estLabelW;
      const h = label.offsetHeight || estLabelH;
      visibleLabels.push({
        id,
        group,
        label,
        rawX,
        rawY,
        x: rawX,
        y: rawY,
        z: projVec.z,
        w,
        h,
      });
    }
  });

  // 2D 螢幕空間防重疊推開演算（迭代 4 次，當低視角旋轉導致兩座島名靠近時自動上下左右錯開）
  for (let iter = 0; iter < 4; iter++) {
    for (let i = 0; i < visibleLabels.length; i++) {
      const a = visibleLabels[i];
      for (let j = i + 1; j < visibleLabels.length; j++) {
        const b = visibleLabels[j];
        const minDx = (a.w + b.w) * 0.5 + 10;
        const minDy = (a.h + b.h) * 0.5 + 8;
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        if (absDx < minDx && absDy < minDy) {
          if (absDx < 0.1 && absDy < 0.1) {
            dx = (b.id - a.id) * 2.5;
            dy = (b.id % 2 === 0 ? 1 : -1) * 2.5;
          }
          const overlapX = minDx - Math.abs(dx);
          const overlapY = minDy - Math.abs(dy);
          // 選取中的關卡保持錨定優先權，其餘標籤平滑讓位
          const weightA = a.id === selectedId ? 0.15 : b.id === selectedId ? 0.85 : 0.5;
          const weightB = 1 - weightA;

          if (overlapY * 1.25 <= overlapX) {
            const signY = dy >= 0 ? 1 : -1;
            const pushY = overlapY * 0.65;
            a.y -= signY * pushY * weightA;
            b.y += signY * pushY * weightB;
            const signX = dx >= 0 ? 1 : -1;
            a.x -= signX * overlapX * 0.12 * weightA;
            b.x += signX * overlapX * 0.12 * weightB;
          } else {
            const signX = dx >= 0 ? 1 : -1;
            const signY = dy >= 0 ? 1 : -1;
            const pushX = overlapX * 0.55;
            const pushY = overlapY * 0.42;
            a.x -= signX * pushX * weightA;
            b.x += signX * pushX * weightB;
            a.y -= signY * pushY * weightA;
            b.y += signY * pushY * weightB;
          }
        }
      }
    }
  }

  // 依鏡頭遠近排序深度（越靠近鏡頭 zIndex 越高，選取中的關卡置頂），並平滑更新座標
  const sortedByDepth = [...visibleLabels].sort((a, b) => b.z - a.z);
  sortedByDepth.forEach((item, rank) => {
    item.zIndex = item.id === selectedId ? 24 : 8 + Math.min(14, Math.floor((rank / Math.max(1, sortedByDepth.length)) * 14));
  });

  const smoothLerp = Math.min(1, dt * 16);
  visibleLabels.forEach(item => {
    const padX = item.w * 0.5 + 8;
    const targetX = Math.max(padX, Math.min(vw - padX, item.x));
    const targetY = Math.max(item.h + 56, Math.min(vh - 28, item.y));
    const prevX = item.group.userData.smoothLabelX ?? targetX;
    const prevY = item.group.userData.smoothLabelY ?? targetY;
    const finalX = prevX + (targetX - prevX) * smoothLerp;
    const finalY = prevY + (targetY - prevY) * smoothLerp;
    item.group.userData.smoothLabelX = finalX;
    item.group.userData.smoothLabelY = finalY;
    item.finalX = finalX;
    item.finalY = finalY;
    item.label.style.zIndex = String(item.zIndex);
    item.label.style.transform = `translate(-50%, -100%) translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0)`;
  });

  // Bit 博士在城市街區廣場間巡迴與揮手
  if (mascotState.pauseTimer > 0) {
    mascotState.pauseTimer -= dt;
    const g = islandGroups.get(mascotState.fromId);
    if (g) {
      mascotGroup.position.set(g.position.x + 2.2, 0.48, g.position.z + 2.2);
      mascotGroup.userData.arm.rotation.z = -0.6 + Math.sin(elapsed * 9) * 0.5;
    }
    if (mascotState.pauseTimer <= 0) {
      const neighbors = COLLAB_LINKS.filter(l => l.a === mascotState.fromId || l.b === mascotState.fromId).map(l =>
        l.a === mascotState.fromId ? l.b : l.a
      );
      mascotState.toId =
        neighbors.length > 0 ? neighbors[Math.floor(Math.random() * neighbors.length)] : (mascotState.fromId % 15) + 1;
      mascotState.progress = 0;
    }
  } else {
    mascotState.progress += dt * 0.48;
    const gA = islandGroups.get(mascotState.fromId);
    const gB = islandGroups.get(mascotState.toId);
    if (gA && gB) {
      const t = Math.min(1, mascotState.progress);
      mascotGroup.position.lerpVectors(gA.position, gB.position, t);
      mascotGroup.position.y = 0.48 + Math.abs(Math.sin(elapsed * 11)) * 0.12;
      mascotGroup.lookAt(gB.position.x, mascotGroup.position.y, gB.position.z);
    }
    if (mascotState.progress >= 1) {
      mascotState.fromId = mascotState.toId;
      mascotState.pauseTimer = 3.2;
      if (Math.random() < 0.35 && mascotState.bubbleTimer <= 0) {
        triggerMascotSpeech();
      }
    }
  }

  if (mascotState.bubbleTimer > 0) {
    mascotState.bubbleTimer -= dt;
    projVec.copy(mascotGroup.position).add(new THREE.Vector3(0, 2.5, 0)).project(camera);
    const bx = (projVec.x * 0.5 + 0.5) * window.innerWidth;
    const by = (-projVec.y * 0.5 + 0.5) * window.innerHeight;
    mascotBubble.style.left = `${bx}px`;
    mascotBubble.style.top = `${by}px`;
    if (mascotState.bubbleTimer <= 0) mascotBubble.classList.add("hidden");
  }

  // 更新城區上其他學伴 3D 擬人化市民公仔（在建築正門人行道行走、揮手與頭頂角色名牌投影）
  if (showPeers) {
    peer3DEntities.forEach(ent => {
      ent.targetPos.y = 0.52;
      const prevX = ent.curPos.x;
      const prevZ = ent.curPos.z;
      ent.curPos.lerp(ent.targetPos, Math.min(1, dt * 3.2));
      const dist = Math.hypot(ent.targetPos.x - ent.curPos.x, ent.targetPos.z - ent.curPos.z);
      const isWalking = dist > 0.18;
      const isGreeting = ent.greetTimer > 0;

      if (ent.greetTimer > 0) {
        ent.greetTimer -= dt;
        if (ent.greetTimer <= 0) {
          ent.greetTimer = 0;
          renderPeerTagContent(ent);
        }
      }

      const hop = isWalking
        ? Math.abs(Math.sin(elapsed * 11 + ent.phase)) * 0.45
        : isGreeting
        ? Math.abs(Math.sin(elapsed * 14)) * 0.28
        : Math.sin(elapsed * 3 + ent.phase) * 0.05;

      ent.group.position.set(ent.curPos.x, 0.48 + hop, ent.curPos.z);

      // 角色面向：移動時朝向前進方向，靜止時朝向鏡頭並微幅左右擺頭
      if (isWalking) {
        const dx = ent.targetPos.x - prevX;
        const dz = ent.targetPos.z - prevZ;
        if (Math.hypot(dx, dz) > 0.001) {
          ent.group.rotation.y = Math.atan2(dx, dz);
        }
      } else {
        const toCamX = camera.position.x - ent.curPos.x;
        const toCamZ = camera.position.z - ent.curPos.z;
        const baseYaw = Math.atan2(toCamX, toCamZ);
        ent.group.rotation.y = baseYaw + Math.sin(elapsed * 1.8 + ent.phase) * 0.18;
      }

      // 擬人化四肢與頭部微動畫
      const rig = ent.group.userData.rig;
      if (rig) {
        if (isWalking) {
          const swing = Math.sin(elapsed * 13 + ent.phase) * 0.65;
          rig.legL.rotation.x = swing;
          rig.legR.rotation.x = -swing;
          rig.armL.rotation.x = -swing * 0.7;
          rig.armR.rotation.x = swing * 0.7;
          rig.armR.rotation.z = -0.35;
          rig.headGroup.rotation.z = Math.sin(elapsed * 10 + ent.phase) * 0.08;
        } else {
          rig.legL.rotation.x = 0;
          rig.legR.rotation.x = 0;
          rig.armL.rotation.x = Math.sin(elapsed * 2.5 + ent.phase) * 0.12;
          rig.armR.rotation.x = 0;
          // 停留時右手熱情揮手（打招呼時揮更快！）
          const waveSpeed = isGreeting ? 15 : 5.5;
          const waveAmp = isGreeting ? 0.55 : 0.28;
          rig.armR.rotation.z = -2.35 + Math.sin(elapsed * waveSpeed + ent.phase) * waveAmp;
          rig.headGroup.rotation.z = Math.sin(elapsed * 2.2 + ent.phase) * 0.09;
          rig.headGroup.rotation.x = Math.sin(elapsed * 3.1 + ent.phase) * 0.06;
        }
      }

      projVec.set(ent.group.position.x, ent.group.position.y + 1.85, ent.group.position.z).project(camera);
      if (projVec.z > 1 || projVec.z < -1) {
        ent.tagEl.style.display = "none";
      } else {
        ent.tagEl.style.display = "flex";
        let px = (projVec.x * 0.5 + 0.5) * vw;
        let py = (-projVec.y * 0.5 + 0.5) * vh;
        // 避免學伴頭頂名牌與島嶼關卡名稱重疊：若靠近島嶼標籤則自動往下微移
        for (let k = 0; k < visibleLabels.length; k++) {
          const lbl = visibleLabels[k];
          if (Math.abs(px - lbl.finalX) < lbl.w * 0.52 + 40 && Math.abs(py - lbl.finalY) < lbl.h * 0.65 + 16) {
            py = lbl.finalY + 30;
          }
        }
        ent.tagEl.style.transform = `translate(-50%, -100%) translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
      }
    });
  }

  renderer.render(scene, camera);
}

window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
    if (!gameState.hasSetCustomName) {
      setTimeout(() => openNameProfileModal(true), 250);
    } else {
      broadcastActivity("回到了數位科技動態島！🎉", "全景探索中", 1);
      setTimeout(
        () => triggerMascotSpeech(`歡迎回來，「${gameState.myName}」！點選關卡奪取 ⭐⭐⭐ 滿星皇冠與金幣吧！`),
        550
      );
    }
  }, 350);
});

animate();
