/* ===================== 資料 ===================== */
const ITINERARY = [
  { day: 1, date: "8/14 (五)", city: "台北 → 伊斯坦堡", transport: "TK025 ‧ 21:45 桃園起飛 → 隔日 05:10 抵伊斯坦堡", meals: ["－","－","機上精緻簡餐"], hotel: "夜宿機上" },
  { day: 2, date: "8/15 (六)", city: "伊斯坦堡 → 番紅花城", transport: "巴士 ‧ 約 410 公里／4 小時 20 分", meals: ["機上簡餐","土式風味料理","傳統民宿套餐"], hotel: "ZALIFRE HOTEL" },
  { day: 3, date: "8/16 (日)", city: "番紅花城 → 安卡拉 → 卡帕多奇亞", transport: "巴士 ‧ 約 555 公里（含旋轉舞表演）", meals: ["旅館早餐","土式風味料理","旅館自助餐"], hotel: "EXEDRA HOTEL CAPPADOCIA" },
  { day: 4, date: "8/17 (一)", city: "卡帕多奇亞全日遊", transport: "市區接駁（果里美博物館／地下城）", meals: ["旅館早餐","窯甕風味料理","旅館自助餐"], hotel: "EXEDRA HOTEL CAPPADOCIA" },
  { day: 5, date: "8/18 (二)", city: "卡帕多奇亞 → 孔亞 → 巴穆嘉麗", transport: "巴士 ‧ 約 640 公里", meals: ["旅館早餐","土式鐵板＋披薩","旅館自助餐"], hotel: "PAM THERMAL HOTEL" },
  { day: 6, date: "8/19 (三)", city: "巴穆嘉麗（棉堡）→ 庫薩達西", transport: "巴士 ‧ 約 200 公里", meals: ["旅館早餐","土耳其風味料理","旅館自助餐"], hotel: "QLUSIVE HOTEL" },
  { day: 7, date: "8/20 (四)", city: "庫薩達西 → 以弗所 → 布爾薩", transport: "巴士 ‧ 約 420 公里", meals: ["旅館早餐","土耳其風味料理","旅館自助餐"], hotel: "ALMIRA HOTEL THERMAL SPA" },
  { day: 8, date: "8/21 (五)", city: "布爾薩 → 伊斯坦堡", transport: "巴士 ‧ 約 165 公里（博斯普魯斯遊船）", meals: ["旅館早餐","土耳其風味料理","方便逛街．自理"], hotel: "RAMADA PLAZA BY WYNDHAM" },
  { day: 9, date: "8/22 (六)", city: "伊斯坦堡市區", transport: "市區行程（藍色清真寺／大市集）", meals: ["旅館早餐","中式 7 菜 1 湯","舊城區經典漢堡餐"], hotel: "當晚前往機場" },
  { day: 10, date: "8/23 (日)", city: "伊斯坦堡 → 台北", transport: "TK024 ‧ 01:30 伊斯坦堡 → 17:55 桃園", meals: ["機上簡餐","機上簡餐","－"], hotel: "抵達溫暖的家" },
];

const CURRENCY_META = {
  TWD: { name: "新台幣", symbol: "NT$", decimals: 0 }, USD: { name: "美元", symbol: "$", decimals: 2 },
  JPY: { name: "日圓", symbol: "¥", decimals: 0 }, KRW: { name: "韓元", symbol: "₩", decimals: 0 },
  EUR: { name: "歐元", symbol: "€", decimals: 2 }, THB: { name: "泰銖", symbol: "฿", decimals: 2 },
  TRY: { name: "土耳其里拉", symbol: "₺", decimals: 2 },
};
const CURRENCIES = Object.keys(CURRENCY_META);
const MOCK_RATES_USD_BASE = { USD: 1, TWD: 32.5, JPY: 155.2, KRW: 1380, EUR: 0.92, THB: 36.8, TRY: 44 };
const RATE_API_URL = "https://open.er-api.com/v6/latest/USD";

const NOTES = [
  { title: "穿著提醒", icon: "👕", items: ["風俗較保守，避免緊身、暴露服裝", "參觀清真寺需脫鞋；女性需頭巾、長袖、長褲或長裙", "棉堡石灰棚僅能赤腳，建議帶拖鞋", "溫泉飯店可自備泳衣泡湯"] },
  { title: "飲食須知", icon: "🍽️", items: ["主食以麵包為主，肉類以牛雞為主", "不要飲用自來水，請購買瓶裝水", "腸胃敏感者建議攜帶腸胃藥與電解質粉", "素食選擇少，建議自備罐頭"] },
  { title: "住宿須知", icon: "🏨", items: ["多數飯店不提供牙刷、牙膏、拖鞋", "電壓 220V 雙圓孔歐規，記得帶轉接頭", "部分洞穴／民宿飯店無空調"] },
  { title: "money 匯兌", icon: "💰", items: ["當地可用歐元、美金、里拉", "建議準備 700–800 美金換匯", "美金需攜帶新版鈔票，避免收 50 美金面額", "每日房間小費約 1 美元／房"] },
];

const ATTRACTION_COORDS = {
  "希德爾立克山丘": { lat: 41.2530, lng: 32.6975, desc: "番紅花城最佳觀景台，可俯瞰整片鄂圖曼老城。" },
  "國父凱末爾紀念館": { lat: 39.9255, lng: 32.8372, desc: "土耳其國父長眠之處，融合多種古文明建築特色。" },
  "卡帕多奇亞熱氣球區": { lat: 38.6431, lng: 34.8286, desc: "格萊梅山谷，熱氣球升空的核心區域。" },
  "果里美露天博物館": { lat: 38.6455, lng: 34.8393, desc: "九世紀基督徒開鑿的岩窟教堂群。" },
  "凱馬克利地下城": { lat: 38.4544, lng: 34.4547, desc: "可容納萬人的多層地下城市。" },
  "梅夫拉納博物館": { lat: 37.8713, lng: 32.5236, desc: "神秘迴旋教派發源地（孔亞）。" },
  "棉堡石灰棚": { lat: 37.9235, lng: 29.1244, desc: "方解石礦泉形成的雪白階梯狀溫泉景觀。" },
  "希拉波利斯古城": { lat: 37.9260, lng: 29.1235, desc: "西元前190年建立的溫泉療養古城。" },
  "以弗所古城遺址": { lat: 37.9395, lng: 27.3417, desc: "世界最大希臘羅馬古城之一。" },
  "綠色清真寺": { lat: 40.1826, lng: 29.0743, desc: "鄂圖曼古典建築風格轉捩點。" },
  "藍色清真寺": { lat: 41.0054, lng: 28.9768, desc: "使用數萬片藍色磁磚打造的壯麗清真寺。" },
  "有頂大市集": { lat: 41.0106, lng: 28.9681, desc: "5000多家傳統商店，體驗異國討價還價的樂趣。" },
  "考古博物館": { lat: 41.0115, lng: 28.9813, desc: "又稱石棺博物館，鎮館之寶為亞歷山大大帝石棺。" },
  "博斯普魯斯海峽": { lat: 41.0180, lng: 28.9705, desc: "包船暢遊歐亞交界海峽。" },
};
const FOOD_MARKERS = [
  { name: "陶罐燉肉名店（Avanos）", lat: 38.7205, lng: 34.8480, desc: "卡帕多奇亞名產，現場敲開陶罐上桌。" },
  { name: "伊斯坦堡經典漢堡餐", lat: 41.0080, lng: 28.9755, desc: "舊城區排隊美食，行程第 9 天晚餐安排。" },
  { name: "İskender Kebap 創始老店", lat: 40.1859, lng: 29.0610, desc: "布爾薩烤肉發源地，淋上番茄奶油醬。" },
];
const ALL_MAP_MARKERS = [
  ...Object.entries(ATTRACTION_COORDS).map(([name, v]) => ({ name, category: "attraction", ...v })),
  ...FOOD_MARKERS.map((f) => ({ ...f, category: "food" })),
];

const WEATHER_CITIES = [
  { name: "伊斯坦堡", lat: 41.0082, lng: 28.9784 },
  { name: "番紅花城", lat: 41.2544, lng: 32.6944 },
  { name: "安卡拉", lat: 39.9334, lng: 32.8597 },
  { name: "卡帕多奇亞", lat: 38.6431, lng: 34.8286 },
  { name: "孔亞", lat: 37.8713, lng: 32.5236 },
  { name: "棉堡", lat: 37.9235, lng: 29.1244 },
  { name: "庫薩達西", lat: 37.8579, lng: 27.2610 },
  { name: "布爾薩", lat: 40.1826, lng: 29.0743 },
];

const SPOT_TAG_STYLE = {
  "IG熱門": { emoji: "🔥", bg: "#FDE8E4", fg: "#C1442D" },
  "美食天堂": { emoji: "🍽️", bg: "#FBEFDC", fg: "#C79A3C" },
  "拍照聖地": { emoji: "📸", bg: "#E4F3F1", fg: "#12857F" },
  "歷史古蹟": { emoji: "🏛️", bg: "#E7E9F4", fg: "#4C4E8A" },
  "夢幻仙境": { emoji: "✨", bg: "#F1E7F6", fg: "#8A4C9E" },
  "購物天堂": { emoji: "🛍️", bg: "#FCEBDD", fg: "#C97A2E" },
};
function wmFile(name, width) { return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=${width || 400}`; }
const POPULAR_SPOTS = [
  { id: "cappadocia", name: "卡帕多奇亞熱氣球", tags: ["IG熱門", "夢幻仙境"], photos: [
    wmFile("Hot_air_balloons_over_Cappadocia_1.jpg"), wmFile("Hot_air_balloon_over_Cappadocia,_Turkey.JPG"), wmFile("Aerial_view_of_Cappadocia_from_hot_air_balloon_54.jpg") ] },
  { id: "pamukkale", name: "棉堡 Pamukkale", tags: ["IG熱門", "拍照聖地"], photos: [
    wmFile("Pamukkale_Hierapolis_Travertine_pools.JPG"), wmFile("The_travertine_terraces_of_Pamukkale_4.jpg"), wmFile("Pamukkale_banner_Travertine_pools.jpg") ] },
  { id: "blue-mosque", name: "藍色清真寺", tags: ["歷史古蹟", "IG熱門"], photos: [
    wmFile("Sultan_Ahmed_Mosque_-_Blue_Mosque_-_Istanbul,_Turkey_(10582570686).jpg"), wmFile("The_Sultan_Ahmed_Mosque_(Blue_Mosque)_(8290130241).jpg"), wmFile("Sultan_Ahmet_Mosque_in_Istanbul.jpg") ] },
  { id: "grand-bazaar", name: "伊斯坦堡大市集", tags: ["美食天堂", "購物天堂"], photos: [
    wmFile("Grand_Bazaar,_Istanbul_111.JPG"), wmFile("Grand_Bazaar,_Istanbul_113.JPG"), wmFile("Kapali_Carsi-Grand_Bazar-Istanbul-Sep08.jpg") ] },
];

const GUIDE = [
  { city: "番紅花城 Safranbolu", year: "1994 入選世界遺產", spots: ["八百棟鄂圖曼老宅古城區","希德爾立克山丘觀景台","古浴場與蘇里曼帕夏學院"], food: ["土式烤餅 Pide","核桃軟糖 Lokum","鄂圖曼風味燉飯"] },
  { city: "卡帕多奇亞 Cappadocia", year: "1985 入選世界遺產", spots: ["格萊梅露天博物館岩窟教堂","凱馬克利地下城","精靈煙囪奇岩地形"], food: ["陶罐燉肉 Testi Kebabı","手工地毯工坊蘋果茶","石榴烤肉串"] },
  { city: "巴穆嘉麗 Pamukkale（棉堡）", year: "1988 入選世界遺產", spots: ["希拉波利斯古城遺址","白色石灰棚溫泉階地","古羅馬圓形劇場"], food: ["溫泉區鱒魚料理","橄欖油燉時蔬","土耳其優格醬沙拉"] },
  { city: "以弗所 Ephesus", year: "2015 入選世界遺產", spots: ["塞爾瑟斯圖書館遺跡","露天劇場","古羅馬大理石街道"], food: ["愛琴海橄欖與起司拼盤","海鮮什錦烤物","無花果甜點"] },
  { city: "布爾薩 Bursa", year: "2014 入選世界遺產", spots: ["綠色清真寺與綠色陵墓","絲綢市集 Koza Han","鄂圖曼蘇丹陵墓群"], food: ["布爾薩烤肉 İskender Kebap","栗子甜點","土耳其咖啡配軟糖"] },
  { city: "伊斯坦堡 Istanbul", year: "1985 入選世界遺產", spots: ["藍色清真寺","考古博物館「亞歷山大石棺」","有頂大市集","博斯普魯斯海峽"], food: ["舊城區經典漢堡餐","土耳其烤肉 Şiş Kebap","巴克拉瓦 Baklava","土耳其咖啡"] },
];

const DEFAULT_ALBUM_PHOTOS = [
  { id: "m1", uploader: "張德芳 領隊", city: "番紅花城", url: "https://picsum.photos/seed/safranbolu-tr/400/400" },
  { id: "m2", uploader: "陳小姐", city: "卡帕多奇亞", url: "https://picsum.photos/seed/cappadocia-balloon/400/400" },
  { id: "m3", uploader: "林先生", city: "棉堡", url: "https://picsum.photos/seed/pamukkale-white/400/400" },
  { id: "m4", uploader: "王小姐", city: "以弗所", url: "https://picsum.photos/seed/ephesus-ruins/400/400" },
  { id: "m5", uploader: "張德芳 領隊", city: "藍色清真寺", url: "https://picsum.photos/seed/blue-mosque-ist/400/400" },
  { id: "m6", uploader: "李先生", city: "博斯普魯斯海峽", url: "https://picsum.photos/seed/bosphorus-cruise/400/400" },
];

const CHECKLIST_CATEGORIES = [
  { id: "docs", label: "重要證件", icon: "📄", color: "#4C4E8A" },
  { id: "electronics", label: "電子產品", icon: "📱", color: "#12857F" },
  { id: "clothing", label: "換洗衣物", icon: "👕", color: "#C79A3C" },
  { id: "other", label: "其他", icon: "📦", color: "#94897a" },
];
const CATEGORY_ICON_POOL = ["🎒","💊","🧴","🔌","🧢","📚","🕶️","🧳"];
const CATEGORY_COLOR_POOL = ["#8A4C9E","#2E86AB","#C97A2E","#4C4E8A","#12857F","#C1442D"];
const DEFAULT_CHECKLIST_ITEMS = [
  { text: "護照", category: "docs" }, { text: "身分證", category: "docs" }, { text: "簽證 / 入境許可", category: "docs" },
  { text: "旅遊保險證明", category: "docs" }, { text: "信用卡", category: "docs" }, { text: "現金 / 外幣", category: "docs" },
  { text: "手機", category: "electronics" }, { text: "充電器", category: "electronics" }, { text: "行動電源", category: "electronics" },
  { text: "轉接頭（歐規）", category: "electronics" }, { text: "耳機", category: "electronics" },
  { text: "上衣", category: "clothing" }, { text: "褲子", category: "clothing" }, { text: "內衣褲", category: "clothing" },
  { text: "襪子", category: "clothing" }, { text: "外套", category: "clothing" },
].map((it, i) => ({ id: `default-${i}`, checked: false, ...it }));

const EXPENSE_CATEGORIES = [
  { id: "food", label: "餐飲", icon: "🍽️", color: "#C1442D" },
  { id: "transport", label: "交通", icon: "🚌", color: "#12857F" },
  { id: "shopping", label: "購物", icon: "🛍️", color: "#C79A3C" },
  { id: "accommodation", label: "住宿", icon: "🏨", color: "#4C4E8A" },
  { id: "ticket", label: "門票／活動", icon: "🎟️", color: "#8A4C9E" },
  { id: "other", label: "其他", icon: "📦", color: "#94897a" },
];
function expenseCategoryOf(id) { return EXPENSE_CATEGORIES.find((c) => c.id === id) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1]; }

const PHRASES = [
  { zh: "你好", tr: "Merhaba", pron: "梅兒哈巴" }, { zh: "謝謝", tr: "Teşekkürler", pron: "特謝屈雷兒" },
  { zh: "多少錢？", tr: "Ne kadar?", pron: "內 卡達爾" }, { zh: "洗手間在哪裡？", tr: "Tuvalet nerede?", pron: "圖瓦雷 內雷德" },
  { zh: "救命！", tr: "İmdat!", pron: "伊姆達特" }, { zh: "很好吃", tr: "Çok lezzetli", pron: "秋克 雷賊特利" },
  { zh: "不要辣", tr: "Acısız olsun", pron: "阿吉色 歐爾孫" }, { zh: "可以刷卡嗎？", tr: "Kart geçerli mi?", pron: "卡兒特 給切里 米" },
  { zh: "我要退稅", tr: "Vergi iadesi istiyorum", pron: "維爾基 亞德西 伊斯提優魯姆" }, { zh: "再見", tr: "Hoşça kal", pron: "后洽 卡兒" },
];
const SPEECH_LANGS = { zh: { code: "zh-TW", label: "中文" }, tr: { code: "tr-TR", label: "土耳其語" } };
const ERROR_COPY = {
  "permission-denied": { title: "麥克風權限被拒絕", tip: "請點擊瀏覽器網址列左側鎖頭圖示（或至系統設定→隱私權→麥克風），允許後再試一次。" },
  "no-mic": { title: "找不到麥克風裝置", tip: "請確認裝置已連接麥克風，或允許瀏覽器存取麥克風硬體。" },
  "not-supported": { title: "此瀏覽器不支援語音辨識", tip: "iOS Safari／App 內建瀏覽器目前不支援語音辨識，建議改用 Android 版 Chrome，或直接使用下方文字翻譯。" },
  "insecure-context": { title: "需要安全連線（HTTPS）", tip: "麥克風僅能在 https:// 開頭的網址中使用，目前的連線不支援。" },
  "no-speech": { title: "沒有偵測到聲音", tip: "請靠近麥克風，確認沒有靜音，再按一次重新錄音。" },
  "network": { title: "語音辨識連線失敗", tip: "請確認網路連線穩定後再試一次。" },
  "unknown": { title: "麥克風目前無法使用", tip: "請重新整理頁面再試一次；若仍無反應，可改用下方文字翻譯。若你是在 CodePen 編輯器的分割預覽窗測試，麥克風權限可能被 iframe 擋掉，請改用「Full Page」或正式發佈的網址測試。" },
};

// 拍照翻譯：OCR 來源語言（Tesseract.js 語言代碼）與可選翻譯目標語言
const PHOTO_OCR_LANGS = [
  { id: "tur", mm: "tr", label: "土耳其文" },
  { id: "eng", mm: "en-GB", label: "英文" },
  { id: "jpn", mm: "ja", label: "日文" },
  { id: "kor", mm: "ko", label: "韓文" },
  { id: "chi_tra", mm: "zh-TW", label: "繁體中文" },
];
const PHOTO_TARGET_LANGS = [
  { mm: "zh-TW", label: "繁體中文" },
  { mm: "en-GB", label: "英文" },
  { mm: "ja", label: "日文" },
  { mm: "ko", label: "韓文" },
  { mm: "tr", label: "土耳其文" },
];

/* ===================== 共用工具 ===================== */
function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms || 8000);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}
function loadJSON(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch (e) { console.error("讀取 localStorage 失敗：", e); return fallback; }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (e) { console.error("寫入 localStorage 失敗：", e); }
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ===================== 狀態 ===================== */
const state = {
  tab: "itinerary",
  members: loadJSON("trip-members", ["我", "同伴A", "同伴B"]),
  expenses: loadJSON("trip-expenses", []),
  expenseDraft: { desc: "", amount: "", paidBy: null, split: [], category: "other" },
  expenseSummaryView: "member",
  rates: MOCK_RATES_USD_BASE, rateSource: "mock", rateUpdatedAt: null, rateLoading: false, amount: 1000, base: "TWD",
  albumPhotos: loadJSON("trip-album-photos", DEFAULT_ALBUM_PHOTOS),
  checklistItems: loadJSON("trip-checklist", DEFAULT_CHECKLIST_ITEMS),
  customCategories: loadJSON("trip-checklist-categories", []),
  checklistDraft: { text: "", category: "other" },
  photoTranslate: { photo: null, status: "idle", sourceLang: "tur", ocrSourceMM: "tr", targetLang: "zh-TW", ocrText: "", translated: "", errorMsg: "" },
  voiceTranslate: { direction: "zh-tr", phase: "idle", errorType: null, transcript: "", translated: "" },
  voiceMemo: { recState: "idle", errorMsg: "", audioURL: null, seconds: 0 },
  textTranslate: { input: "", history: [], loading: false },
  weather: {},
  balloon: null,
  locationWeather: null,
};
state.expenseDraft.paidBy = state.members[0];
state.expenseDraft.split = [...state.members];
state.expenses.forEach((e) => { if (!e.category) e.category = "other"; });

let voiceRecognition = null;
let voiceMemoRecorder = null, voiceMemoChunks = [], voiceMemoStream = null, voiceMemoTimer = null;
let tripMap = null, tripMapLayer = null, userLocationMarker = null;

/* ===================== 分頁切換 ===================== */
document.getElementById("bottomNav").addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;
  state.tab = btn.dataset.tab;
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b === btn));
  render();
});

/* ===================== 主渲染 ===================== */
function render() {
  const active = document.activeElement;
  const activeId = active && active.id;
  const selStart = active && active.selectionStart;
  const selEnd = active && active.selectionEnd;

  const el = document.getElementById("content");
  if (state.tab === "itinerary") { el.innerHTML = renderItinerary(); wireItineraryEvents(); }
  else if (state.tab === "expense") el.innerHTML = renderExpense();
  else if (state.tab === "album") { el.innerHTML = renderAlbum(); wireAlbumEvents(); }
  else if (state.tab === "guide") el.innerHTML = renderGuide();
  else if (state.tab === "checklist") el.innerHTML = renderChecklist();
  else if (state.tab === "tools") { el.innerHTML = renderTools(); wireToolsEvents(); }
  else if (state.tab === "notes") el.innerHTML = renderNotes();

  if (activeId) {
    const restored = document.getElementById(activeId);
    if (restored) {
      restored.focus();
      if (typeof selStart === "number" && restored.setSelectionRange) { try { restored.setSelectionRange(selStart, selEnd); } catch (e) {} }
    }
  }
}

/* ===================== 天氣 / 熱氣球 / 目前位置 ===================== */
function weatherEmoji(code) {
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return "🌧️";
  if ([71,73,75,77,85,86].includes(code)) return "🌨️";
  if ([95,96,99].includes(code)) return "⛈️";
  return "🌡️";
}
async function fetchWeather() {
  try {
    const results = await Promise.all(WEATHER_CITIES.map(async (c) => {
      const res = await fetchWithTimeout(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lng}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`, 8000);
      const data = await res.json();
      return { name: c.name, temp: data.current.temperature_2m, code: data.current.weather_code, wind: data.current.wind_speed_10m };
    }));
    results.forEach((r) => { state.weather[r.name] = r; });
    const cap = state.weather["卡帕多奇亞"];
    if (cap) {
      const flyable = cap.wind < 20;
      state.balloon = { flyable, wind: Math.round(cap.wind), text: flyable ? "風力條件較穩定，熱氣球有機會正常升空" : "目前風力偏大，熱氣球今日可能延誤或停飛" };
    }
    if (state.tab === "itinerary") render();
  } catch (e) { console.error("天氣資料讀取失敗：", e); }
}
function fetchCurrentLocationWeather() {
  if (!navigator.geolocation) { alert("此裝置或瀏覽器不支援定位功能"); return; }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    try {
      const [nameRes, weatherRes] = await Promise.all([
        fetchWithTimeout(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=zh-TW`, 8000),
        fetchWithTimeout(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`, 8000),
      ]);
      const nameData = await nameRes.json();
      const wData = await weatherRes.json();
      const addr = nameData.address || {};
      const name = addr.city || addr.town || addr.county || addr.state || nameData.name || "目前位置";
      state.locationWeather = { name, temp: wData.current.temperature_2m, code: wData.current.weather_code };
    } catch (e) {
      console.error("目前位置天氣讀取失敗：", e);
      alert("無法取得目前位置的天氣資料，請稍後再試");
    }
    if (state.tab === "itinerary") render();
  }, (err) => { alert("無法取得目前位置：" + (err.message || "請確認已允許定位權限")); }, { enableHighAccuracy: true, timeout: 8000 });
}

/* ===================== 行程 + 地圖 ===================== */
function renderItinerary() {
  const locHtml = state.locationWeather ? `
    <div class="current-location-weather">
      <div class="weather-chip current"><span>📍 ${state.locationWeather.name}</span><span>${weatherEmoji(state.locationWeather.code)} ${Math.round(state.locationWeather.temp)}°C</span></div>
      <button class="link-btn" id="refreshLocationWeatherBtn">🔄</button>
    </div>` : `
    <div class="current-location-weather">
      <button class="locate-weather-btn" id="locateWeatherBtn">📍 取得目前位置的天氣</button>
    </div>`;

  const weatherHtml = WEATHER_CITIES.map((c) => {
    const w = state.weather[c.name];
    return w ? `<div class="weather-chip"><span>${c.name}</span><span>${weatherEmoji(w.code)} ${Math.round(w.temp)}°C</span></div>` : `<div class="weather-chip"><span>${c.name}</span><span>…</span></div>`;
  }).join("");

  const balloonHtml = state.balloon ? `
    <div class="balloon-alert ${state.balloon.flyable ? "ok" : "warn"}">
      <span>🎈</span>
      <div>
        <p class="balloon-title">${state.balloon.flyable ? "熱氣球飛行機會較高" : "熱氣球緊報：今日風力偏大"}</p>
        <p class="balloon-sub">卡帕多奇亞目前風速約 ${state.balloon.wind} km/h。${state.balloon.text}（實際起降以當地業者與民航局現場公告為準）</p>
      </div>
    </div>` : `<p class="loading-hint">熱氣球狀態讀取中…</p>`;

  const dayCards = ITINERARY.map((d) => `
    <details class="card day-card" ${d.day === 1 ? "open" : ""}>
      <summary>
        <div class="day-badge"><span>DAY</span><b>${d.day}</b></div>
        <div class="day-meta"><p class="date">${d.date}</p><p class="city">${d.city}</p></div>
      </summary>
      <div class="day-detail">
        <p>🚌 ${d.transport}</p><p>🏨 ${d.hotel}</p>
        <div class="meals">
          <span class="meal-chip">早：${d.meals[0]}</span>
          <span class="meal-chip">午：${d.meals[1]}</span>
          <span class="meal-chip">晚：${d.meals[2]}</span>
        </div>
      </div>
    </details>`).join("");

  return `
    <div class="card">
      <h2>🌤️ 即時天氣</h2>
      ${locHtml}
      <div class="weather-grid">${weatherHtml}</div>
      ${balloonHtml}
    </div>
    <div class="map-wrap" id="mapWrap">
      <div id="tripMap"></div>
      <div class="map-controls">
        <button class="map-btn" id="mapFullscreenBtn" title="全螢幕">⛶</button>
        <button class="map-btn" id="mapLocateBtn" title="定位到我">📍</button>
      </div>
      <div class="map-legend">
        <span><span class="legend-dot" style="background:#4285F4"></span>景點</span>
        <span><span class="legend-dot" style="background:#FF8C00"></span>美食</span>
      </div>
    </div>
    ${dayCards}`;
}
function wireItineraryEvents() {
  initOrUpdateMap();
  const fsBtn = document.getElementById("mapFullscreenBtn"); if (fsBtn) fsBtn.onclick = toggleMapFullscreen;
  const locateBtn = document.getElementById("mapLocateBtn"); if (locateBtn) locateBtn.onclick = locateMe;
  const locWeatherBtn = document.getElementById("locateWeatherBtn"); if (locWeatherBtn) locWeatherBtn.onclick = fetchCurrentLocationWeather;
  const refreshLocWeatherBtn = document.getElementById("refreshLocationWeatherBtn"); if (refreshLocWeatherBtn) refreshLocWeatherBtn.onclick = fetchCurrentLocationWeather;
}
function initOrUpdateMap() {
  const mapEl = document.getElementById("tripMap");
  if (!mapEl) return;
  if (typeof L === "undefined") {
    mapEl.parentElement.innerHTML =
