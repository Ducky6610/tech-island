import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ==========================================
// 1. 四大王國、15 座關卡島座標與 20 條彩虹協作橋
// ==========================================
const UNITS = [
  { id: 1, code: "王國 01", name: "數位概念森林", color: "#34d399", hex: 0x6ee7b7, rim: 0x10b981, chapters: [1, 2] },
  { id: 2, code: "王國 02", name: "系統平台機械城", color: "#60a5fa", hex: 0x93c5fd, rim: 0x3b82f6, chapters: [3, 4, 5] },
  { id: 3, code: "王國 03", name: "軟體魔法樂園", color: "#f59e0b", hex: 0xfde047, rim: 0xd97706, chapters: [6, 7, 8, 9, 10] },
  { id: 4, code: "王國 04", name: "通訊網路星系", color: "#ec4899", hex: 0xf9a8d4, rim: 0xdb2777, chapters: [11, 12, 13, 14, 15] }
];

const ISLAND_LAYOUT = [
  { id: 1, unit: 1, q: 0, r: 0, skyY: 4.2 },
  { id: 2, unit: 1, q: 1, r: -1, skyY: 5.4 },
  { id: 3, unit: 2, q: -1, r: 0, skyY: 3.1 },
  { id: 4, unit: 2, q: 0, r: -1, skyY: 6.2 },
  { id: 5, unit: 2, q: -1, r: -1, skyY: 4.8 },
  { id: 6, unit: 3, q: -2, r: 1, skyY: 3.6 },
  { id: 7, unit: 3, q: -1, r: 1, skyY: 5.1 },
  { id: 8, unit: 3, q: -2, r: 0, skyY: 6.0 },
  { id: 9, unit: 3, q: -1, r: 2, skyY: 2.6 },
  { id: 10, unit: 3, q: 0, r: 1, skyY: 3.8 },
  { id: 11, unit: 4, q: 1, r: 0, skyY: 5.6 },
  { id: 12, unit: 4, q: 2, r: -1, skyY: 6.6 },
  { id: 13, unit: 4, q: 1, r: 1, skyY: 4.4 },
  { id: 14, unit: 4, q: 2, r: 0, skyY: 3.3 },
  { id: 15, unit: 4, q: 0, r: 2, skyY: 5.0 }
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
  { id: "first_island", icon: "🧭", name: "初登寶島", desc: "探索任意第 1 座知識島嶼", check: s => Object.keys(s.visited).length >= 1 },
  { id: "first_star", icon: "⭐", name: "首顆星光", desc: "在任一關卡獲得至少 1 顆星", check: s => totalStars(s) >= 1 },
  { id: "three_star", icon: "👑", name: "三星滿貫王", desc: "在任一關卡測驗全對奪得 3 顆星", check: s => Object.values(s.stars).some(v => v >= 3) },
  { id: "streak_5", icon: "🔥", name: "五連勝學霸", desc: "答題連續答對達 5 題以上", check: s => s.bestStreak >= 5 },
  { id: "unit1_clear", icon: "🌲", name: "概念森林守護者", desc: "完成王國 01（Ch1~2）所有關卡奪星", check: s => [1, 2].every(i => (s.stars[i] || 0) >= 1) },
  { id: "unit2_clear", icon: "⚙️", name: "系統機械大師", desc: "完成王國 02（Ch3~5）所有關卡奪星", check: s => [3, 4, 5].every(i => (s.stars[i] || 0) >= 1) },
  { id: "unit3_clear", icon: "🪄", name: "軟體魔法達人", desc: "完成王國 03（Ch6~10）所有關卡奪星", check: s => [6, 7, 8, 9, 10].every(i => (s.stars[i] || 0) >= 1) },
  { id: "unit4_clear", icon: "🛸", name: "網路星系艦長", desc: "完成王國 04（Ch11~15）所有關卡奪星", check: s => [11, 12, 13, 14, 15].every(i => (s.stars[i] || 0) >= 1) },
  { id: "card_collector", icon: "🃏", name: "圖鑑收集狂", desc: "在小辭典累積點亮 15 張以上魔法名詞卡", check: s => Object.keys(s.masteredTerms).length >= 15 },
  { id: "grand_master", icon: "🏆", name: "數位科技傳奇勇者", desc: "全島累積達 30 顆星以上", check: s => totalStars(s) >= 30 }
];

const MASCOT_QUIPS = [
  "嗨！我是 Bit 博士 🤓 每座島都有 3 顆星⭐⭐⭐等你拿，全對還會在島上升起黃金皇冠喔！",
  "點開「📖 知識寶箱」讀完重點按『領取 +15 XP』，經驗值升級超快！",
  "統測必考秘訣：GIGO 是「垃圾進、垃圾出」，輸入正確資料才有正確資訊！",
  "想刺激一下嗎？點右上角粉紅色的「⚔️ 魔王戰」，打敗數位魔王贏取大把金幣 💰！",
  "試試底部的「🌅 蜜桃晨光 / ☀️ 蘇打白天 / 🌇 橘子黃昏 / 🌙 螢光星夜」，小島顏色超夢幻！",
  "知道嗎？SJF（最短工作優先）排程平均等待時間最短；優先排程則要小心「飢餓現象」喔！"
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
let timeHours = 12;
let timeMode = "manual";
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

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.5, 520);
function getOverviewCamPos() {
  const w = window.innerWidth;
  if (w <= 767) return new THREE.Vector3(0, 74, 118);
  if (w <= 1180) return new THREE.Vector3(0, 64, 104);
  return new THREE.Vector3(0, 56, 92);
}
const DEFAULT_TARGET = new THREE.Vector3(0, 3.5, 3);
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
// 將底層海洋下移至高空雲海下方，烘托 15 座漂浮空島懸浮於天際的立體感
waterMesh.position.y = -11.5;
waterMesh.receiveShadow = true;
scene.add(waterMesh);

// 圓潤蓬鬆棉花糖白雲（分佈於空島下方雲海與高空天際，營造穿梭雲端的天空之城氛圍）
const skyClouds = [];
const cloudWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.42, flatShading: false });
const cloudSoftPinkMat = new THREE.MeshStandardMaterial({ color: 0xfff0f6, roughness: 0.45, flatShading: false });
for (let i = 0; i < 24; i++) {
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

  const isLowCloud = i < 14; // 前 14 朵漂浮在空島下方與島際之間，形成立體雲海
  const ang = (i / (isLowCloud ? 14 : 10)) * Math.PI * 2 + (isLowCloud ? 0 : 0.4);
  const rad = isLowCloud ? 14 + (i % 5) * 9.5 : 50 + (i % 3) * 12;
  const baseY = isLowCloud ? -4.2 + (i % 4) * 1.65 : 13 + (i % 4) * 3.2;
  const s = isLowCloud ? 0.78 + (i % 3) * 0.18 : 1.05;
  cg.scale.set(s, s, s);
  cg.position.set(Math.cos(ang) * rad, baseY, Math.sin(ang) * rad);
  scene.add(cg);
  skyClouds.push({ mesh: cg, ang, rad, speed: (isLowCloud ? 0.018 : 0.025) + (i % 3) * 0.006, baseY });
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
// 5. 建立 15 座寬敞錯落的漂浮浮空島與無稜角糖果玩具地標
// ==========================================
const HEX_RADIUS = 5.4;
const HEX_GAP = 1.92; // 大幅拉開島與島之間的空中距離，避免島體與路牌互相擁擠重疊
const islandGroups = new Map();
const pickableMeshes = [];
const nightBeaconMaterials = [];
const animatedProps = [];

function axialToWorld(q, r) {
  const size = HEX_RADIUS * HEX_GAP;
  const x = size * Math.sqrt(3) * (q + r / 2);
  const z = size * (3 / 2) * r;
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

function buildChapterLandmark(chId, unitHex) {
  const g = new THREE.Group();
  const glow = makeGlowMat(unitHex);
  const whiteMat = makeMat(0xffffff);
  const darkMat = makeMat(0x475569);
  const goldMat = makeGlowMat(0xfde047);
  const pinkMat = makeMat(0xff8fa3);

  switch (chId) {
    case 1: {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.42, 0.85, 32), pinkMat);
      base.position.y = 0.42;
      const baseRim = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.16, 16, 36), pinkMat);
      baseRim.rotation.x = Math.PI / 2;
      baseRim.position.y = 0.82;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(1.38, 28, 28), goldMat);
      bulb.position.y = 2.15;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.12, 0.14, 20, 48), glow);
      ring.position.y = 2.15;
      ring.rotation.x = Math.PI / 3;
      g.add(base, baseRim, bulb, ring);
      animatedProps.push({ mesh: ring, type: "spin", speed: 1.3 });
      break;
    }
    case 2: {
      for (let i = -2; i <= 2; i++) {
        const h = 0.7 + Math.abs(Math.cos(i)) * 1.35;
        const bar = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, h, 16, 24), i % 2 === 0 ? glow : pinkMat);
        bar.position.set(i * 0.68, h / 2 + 0.26, -0.6);
        g.add(bar);
      }
      const zero = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.22, 20, 36), goldMat);
      zero.position.set(-0.75, 1.5, 0.9);
      const one = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 1.05, 16, 24), goldMat);
      one.position.set(0.75, 1.5, 0.9);
      g.add(zero, one);
      break;
    }
    case 3: {
      const pcb = new THREE.Mesh(new THREE.CylinderGeometry(1.78, 1.88, 0.42, 36), makeMat(0x34d399));
      pcb.position.y = 0.21;
      const die = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.25, 0.52, 32), whiteMat);
      die.position.y = 0.58;
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.68, 24, 24), glow);
      core.scale.set(1, 0.48, 1);
      core.position.y = 0.88;
      g.add(pcb, die, core);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const pin = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), goldMat);
        pin.position.set(Math.cos(a) * 1.85, 0.25, Math.sin(a) * 1.85);
        g.add(pin);
      }
      break;
    }
    case 4: {
      const layerColors = [0x60a5fa, 0xc084fc, 0xff8fa3];
      for (let i = 0; i < 3; i++) {
        const r = 1.45 - i * 0.24;
        const layer = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.08, 0.48, 32), makeMat(layerColors[i]));
        layer.position.y = 0.3 + i * 0.54;
        const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.12, 16, 36), makeMat(layerColors[i]));
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.5 + i * 0.54;
        g.add(layer, rim);
      }
      const cloud = new THREE.Group();
      const c1 = new THREE.Mesh(new THREE.SphereGeometry(0.88, 24, 24), whiteMat);
      const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.68, 24, 24), whiteMat);
      c2.position.set(0.75, -0.1, 0.1);
      const c3 = new THREE.Mesh(new THREE.SphereGeometry(0.65, 24, 24), whiteMat);
      c3.position.set(-0.7, -0.14, -0.1);
      cloud.add(c1, c2, c3);
      cloud.position.y = 2.78;
      g.add(cloud);
      animatedProps.push({ mesh: cloud, type: "float", baseY: 2.78, speed: 2.2 });
      break;
    }
    case 5: {
      const gearGroup = new THREE.Group();
      const gear = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.42, 32), glow);
      gearGroup.add(gear);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const tooth = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), glow);
        tooth.position.set(Math.cos(a) * 1.48, 0, Math.sin(a) * 1.48);
        gearGroup.add(tooth);
      }
      gearGroup.position.y = 0.68;
      const aiCore = new THREE.Mesh(new THREE.SphereGeometry(0.92, 28, 28), goldMat);
      aiCore.position.y = 2.15;
      const aiRing = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.11, 16, 40), pinkMat);
      aiRing.position.y = 2.15;
      aiRing.rotation.x = Math.PI / 4;
      g.add(gearGroup, aiCore, aiRing);
      animatedProps.push({ mesh: gearGroup, type: "spinY", speed: 0.9 });
      animatedProps.push({ mesh: aiRing, type: "spin", speed: 1.5 });
      break;
    }
    case 6: {
      const doc = new THREE.Mesh(new THREE.CapsuleGeometry(0.78, 0.9, 16, 28), whiteMat);
      doc.scale.set(1.0, 1.0, 0.35);
      doc.position.set(-0.5, 1.25, -0.2);
      doc.rotation.y = 0.25;
      const chart = new THREE.Mesh(new THREE.ConeGeometry(0.82, 1.55, 32), pinkMat);
      chart.position.set(0.9, 0.85, 0.5);
      const chartBase = new THREE.Mesh(new THREE.SphereGeometry(0.8, 24, 16), pinkMat);
      chartBase.scale.set(1, 0.28, 1);
      chartBase.position.set(0.9, 0.15, 0.5);
      g.add(doc, chart, chartBase);
      break;
    }
    case 7: {
      const globe = new THREE.Mesh(new THREE.SphereGeometry(1.28, 32, 32), glow);
      globe.position.y = 1.72;
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.09, 16, 40), goldMat);
      orbit.position.y = 1.72;
      orbit.rotation.x = Math.PI / 2.6;
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.95, 0.65, 32), pinkMat);
      stand.position.y = 0.32;
      g.add(stand, globe, orbit);
      animatedProps.push({ mesh: orbit, type: "spin", speed: 1.1 });
      break;
    }
    case 8: {
      const monitor = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.38, 36), makeMat(0xa78bfa));
      monitor.rotation.x = Math.PI / 2;
      monitor.scale.set(1.28, 1, 0.95);
      monitor.position.y = 1.5;
      const screen = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.42, 36), glow);
      screen.rotation.x = Math.PI / 2;
      screen.scale.set(1.28, 1, 0.95);
      screen.position.set(0, 1.5, 0.02);
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.68, 0.65, 28), whiteMat);
      neck.position.y = 0.32;
      g.add(monitor, screen, neck);
      break;
    }
    case 9: {
      const phone = new THREE.Mesh(new THREE.CapsuleGeometry(0.72, 1.15, 20, 28), pinkMat);
      phone.scale.set(1, 1, 0.32);
      phone.position.y = 1.45;
      phone.rotation.x = -0.15;
      const disp = new THREE.Mesh(new THREE.CapsuleGeometry(0.58, 0.95, 20, 28), glow);
      disp.scale.set(1, 1, 0.32);
      disp.position.set(0, 1.45, 0.08);
      disp.rotation.x = -0.15;
      g.add(phone, disp);
      break;
    }
    case 10: {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.62, 2.25, 32), whiteMat);
      pillar.position.y = 1.12;
      const beam = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 2.1, 16, 24), goldMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.y = 2.25;
      const shield = new THREE.Mesh(new THREE.SphereGeometry(0.85, 28, 28), glow);
      shield.scale.set(1.05, 1.18, 0.38);
      shield.position.set(0, 1.2, 0.55);
      g.add(pillar, beam, shield);
      break;
    }
    case 11: {
      const tower = new THREE.Mesh(new THREE.ConeGeometry(0.92, 2.75, 32), whiteMat);
      tower.position.y = 1.38;
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), goldMat);
      beacon.position.y = 2.92;
      const wave = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.1, 20, 40), glow);
      wave.rotation.x = Math.PI / 2;
      wave.position.y = 2.6;
      g.add(tower, beacon, wave);
      animatedProps.push({ mesh: wave, type: "pulse", speed: 2.2 });
      break;
    }
    case 12: {
      const router = new THREE.Mesh(new THREE.CylinderGeometry(1.32, 1.42, 0.52, 36), whiteMat);
      router.position.y = 0.32;
      for (let x of [-0.72, 0.72]) {
        for (let z of [-0.45, 0.45]) {
          const ant = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 1.15, 12, 20), glow);
          ant.position.set(x, 1.08, z);
          g.add(ant);
        }
      }
      const rack = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.78, 2.05, 32), darkMat);
      rack.position.set(0, 1.02, -0.92);
      g.add(router, rack);
      break;
    }
    case 13: {
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.72, 28, 28), goldMat);
      hub.scale.set(1, 0.68, 1);
      hub.position.y = 0.5;
      g.add(hub);
      for (let i = 0; i < 5; i++) {
        const ang = (i / 5) * Math.PI * 2;
        const nx = Math.cos(ang) * 1.75;
        const nz = Math.sin(ang) * 1.75;
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), glow);
        node.position.set(nx, 0.45, nz);
        const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.65, 16), whiteMat);
        tube.rotation.z = Math.PI / 2;
        tube.rotation.y = -ang;
        tube.position.set(nx * 0.5, 0.32, nz * 0.5);
        g.add(node, tube);
      }
      break;
    }
    case 14: {
      const rainbow = [0xff8fa3, 0xfdba74, 0xfde047, 0x6ee7b7, 0x7dd3fc, 0xa5b4fc, 0xd8b4fe];
      for (let i = 0; i < 7; i++) {
        const r = 1.48 - i * 0.13;
        const layer = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.05, 0.34, 36), makeMat(rainbow[i]));
        layer.position.y = 0.22 + i * 0.35;
        const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.09, 14, 32), makeMat(rainbow[i]));
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.22 + i * 0.35;
        g.add(layer, rim);
      }
      break;
    }
    case 15: {
      const pinHead = new THREE.Mesh(new THREE.SphereGeometry(0.95, 28, 28), goldMat);
      pinHead.position.y = 2.4;
      const pinHalo = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.1, 16, 36), pinkMat);
      pinHalo.position.y = 2.4;
      pinHalo.rotation.x = Math.PI / 3;
      const pinTip = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.35, 32), glow);
      pinTip.rotation.x = Math.PI;
      pinTip.position.y = 1.1;
      g.add(pinHead, pinHalo, pinTip);
      animatedProps.push({ mesh: pinHalo, type: "spin", speed: 1.3 });
      break;
    }
  }

  // 圓潤球狀棒棒糖樹點綴（無稜角平滑球體）
  const treeCoords = [
    [-2.55, 1.75],
    [2.45, -1.65],
    [-2.05, -2.15]
  ];
  const candyFoliageColors = [0x6ee7b7, 0x5eead4, 0xf9a8d4, 0xfde047];
  treeCoords.forEach(([tx, tz], idx) => {
    if ((chId + idx) % 2 === 0) {
      const trunk = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.45, 12, 20), makeMat(0xd4a373));
      trunk.position.set(tx, 0.32, tz);
      const foliage = new THREE.Mesh(
        new THREE.SphereGeometry(0.72, 24, 24),
        makeMat(candyFoliageColors[(chId + idx) % candyFoliageColors.length])
      );
      foliage.position.set(tx, 1.06, tz);
      g.add(trunk, foliage);
    }
  });

  // 關卡滿 3 星時的圓潤黃金珍珠皇冠（無尖銳稜角）
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
  crown.position.set(0, 3.85, 0);
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

// 建立 15 座漂浮在空中的 Q版天空浮空島（階層式倒錐浮空岩座 + 反重力發光水晶 + 環繞小浮石與雲朵托座）
ISLAND_LAYOUT.forEach((item, index) => {
  const unit = getUnit(item.unit);
  const pos = axialToWorld(item.q, item.r);
  const baseY = item.skyY ?? 4.0;
  pos.y = baseY;

  const group = new THREE.Group();
  group.position.copy(pos);
  group.userData = { chId: item.id, unitId: item.unit, baseY, phase: index * 0.62 };

  const rockWarmMat = makeMat(0xd4a373, { roughness: 0.62 });
  const rockDeepMat = makeMat(0xb07d52, { roughness: 0.68 });
  const rockTipMat = makeMat(0x8c5e3c, { roughness: 0.72 });

  // 1. 浮空島第一階：上層圓潤琥珀岩座
  const rockUpper = new THREE.Mesh(
    new THREE.CylinderGeometry(HEX_RADIUS * 0.88, HEX_RADIUS * 0.65, 1.45, 40),
    rockWarmMat
  );
  rockUpper.position.y = -0.72;
  rockUpper.receiveShadow = true;
  rockUpper.castShadow = true;
  group.add(rockUpper);

  const rockUpperRim = new THREE.Mesh(
    new THREE.TorusGeometry(HEX_RADIUS * 0.66, 0.24, 16, 40),
    rockWarmMat
  );
  rockUpperRim.rotation.x = Math.PI / 2;
  rockUpperRim.position.y = -1.42;
  group.add(rockUpperRim);

  // 2. 浮空島第二階：中層漸縮倒錐形浮空島岩腹
  const rockMid = new THREE.Mesh(
    new THREE.CylinderGeometry(HEX_RADIUS * 0.64, HEX_RADIUS * 0.34, 1.85, 36),
    rockDeepMat
  );
  rockMid.position.y = -2.35;
  rockMid.receiveShadow = true;
  rockMid.castShadow = true;
  group.add(rockMid);

  // 島腹周圍不對稱圓潤浮空岩塊（增添自然空島的立體層次感）
  for (let k = 0; k < 4; k++) {
    const lobeAng = (k / 4) * Math.PI * 2 + index * 0.5;
    const lobeR = HEX_RADIUS * 0.48;
    const lobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.95 + (k % 2) * 0.28, 20, 20),
      k % 2 === 0 ? rockWarmMat : rockDeepMat
    );
    lobe.scale.set(1.1, 1.45, 0.95);
    lobe.position.set(
      Math.cos(lobeAng) * lobeR,
      -1.85 - (k % 2) * 0.45,
      Math.sin(lobeAng) * lobeR
    );
    group.add(lobe);
  }

  // 3. 浮空島第三階：底部收束垂墜岩尖（無尖銳稜角，以圓球收尾）
  const rockLower = new THREE.Mesh(
    new THREE.CylinderGeometry(HEX_RADIUS * 0.34, 0.42, 1.55, 32),
    rockTipMat
  );
  rockLower.position.y = -3.95;
  rockLower.castShadow = true;
  group.add(rockLower);

  const rockTipCap = new THREE.Mesh(new THREE.SphereGeometry(0.46, 20, 20), rockTipMat);
  rockTipCap.position.y = -4.72;
  group.add(rockTipCap);

  // 4. 島底反重力魔法浮空能量水晶 + 懸浮光環
  const crystalMat = makeGlowMat(unit.hex);
  const floatCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.58, 1), crystalMat);
  floatCrystal.scale.set(0.85, 1.45, 0.85);
  floatCrystal.position.y = -5.55;
  group.add(floatCrystal);
  animatedProps.push({ mesh: floatCrystal, type: "spinY", speed: 1.8 });

  const magicHalo = new THREE.Mesh(
    new THREE.TorusGeometry(1.15, 0.07, 14, 36),
    makeGlowMat(0xfef08a)
  );
  magicHalo.rotation.x = Math.PI / 2;
  magicHalo.position.y = -5.15;
  group.add(magicHalo);

  // 5. 環繞浮空島下半部的迷你漂浮小碎石 & 軟綿托島小雲朵
  const orbitPebbleGroup = new THREE.Group();
  for (let p = 0; p < 3; p++) {
    const pAng = (p / 3) * Math.PI * 2 + index;
    const distR = HEX_RADIUS * 0.78 + (p % 2) * 0.55;
    const pebble = new THREE.Mesh(
      new THREE.SphereGeometry(0.34 + (p % 2) * 0.12, 16, 16),
      p === 0 ? crystalMat : rockWarmMat
    );
    pebble.scale.set(1.2, 0.78, 1.0);
    pebble.position.set(Math.cos(pAng) * distR, -2.1 - p * 0.75, Math.sin(pAng) * distR);
    orbitPebbleGroup.add(pebble);
  }
  group.add(orbitPebbleGroup);
  animatedProps.push({ mesh: orbitPebbleGroup, type: "spinY", speed: 0.35 + (index % 3) * 0.1 });

  // 島嶼底部的蓬鬆雲朵環抱點綴
  for (let c = 0; c < 2; c++) {
    const cAng = c * Math.PI + index * 0.9;
    const puffGroup = new THREE.Group();
    const puff1 = new THREE.Mesh(new THREE.SphereGeometry(0.92, 18, 18), cloudWhiteMat);
    puff1.scale.set(1.25, 0.75, 1.0);
    const puff2 = new THREE.Mesh(new THREE.SphereGeometry(0.68, 16, 16), cloudWhiteMat);
    puff2.position.set(0.75, -0.1, 0.2);
    puffGroup.add(puff1, puff2);
    puffGroup.position.set(
      Math.cos(cAng) * (HEX_RADIUS * 0.68),
      -2.65 - c * 0.5,
      Math.sin(cAng) * (HEX_RADIUS * 0.68)
    );
    group.add(puffGroup);
  }

  // 部分浮空島邊緣傾瀉而下的夢幻天空小瀑布
  if (item.id % 3 === 1) {
    const wfMat = makeGlowMat(0x7dd3fc);
    const wfStream = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 2.8, 12, 20), wfMat);
    wfStream.position.set(HEX_RADIUS * 0.82, -1.25, 0.8);
    wfStream.rotation.z = -0.12;
    const wfMist1 = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), cloudWhiteMat);
    wfMist1.position.set(HEX_RADIUS * 0.9, -2.85, 0.8);
    const wfMist2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 14), wfMat);
    wfMist2.position.set(HEX_RADIUS * 0.85, 0.25, 0.8);
    group.add(wfStream, wfMist1, wfMist2);
  }

  // 6. 中層香草奶油圓弧軟墊沙灘
  const sandGeo = new THREE.CylinderGeometry(HEX_RADIUS * 0.94, HEX_RADIUS * 0.90, 0.48, 40);
  const sandMat = makeMat(0xfff3b0, { roughness: 0.5 });
  const sand = new THREE.Mesh(sandGeo, sandMat);
  sand.position.y = 0.24;
  sand.receiveShadow = true;
  group.add(sand);

  const sandCushion = new THREE.Mesh(new THREE.TorusGeometry(HEX_RADIUS * 0.90, 0.24, 20, 48), sandMat);
  sandCushion.rotation.x = Math.PI / 2;
  sandCushion.position.y = 0.24;
  group.add(sandCushion);

  // 7. 上層馬卡龍糖霜圓潤草地（搭配甜甜圈圓弧邊緣，完全無稜角）
  const topGeo = new THREE.CylinderGeometry(HEX_RADIUS * 0.85, HEX_RADIUS * 0.89, 0.52, 40);
  const topMat = makeMat(unit.hex, { roughness: 0.38 });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = 0.74;
  top.castShadow = true;
  top.receiveShadow = true;
  group.add(top);

  const topCushion = new THREE.Mesh(new THREE.TorusGeometry(HEX_RADIUS * 0.84, 0.26, 22, 48), topMat);
  topCushion.rotation.x = Math.PI / 2;
  topCushion.position.y = 0.76;
  topCushion.castShadow = true;
  topCushion.receiveShadow = true;
  group.add(topCushion);

  // 圓滑發光外框環（48 段正圓）
  const rimGeo = new THREE.RingGeometry(HEX_RADIUS * 0.77, HEX_RADIUS * 0.84, 48);
  rimGeo.rotateX(-Math.PI / 2);
  const rimMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.position.y = 1.03;
  group.add(rim);
  group.userData.rimMat = rimMat;

  // 地標與皇冠
  const landmark = buildChapterLandmark(item.id, unit.hex);
  landmark.position.y = 1.02;
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

  // 建立 Q 版關卡路牌標籤（單行精巧膠囊＋3 顆星進度，不遮擋鄰島）
  const chData = chapters[item.id] || { title: `第 ${item.id} 章`, icon: "📘" };
  const label = document.createElement("div");
  label.className = "island-label";
  label.style.setProperty("--unit-color", unit.color);
  label.dataset.id = item.id;
  label.innerHTML = `
    <div class="island-label-top">
      <span class="ch-badge">${String(item.id).padStart(2, "0")}</span>
      <span class="ch-title-text">${chData.icon} ${chData.title}</span>
      <span class="island-stars" id="istars-${item.id}">☆☆☆</span>
    </div>
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
// 6. 建立 20 條圓滑彩虹光束軟管橋與珍珠光球（連接高低錯落的浮空島）
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
  pA.y = (gA.userData.baseY ?? 4.0) + 1.55;
  const pB = gB.position.clone();
  pB.y = (gB.userData.baseY ?? 4.0) + 1.55;
  const mid = pA.clone().add(pB).multiplyScalar(0.5);
  const dist = pA.distanceTo(pB);
  mid.y = Math.max(pA.y, pB.y) + Math.min(7.5, 2.2 + dist * 0.2);

  const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
  const geo = new THREE.TubeGeometry(curve, 52, 0.075, 14, false);
  const baseColor = rainbowPalette[idx % rainbowPalette.length];
  const mat = new THREE.MeshStandardMaterial({
    color: baseColor,
    emissive: baseColor,
    emissiveIntensity: 0.28,
    roughness: 0.35,
    transparent: true,
    opacity: 0.42
  });
  const line = new THREE.Mesh(geo, mat);
  linksGroup.add(line);

  const dotGeo = new THREE.SphereGeometry(0.26, 20, 20);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const dot = new THREE.Mesh(dotGeo, dotMat);
  linksGroup.add(dot);

  linkObjects.push({ ...link, baseColor, curve, line, mat, dot, t: Math.random() });
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

// ==========================================
// 8. 24 小時夢幻糖果光影切換系統
// ==========================================
const clockIcon = document.getElementById("clock-icon");
const clockTime = document.getElementById("clock-time");
const clockLabel = document.getElementById("clock-label");
const timeSlider = document.getElementById("time-slider");

function applyTimeOfDay(hours) {
  timeHours = ((hours % 24) + 24) % 24;
  timeSlider.value = timeHours;

  const hh = String(Math.floor(timeHours)).padStart(2, "0");
  const mm = String(Math.floor((timeHours % 1) * 60)).padStart(2, "0");
  clockTime.textContent = `${hh}:${mm}`;

  const sunAngle = ((timeHours - 6) / 24) * Math.PI * 2;
  const sunY = Math.sin(sunAngle);
  const sunX = Math.cos(sunAngle);
  dirLight.position.set(sunX * 55, Math.max(10, Math.abs(sunY) * 60 + 10), 28);

  let skyHex, waterHex, sunHex, hemiSky, dirInt, starOpacity, periodName, icon;

  if (timeHours >= 5 && timeHours < 8) {
    // 蜜桃晨光
    skyHex = 0xffd6e0;
    waterHex = 0x90e0ef;
    sunHex = 0xfff0f3;
    hemiSky = 0xffe5ec;
    dirInt = 1.25;
    starOpacity = 0.05;
    periodName = "蜜桃晨光";
    icon = "🌅";
  } else if (timeHours >= 8 && timeHours < 16.5) {
    // 櫻花蘇打白天（柔和粉彩天空 + 粉藍蘇打海）
    skyHex = 0xfce7f3;
    waterHex = 0x7dd3fc;
    sunHex = 0xfffdf7;
    hemiSky = 0xffffff;
    dirInt = 1.38;
    starOpacity = 0;
    periodName = "櫻花白天";
    icon = "🌸";
  } else if (timeHours >= 16.5 && timeHours < 19.2) {
    // 晚霞粉橘黃昏
    skyHex = 0xfbcfe8;
    waterHex = 0xa5b4fc;
    sunHex = 0xfed7aa;
    hemiSky = 0xfce7f3;
    dirInt = 1.15;
    starOpacity = 0.25;
    periodName = "粉霞黃昏";
    icon = "🌇";
  } else {
    // 薰衣草星夜
    skyHex = 0x3b2d54;
    waterHex = 0x312e81;
    sunHex = 0xf472b6;
    hemiSky = 0x4c1d95;
    dirInt = 0.72;
    starOpacity = 0.9;
    periodName = "紫晶星夜";
    icon = "🌙";
  }

  clockIcon.textContent = icon;
  clockLabel.textContent = periodName;

  renderer.setClearColor(skyHex);
  scene.fog.color.setHex(skyHex);
  waterMat.color.setHex(waterHex);
  dirLight.color.setHex(sunHex);
  dirLight.intensity = dirInt;
  hemiLight.color.setHex(hemiSky);
  starMat.opacity = starOpacity;

  const isNight = starOpacity > 0.5;
  nightBeaconMaterials.forEach(m => {
    m.emissiveIntensity = isNight ? 1.1 : 0.38;
  });
}

applyTimeOfDay(12);

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
          <span>${ch.icon}</span>
          <span>第 ${ch.id} 關｜${ch.title}</span>
        </div>
        <div class="stage-stars-box" id="panel-stars-box" title="本關最高星數">${starString(curStars)}</div>
      </div>
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
              const sc = gameState.stars[cid] || 0;
              return `
              <div class="list-card" data-cid="${cid}">
                <div class="list-card-top">
                  <span>關卡 ${String(cid).padStart(2, "0")}</span>
                  <span>${starString(sc)}</span>
                </div>
                <h4>${c.icon} ${c.title}</h4>
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

// 手機端時間控制器點擊展開／收合
const timebarEl = document.getElementById("timebar");
const timebarToggle = document.getElementById("timebar-toggle");
if (timebarToggle && timebarEl) {
  timebarToggle.addEventListener("click", () => {
    playSfx("pop");
    timebarEl.classList.toggle("collapsed");
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

const modeRealBtn = document.getElementById("mode-real");
const modeFlowBtn = document.getElementById("mode-flow");

document.querySelectorAll("#timebar .presets button").forEach(btn => {
  btn.addEventListener("click", () => {
    playSfx("pop");
    timeMode = "manual";
    modeRealBtn.classList.remove("on");
    modeFlowBtn.classList.remove("on");
    applyTimeOfDay(Number(btn.dataset.t));
  });
});

timeSlider.addEventListener("input", () => {
  timeMode = "manual";
  modeRealBtn.classList.remove("on");
  modeFlowBtn.classList.remove("on");
  applyTimeOfDay(Number(timeSlider.value));
});

modeRealBtn.addEventListener("click", () => {
  playSfx("pop");
  timeMode = "real";
  modeRealBtn.classList.add("on");
  modeFlowBtn.classList.remove("on");
  const now = new Date();
  applyTimeOfDay(now.getHours() + now.getMinutes() / 60);
});

modeFlowBtn.addEventListener("click", () => {
  playSfx("pop");
  timeMode = timeMode === "flow" ? "manual" : "flow";
  modeFlowBtn.classList.toggle("on", timeMode === "flow");
  modeRealBtn.classList.remove("on");
});

// Raycaster 拾取
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downPos = { x: 0, y: 0 };

// 手機端觸控探索 3D 小島時，自動淡化按鈕並自動收合浮動視窗
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
    if (timebarEl) timebarEl.classList.add("collapsed");
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

  // 先更新 15 座天空浮空島的上下漂浮高度，並收集 2D 螢幕座標進行「防重疊自動避讓演算法」
  const visibleLabels = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isCompactScreen = vw <= 860;
  const estLabelW = isCompactScreen ? 152 : 186;
  const estLabelH = isCompactScreen ? 32 : 38;

  islandGroups.forEach((group, id) => {
    const baseY = group.userData.baseY ?? 4.0;
    group.position.y = baseY + Math.sin(elapsed * 1.45 + group.userData.phase) * 0.48;
    projVec.set(group.position.x, group.position.y + 4.15, group.position.z).project(camera);
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

  // Bit 博士在浮空島間巡島與揮手
  if (mascotState.pauseTimer > 0) {
    mascotState.pauseTimer -= dt;
    const g = islandGroups.get(mascotState.fromId);
    if (g) {
      mascotGroup.position.set(g.position.x + 1.8, g.position.y + 1.05, g.position.z + 1.8);
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
      mascotGroup.position.y += 1.05 + Math.sin(t * Math.PI) * 2.2 + Math.abs(Math.sin(elapsed * 11)) * 0.16;
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

  // 更新島上其他學伴 3D 擬人化公仔（跟隨浮空島高度、邁步擺手、揮手打招呼與頭頂角色名牌投影）
  if (showPeers) {
    peer3DEntities.forEach(ent => {
      const isl = islandGroups.get(ent.peerData.chId) || islandGroups.get(1);
      if (isl) {
        ent.targetPos.y = isl.position.y + 1.05;
      }
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
        ? Math.abs(Math.sin(elapsed * 11 + ent.phase)) * 0.72
        : isGreeting
        ? Math.abs(Math.sin(elapsed * 14)) * 0.35
        : Math.sin(elapsed * 3 + ent.phase) * 0.07;

      ent.group.position.set(ent.curPos.x, ent.curPos.y + hop, ent.curPos.z);

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
