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

// 支出分類（記帳用）
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
const MOCK_PHOTO_RESULTS = [
  { lang: "日文", flag: "🇯🇵", original: "本日のランチセットは11時から14時まで、数量限定でご提供しております。", translated: "本日午餐套餐供應時間為 11:00–14:00，數量有限，售完為止。" },
  { lang: "英文", flag: "🇬🇧", original: "Please keep your belongings with you at all times. Unattended bags will be removed.", translated: "請隨身攜帶您的個人物品，無人看管的行李將會被移除。" },
];
const SPEECH_LANGS = { zh: { code: "zh-TW", label: "中文" }, tr: { code: "tr-TR", label: "土耳其語" } };
const ERROR_COPY = {
  "permission-denied": { title: "麥克風權限被拒絕", tip: "請點擊瀏覽器網址列左側鎖頭圖示（或至系統設定→隱私權→麥克風），允許後再試一次。" },
  "no-mic": { title: "找不到麥克風裝置", tip: "請確認裝置已連接麥克風，或允許瀏覽器存取麥克風硬體。" },
  "not-supported": { title: "此瀏覽器不支援語音辨識", tip: "iOS Safari／App 內建瀏覽器目前不支援語音辨識，建議改用 Android 版 Chrome，或直接使用下方文字翻譯。" },
  "insecure-context": { title: "需要安全連線（HTTPS）", tip: "麥克風僅能在 https:// 開頭的網址中使用，目前的連線不支援。" },
  "no-speech": { title: "沒有偵測到聲音", tip: "請靠近麥克風，確認沒有靜音，再按一次重新錄音。" },
  "network": { title: "語音辨識連線失敗", tip: "請確認網路連線穩定後再試一次。" },
  "unknown": { title: "麥克風目前無法使用", tip: "請重新整理頁面再試一次；若仍無反應，可改用下方文字翻譯。" },
};

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

/* ===================== 狀態 ===================== */
const state = {
  tab: "itinerary",
  members: loadJSON("trip-members", ["我", "同伴A", "同伴B"]),
  expenses: loadJSON("trip-expenses", []),
  expenseDraft: { desc: "", amount: "", paidBy: null, split: [], category: "other" },
  expenseSummaryView: "member", // member | category
  rates: MOCK_RATES_USD_BASE, rateSource: "mock", rateUpdatedAt: null, rateLoading: false, amount: 1000, base: "TWD",
  albumPhotos: loadJSON("trip-album-photos", DEFAULT_ALBUM_PHOTOS),
  checklistItems: loadJSON("trip-checklist", DEFAULT_CHECKLIST_ITEMS),
  customCategories: loadJSON("trip-checklist-categories", []),
  checklistDraft: { text: "", category: "other" },
  photoTranslate: { photo: null, status: "idle", result: null },
  voiceTranslate: { direction: "zh-tr", phase: "idle", errorType: null, transcript: "", translated: "" },
  voiceMemo: { recState: "idle", errorMsg: "", audioURL: null, seconds: 0 },
  textTranslate: { input: "", history: [], loading: false },
  weather: {},
  balloon: null,
  locationWeather: null,
};
state.expenseDraft.paidBy = state.members[0];
state.expenseDraft.split = [...state.members];
// 舊資料相容：補上分類欄位
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

// 🔧 修正重點：每次進入行程頁都先銷毀舊地圖再重新建立，
// 避免舊地圖物件綁定到已被 innerHTML 替換掉的 DOM 節點，導致地圖打不開
function initOrUpdateMap() {
  const mapEl = document.getElementById("tripMap");
  if (!mapEl) return;

  if (typeof L === "undefined") {
    mapEl.parentElement.innerHTML = `<div style="padding:34px 16px;text-align:center;color:#94897a;font-size:12px;line-height:1.6;">⚠️ 地圖套件（Leaflet）載入失敗<br/>請確認網路連線後重新整理頁面再試一次</div>`;
    return;
  }

  if (tripMap) {
    try { tripMap.remove(); } catch (e) { console.warn("清除舊地圖時發生小狀況：", e); }
    tripMap = null; tripMapLayer = null; userLocationMarker = null;
  }

  try {
    tripMap = L.map("tripMap", { zoomControl: true }).setView([38.9, 32.6], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(tripMap);
    tripMapLayer = L.layerGroup().addTo(tripMap);
    ALL_MAP_MARKERS.forEach((m) => {
      const color = m.category === "food" ? "#FF8C00" : "#4285F4";
      const marker = L.circleMarker([m.lat, m.lng], { radius: 8, color: "#fff", weight: 2, fillColor: color, fillOpacity: 1 }).addTo(tripMapLayer);
      marker.bindPopup(`<b>${m.category === "food" ? "🍽️" : "📍"} ${m.name}</b><br/><span style="font-size:12px;color:#555;">${m.desc}</span>`);
    });
    setTimeout(() => { if (tripMap) tripMap.invalidateSize(); }, 150);
  } catch (e) {
    console.error("地圖初始化失敗：", e);
    const wrap = document.getElementById("mapWrap");
    if (wrap) wrap.innerHTML = `<div style="padding:34px 16px;text-align:center;color:#94897a;font-size:12px;line-height:1.6;">⚠️ 地圖載入發生錯誤<br/>請重新整理頁面再試一次</div>`;
  }
}
function toggleMapFullscreen() {
  const wrap = document.getElementById("mapWrap");
  if (!wrap) return;
  const isFs = document.fullscreenElement || document.webkitFullscreenElement;
  if (!isFs) { (wrap.requestFullscreen || wrap.webkitRequestFullscreen || wrap.msRequestFullscreen || function () {}).call(wrap); }
  else { (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document); }
}
document.addEventListener("fullscreenchange", () => { if (tripMap) setTimeout(() => tripMap.invalidateSize(), 200); });
document.addEventListener("webkitfullscreenchange", () => { if (tripMap) setTimeout(() => tripMap.invalidateSize(), 200); });
function locateMe() {
  if (!tripMap) return;
  if (!navigator.geolocation) { alert("此裝置或瀏覽器不支援定位功能"); return; }
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    if (userLocationMarker) tripMap.removeLayer(userLocationMarker);
    userLocationMarker = L.circleMarker([latitude, longitude], { radius: 8, color: "#fff", weight: 3, fillColor: "#12857F", fillOpacity: 1 }).addTo(tripMap).bindPopup("📍 你目前的位置").openPopup();
    tripMap.setView([latitude, longitude], 12);
  }, (err) => { alert("無法取得目前位置：" + (err.message || "請確認已允許定位權限")); }, { enableHighAccuracy: true, timeout: 8000 });
}

/* ===================== 記帳（新增：支出分類＋各夥伴/各分類總覽） ===================== */
function computeMemberTotals() {
  const totals = Object.fromEntries(state.members.map((m) => [m, 0]));
  state.expenses.forEach((e) => { if (totals[e.paidBy] !== undefined) totals[e.paidBy] += e.amount; });
  return totals;
}
function computeCategoryTotals() {
  const totals = Object.fromEntries(EXPENSE_CATEGORIES.map((c) => [c.id, 0]));
  state.expenses.forEach((e) => { const cid = e.category || "other"; totals[cid] = (totals[cid] || 0) + e.amount; });
  return totals;
}
function renderExpenseSummary() {
  const memberTotals = computeMemberTotals();
  const categoryTotals = computeCategoryTotals();
  const maxMember = Math.max(1, ...Object.values(memberTotals));
  const maxCategory = Math.max(1, ...Object.values(categoryTotals));
  const view = state.expenseSummaryView;

  const memberRows = state.members.map((m, i) => {
    const val = memberTotals[m] || 0;
    const pct = Math.round((val / maxMember) * 100);
    const color = CATEGORY_COLOR_POOL[i % CATEGORY_COLOR_POOL.length];
    return `
      <div class="summary-row">
        <span class="summary-icon" style="background:${color}">${m[0]}</span>
        <div class="summary-info">
          <div class="summary-label-row"><span>${m}</span><b>${val.toLocaleString()} 元</b></div>
          <div class="summary-bar-track"><div class="summary-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        </div>
      </div>`;
  }).join("");

  const categoryRows = EXPENSE_CATEGORIES.filter((c) => categoryTotals[c.id] > 0).map((c) => {
    const val = categoryTotals[c.id] || 0;
    const pct = Math.round((val / maxCategory) * 100);
    return `
      <div class="summary-row">
        <span class="summary-icon" style="background:${c.color}">${c.icon}</span>
        <div class="summary-info">
          <div class="summary-label-row"><span>${c.label}</span><b>${val.toLocaleString()} 元</b></div>
          <div class="summary-bar-track"><div class="summary-bar-fill" style="width:${pct}%;background:${c.color}"></div></div>
        </div>
      </div>`;
  }).join("") || `<p class="loading-hint">尚無分類支出</p>`;

  return `
    <div class="card">
      <h2>📊 支出總覽</h2>
      <div class="summary-tabs">
        <button class="summary-tab-btn ${view === "member" ? "active" : ""}" onclick="setExpenseSummaryView('member')">👥 各夥伴支出</button>
        <button class="summary-tab-btn ${view === "category" ? "active" : ""}" onclick="setExpenseSummaryView('category')">🏷️ 各分類支出</button>
      </div>
      ${view === "member" ? memberRows : categoryRows}
    </div>`;
}
window.setExpenseSummaryView = function (v) { state.expenseSummaryView = v; render(); };

function renderExpense() {
  const d = state.expenseDraft;
  const membersHtml = state.members.map((m) => `<span class="chip">${m}<button onclick="removeMember('${m}')">✕</button></span>`).join("");
  const splitHtml = state.members.map((m) => `<button class="chip split ${d.split.includes(m) ? "active" : ""}" onclick="toggleSplit('${m}')">${m}</button>`).join("");
  const paidByOptions = state.members.map((m) => `<option value="${m}" ${d.paidBy === m ? "selected" : ""}>${m}</option>`).join("");
  const categoryOptions = EXPENSE_CATEGORIES.map((c) => `<option value="${c.id}" ${d.category === c.id ? "selected" : ""}>${c.icon} ${c.label}</option>`).join("");
  const total = state.expenses.reduce((s, e) => s + e.amount, 0);
  const listHtml = state.expenses.map((e) => {
    const cat = expenseCategoryOf(e.category);
    return `
      <div class="expense-item">
        <div><div>${cat.icon} ${e.desc}</div><p class="meta">${e.paidBy} 代墊 ‧ ${cat.label} ‧ ${e.split.length} 人均分</p></div>
        <div style="display:flex;align-items:center;">
          <span class="amt">${e.amount.toLocaleString()}</span>
          <button onclick="deleteExpense(${e.id})">🗑</button>
        </div>
      </div>`;
  }).join("");
  const balances = computeBalances();

  return `
    <div class="card">
      <h2>👥 同行夥伴</h2>
      <div class="chip-row">${membersHtml}</div>
      <div class="row">
        <input id="newMemberInput" placeholder="新增夥伴名字" onkeydown="if(event.key==='Enter')addMember()" />
        <button class="btn-add" onclick="addMember()">＋</button>
      </div>
    </div>
    <div class="card">
      <h2>➕ 新增支出</h2>
      <input id="descInput" placeholder="項目（例如：晚餐／計程車）" value="${d.desc}" oninput="state.expenseDraft.desc=this.value" style="margin-bottom:8px;" />
      <div class="row">
        <input id="amountInput" type="number" placeholder="金額" value="${d.amount}" oninput="state.expenseDraft.amount=this.value" />
        <select onchange="state.expenseDraft.paidBy=this.value">${paidByOptions}</select>
      </div>
      <div class="row">
        <select onchange="state.expenseDraft.category=this.value">${categoryOptions}</select>
      </div>
      <p style="font-size:11px;color:#94897a;margin:4px 0;">由誰均分？</p>
      <div class="chip-row">${splitHtml}</div>
      <button class="btn btn-primary" onclick="addExpense()">加入這筆支出</button>
    </div>
    ${state.expenses.length ? `<div class="card"><h2>📋 支出紀錄（共計 ${total.toLocaleString()}）</h2>${listHtml}</div>` : ""}
    ${state.expenses.length ? renderExpenseSummary() : ""}
    ${state.expenses.length ? `
      <div class="card balance-card">
        <h2 style="color:#C79A3C;">🔁 分帳結果</h2>
        ${Object.entries(balances.net).map(([m, v]) => `<div class="balance-row"><span>${m}</span><span class="${v >= 0 ? "balance-pos" : "balance-neg"}">${v >= 0 ? "應收回 " : "應支付 "}${Math.abs(v).toFixed(0)} 元</span></div>`).join("")}
        ${balances.settlements.length ? balances.settlements.map((s) => `<div class="settle-row">💰 ${s.from} 付給 ${s.to}<span class="amt">${s.amt.toFixed(0)} 元</span></div>`).join("") : `<p style="font-size:12px;color:rgba(255,255,255,.5);">目前帳務已平衡 🎉</p>`}
      </div>` : ""}
  `;
}
function computeBalances() {
  const net = Object.fromEntries(state.members.map((m) => [m, 0]));
  state.expenses.forEach((e) => {
    const share = e.amount / e.split.length;
    if (net[e.paidBy] !== undefined) net[e.paidBy] += e.amount;
    e.split.forEach((p) => { if (net[p] !== undefined) net[p] -= share; });
  });
  const creditors = Object.entries(net).filter(([, v]) => v > 0.5).map(([n, v]) => ({ n, v })).sort((a, b) => b.v - a.v);
  const debtors = Object.entries(net).filter(([, v]) => v < -0.5).map(([n, v]) => ({ n, v: -v })).sort((a, b) => b.v - a.v);
  const settlements = []; let i = 0, j = 0;
  while (i < creditors.length && j < debtors.length) {
    const pay = Math.min(creditors[i].v, debtors[j].v);
    settlements.push({ from: debtors[j].n, to: creditors[i].n, amt: pay });
    creditors[i].v -= pay; debtors[j].v -= pay;
    if (creditors[i].v < 0.5) i++; if (debtors[j].v < 0.5) j++;
  }
  return { net, settlements };
}
window.addMember = function () {
  const input = document.getElementById("newMemberInput");
  const name = input.value.trim();
  if (!name || state.members.includes(name)) return;
  state.members.push(name); state.expenseDraft.split.push(name);
  saveJSON("trip-members", state.members); render();
};
window.removeMember = function (name) {
  state.members = state.members.filter((m) => m !== name);
  state.expenseDraft.split = state.expenseDraft.split.filter((m) => m !== name);
  if (state.expenseDraft.paidBy === name) state.expenseDraft.paidBy = state.members[0];
  saveJSON("trip-members", state.members); render();
};
window.toggleSplit = function (name) {
  const s = state.expenseDraft.split;
  state.expenseDraft.split = s.includes(name) ? s.filter((m) => m !== name) : [...s, name];
  render();
};
window.addExpense = function () {
  const d = state.expenseDraft; const amt = parseFloat(d.amount);
  if (!d.desc.trim() || !amt || amt <= 0 || d.split.length === 0) return;
  state.expenses.unshift({ id: Date.now(), desc: d.desc.trim(), amount: amt, paidBy: d.paidBy, split: [...d.split], category: d.category || "other" });
  saveJSON("trip-expenses", state.expenses);
  state.expenseDraft.desc = ""; state.expenseDraft.amount = ""; render();
};
window.deleteExpense = function (id) {
  state.expenses = state.expenses.filter((e) => e.id !== id);
  saveJSON("trip-expenses", state.expenses); render();
};

/* ===================== 相簿 ===================== */
function renderAlbum() {
  const photosHtml = state.albumPhotos.map((p) => `
    <div class="photo-cell" data-id="${p.id}">
      <img src="${p.url}" alt="${p.city || ""}" loading="lazy"
           onload="this.parentElement.classList.add('loaded')"
           onerror="this.parentElement.classList.add('error')" />
      <div class="photo-placeholder">🖼️</div>
      ${p.isNew ? '<span class="photo-new">NEW</span>' : ""}
      ${p.uploader === "我" ? `<button class="photo-delete" data-id="${p.id}" title="刪除照片">🗑</button>` : ""}
      <div class="photo-caption">${p.uploader}</div>
    </div>`).join("");

  return `
    <div class="album-header">
      <div><p class="album-title">旅程相簿</p><p class="album-sub">${state.albumPhotos.length} 張夥伴共享的回憶（僅上傳者本人可刪除自己的照片）</p></div>
      <div class="album-actions">
        <button class="fab camera" id="albumCameraBtn" title="拍照">📷</button>
        <button class="fab gallery" id="albumGalleryBtn" title="從裝置選擇檔案">🖼️</button>
      </div>
      <input type="file" id="albumCameraInput" accept="image/*" capture="environment" style="display:none" />
      <input type="file" id="albumGalleryInput" accept="image/*" multiple style="display:none" />
    </div>
    <div class="photo-grid">${photosHtml}</div>
    <div class="lightbox" id="lightbox">
      <button class="lightbox-close" id="lightboxClose">✕</button>
      <div class="lightbox-content">
        <img id="lightboxImg" src="" alt="" />
        <div class="lightbox-caption">
          <span class="avatar" id="lightboxAvatar"></span>
          <div><p id="lightboxUploader"></p><p id="lightboxCity" class="lightbox-city"></p></div>
        </div>
      </div>
    </div>`;
}
function addPhotosFromFileList(fileList) {
  Array.from(fileList).forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      state.albumPhotos.unshift({ id: "u-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6), uploader: "我", city: "剛剛上傳", url: reader.result, isNew: true });
      saveJSON("trip-album-photos", state.albumPhotos);
      render();
    };
    reader.readAsDataURL(file);
  });
}
function deleteAlbumPhoto(id) {
  const photo = state.albumPhotos.find((p) => String(p.id) === String(id));
  if (!photo || photo.uploader !== "我") return;
  if (!confirm("確定要刪除這張照片嗎？")) return;
  state.albumPhotos = state.albumPhotos.filter((p) => String(p.id) !== String(id));
  saveJSON("trip-album-photos", state.albumPhotos);
  render();
}
function wireAlbumEvents() {
  const cameraBtn = document.getElementById("albumCameraBtn");
  const cameraInput = document.getElementById("albumCameraInput");
  if (cameraBtn) cameraBtn.onclick = () => cameraInput.click();
  if (cameraInput) cameraInput.onchange = (e) => { addPhotosFromFileList(e.target.files); e.target.value = ""; };

  const galleryBtn = document.getElementById("albumGalleryBtn");
  const galleryInput = document.getElementById("albumGalleryInput");
  if (galleryBtn) galleryBtn.onclick = () => galleryInput.click();
  if (galleryInput) galleryInput.onchange = (e) => { addPhotosFromFileList(e.target.files); e.target.value = ""; };

  document.querySelectorAll(".photo-delete").forEach((btn) => { btn.onclick = (e) => { e.stopPropagation(); deleteAlbumPhoto(btn.dataset.id); }; });
  document.querySelectorAll(".photo-cell").forEach((cell) => { cell.onclick = () => openLightbox(cell.dataset.id); });
  const closeBtn = document.getElementById("lightboxClose");
  if (closeBtn) closeBtn.onclick = closeLightbox;
  const lb = document.getElementById("lightbox");
  if (lb) lb.onclick = (e) => { if (e.target === lb) closeLightbox(); };
}
function openLightbox(id) {
  const photo = state.albumPhotos.find((p) => String(p.id) === String(id));
  if (!photo) return;
  document.getElementById("lightboxImg").src = photo.url;
  document.getElementById("lightboxAvatar").textContent = (photo.uploader || "?")[0];
  document.getElementById("lightboxUploader").textContent = photo.uploader;
  document.getElementById("lightboxCity").textContent = photo.city || "";
  document.getElementById("lightbox").classList.add("open");
}
function closeLightbox() { document.getElementById("lightbox").classList.remove("open"); }

/* ===================== 推薦 ===================== */
function tagPillHtml(tag) {
  const s = SPOT_TAG_STYLE[tag] || { emoji: "⭐", bg: "#f6efdf", fg: "#94897a" };
  return `<span class="tag-pill" style="background:${s.bg};color:${s.fg};">${s.emoji} ${tag}</span>`;
}
function renderGuide() {
  const spotCards = POPULAR_SPOTS.map((spot) => `
    <div class="spot-card">
      <div class="spot-card-head">
        <p class="spot-name">${spot.name}</p>
        <div class="tag-row">${spot.tags.map(tagPillHtml).join("")}</div>
      </div>
      <div class="spot-card-body">
        <p class="spot-photo-label">📷 地標實拍照</p>
        <div class="spot-photo-grid">
          ${spot.photos.map((url) => `
            <div class="photo-cell">
              <img src="${url}" loading="lazy" onload="this.parentElement.classList.add('loaded')" onerror="this.parentElement.classList.add('error')" />
              <div class="photo-placeholder">🖼️</div>
            </div>`).join("")}
        </div>
        <p class="photo-credit">照片來源：Wikimedia Commons（CC 授權）</p>
      </div>
    </div>`).join("");

  const cityAccordion = GUIDE.map((g, idx) => `
    <details class="card guide-city" ${idx === 0 ? "open" : ""}>
      <summary><span class="sparkle">✨</span><div><p class="guide-city-name">${g.city}</p><p class="guide-city-year">${g.year}</p></div></summary>
      <div class="guide-detail">
        <p class="guide-sub-title spot">📍 必訪景點</p>
        <ul class="guide-list">${g.spots.map((s) => `<li>◆ ${s}</li>`).join("")}</ul>
        <p class="guide-sub-title food">🍽️ 在地美食</p>
        <div class="tag-row">${g.food.map((f) => `<span class="food-tag">${f}</span>`).join("")}</div>
      </div>
    </details>`).join("");

  return `
    <p class="section-label">熱門景點打卡牆</p>
    ${spotCards}
    <p class="section-hint">世界三大菜系之一．依城市探索景點與在地美食</p>
    ${cityAccordion}`;
}

/* ===================== 清單 ===================== */
function renderChecklist() {
  const allCategories = [...CHECKLIST_CATEGORIES, ...state.customCategories];
  const total = state.checklistItems.length;
  const done = state.checklistItems.filter((i) => i.checked).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const catBlocks = allCategories.map((cat) => {
    const items = state.checklistItems.filter((i) => i.category === cat.id);
    if (!items.length) return "";
    return `
      <div class="card">
        <p class="checklist-cat-title" style="color:${cat.color}">${cat.icon} ${cat.label}
          <span class="checklist-cat-count">${items.filter((i) => i.checked).length}/${items.length}</span>
        </p>
        <ul class="checklist-list">
          ${items.map((item) => `
            <li class="checklist-item">
              <input type="checkbox" ${item.checked ? "checked" : ""} onchange="toggleChecklistItem('${item.id}')" />
              <span class="checklist-text ${item.checked ? "done" : ""}">${item.text}</span>
              <button class="checklist-delete" onclick="deleteChecklistItem('${item.id}')">🗑</button>
            </li>`).join("")}
        </ul>
      </div>`;
  }).join("");

  const catOptions = allCategories.map((c) => `<option value="${c.id}" ${state.checklistDraft.category === c.id ? "selected" : ""}>${c.label}</option>`).join("");

  return `
    <div class="card">
      <div class="checklist-progress-head"><p style="margin:0;">打包清單</p><span>${done} / ${total} 已完成</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
    </div>
    <div class="card">
      <div class="row">
        <input id="checklistInput" placeholder="輸入要帶的物品…" value="${state.checklistDraft.text}" oninput="state.checklistDraft.text=this.value" onkeydown="if(event.key==='Enter')addChecklistItem()" />
        <select onchange="state.checklistDraft.category=this.value">${catOptions}</select>
      </div>
      <button class="btn btn-primary" onclick="addChecklistItem()">＋ 新增項目</button>
      <div class="row checklist-add-category-row">
        <input id="newCategoryInput" placeholder="自訂新分類（例如：藥品）" onkeydown="if(event.key==='Enter')addCustomCategory()" />
        <button class="btn-add" onclick="addCustomCategory()">＋分類</button>
      </div>
    </div>
    ${catBlocks}`;
}
window.toggleChecklistItem = function (id) {
  state.checklistItems = state.checklistItems.map((i) => (String(i.id) === String(id) ? { ...i, checked: !i.checked } : i));
  saveJSON("trip-checklist", state.checklistItems); render();
};
window.deleteChecklistItem = function (id) {
  state.checklistItems = state.checklistItems.filter((i) => String(i.id) !== String(id));
  saveJSON("trip-checklist", state.checklistItems); render();
};
window.addChecklistItem = function () {
  const val = (state.checklistDraft.text || "").trim();
  if (!val) return;
  state.checklistItems.push({ id: Date.now() + "-" + Math.random().toString(36).slice(2, 6), text: val, category: state.checklistDraft.category, checked: false });
  state.checklistDraft.text = "";
  saveJSON("trip-checklist", state.checklistItems); render();
};
window.addCustomCategory = function () {
  const input = document.getElementById("newCategoryInput");
  const name = input.value.trim();
  if (!name) return;
  const exists = [...CHECKLIST_CATEGORIES, ...state.customCategories].some((c) => c.label === name);
  if (exists) { input.value = ""; return; }
  const idx = state.customCategories.length;
  const newCat = { id: "custom-" + Date.now(), label: name, icon: CATEGORY_ICON_POOL[idx % CATEGORY_ICON_POOL.length], color: CATEGORY_COLOR_POOL[idx % CATEGORY_COLOR_POOL.length] };
  state.customCategories.push(newCat);
  saveJSON("trip-checklist-categories", state.customCategories);
  state.checklistDraft.category = newCat.id;
  render();
};

/* ===================== 翻譯 API ===================== */
async function translateViaAPI(text, langPair) {
  try {
    const res = await fetchWithTimeout(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}&de=traveler@example.com`, 8000);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const result = data && data.responseData && data.responseData.translatedText;
    if (!result || /MYMEMORY WARNING/i.test(result)) return "（翻譯服務目前忙碌，請稍後再試，或使用下方常用短句）";
    return result;
  } catch (e) {
    console.error("翻譯失敗：", e);
    if (e.name === "AbortError") return "（翻譯逾時，請確認網路連線後再試一次）";
    return "（網路異常，無法翻譯，請確認網路連線後再試）";
  }
}
function speakText(text, langCode) {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = langCode;
  window.speechSynthesis.speak(u);
}
function mapMicError(err) {
  switch (err.name) {
    case "NotAllowedError": case "PermissionDeniedError": return "麥克風權限被拒絕。請至瀏覽器或系統設定允許存取麥克風後再試一次。";
    case "NotFoundError": case "DevicesNotFoundError": return "找不到可用的麥克風裝置，請確認裝置已連接麥克風。";
    case "NotReadableError": case "TrackStartError": return "麥克風目前被其他應用程式占用，請關閉相關程式後再試一次。";
    case "SecurityError": return "此頁面未使用安全連線（HTTPS），無法啟用麥克風。";
    default: return "無法啟動錄音功能，請稍後再試一次。";
  }
}

/* ===================== 拍照翻譯 ===================== */
function renderPhotoTranslate() {
  const pt = state.photoTranslate;
  if (!pt.photo) {
    return `
      <section class="card">
        <p class="tool-title" style="color:var(--terracotta)">📷 拍照翻譯</p>
        <button class="photo-upload-btn" id="photoTranslateBtn">
          <span class="photo-upload-icon">📷</span>
          <span>拍攝菜單、招牌或告示牌，立即翻譯成繁體中文</span>
        </button>
        <input type="file" id="photoTranslateInput" accept="image/*" capture="environment" style="display:none" />
      </section>`;
  }
  return `
    <section class="card">
      <div class="tool-title-row">
        <p class="tool-title" style="color:var(--terracotta)">📷 拍照翻譯</p>
        <button class="link-btn" onclick="resetPhotoTranslate()">↺ 重新拍攝</button>
      </div>
      <img class="photo-translate-preview" src="${pt.photo}" alt="拍攝的照片" />
      ${pt.status === "translating" ? `<div class="spinner-row"><span class="spinner"></span><p>翻譯中…</p></div>` : ""}
      ${pt.status === "done" && pt.result ? `
        <div class="result-card original">
          <p class="result-label">📄 原文（偵測為${pt.result.lang} ${pt.result.flag}）</p>
          <p class="result-text">${pt.result.original}</p>
        </div>
        <div class="result-card translated">
          <p class="result-label" style="color:var(--turquoise)">🌐 繁體中文翻譯結果</p>
          <p class="result-text">${pt.result.translated}</p>
        </div>` : ""}
    </section>`;
}
window.resetPhotoTranslate = function () { state.photoTranslate = { photo: null, status: "idle", result: null }; render(); };
function wirePhotoTranslateEvents() {
  const btn = document.getElementById("photoTranslateBtn");
  const input = document.getElementById("photoTranslateInput");
  if (btn) btn.onclick = () => input.click();
  if (input) input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.photoTranslate = { photo: reader.result, status: "translating", result: null };
      render();
      setTimeout(() => {
        state.photoTranslate.result = MOCK_PHOTO_RESULTS[Math.floor(Math.random() * MOCK_PHOTO_RESULTS.length)];
        state.photoTranslate.status = "done";
        render();
      }, 1800);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
}

/* ===================== 即時口語翻譯 ===================== */
function renderVoiceTranslate() {
  const vt = state.voiceTranslate;
  const source = vt.direction === "zh-tr" ? SPEECH_LANGS.zh : SPEECH_LANGS.tr;
  const target = vt.direction === "zh-tr" ? SPEECH_LANGS.tr : SPEECH_LANGS.zh;
  const err = vt.errorType ? ERROR_COPY[vt.errorType] : null;
  return `
    <section class="card dark">
      <div class="tool-title-row">
        <p class="tool-title gold">🎙️ 即時口語翻譯</p>
        <button class="lang-switch" onclick="toggleVoiceDirection()">${source.label} ⇄ ${target.label}</button>
      </div>
      <div class="mic-wrap">
        <button class="mic-btn ${vt.phase}" onclick="handleVoiceMicClick()">
          ${vt.phase === "requesting" || vt.phase === "processing" ? '<span class="spinner light"></span>' :
            vt.phase === "listening" ? '<span class="wave-bars"><span></span><span></span><span></span><span></span><span></span></span>' :
            vt.phase === "error" ? "🚫" : "🎤"}
        </button>
        <p class="mic-hint">
          ${vt.phase === "idle" ? `按一下，說出${source.label}` : ""}
          ${vt.phase === "requesting" ? "請求麥克風權限中…" : ""}
          ${vt.phase === "listening" ? "聆聽中，說完會自動翻譯…（再按一次可提早結束）" : ""}
          ${vt.phase === "processing" ? "翻譯中…" : ""}
          ${vt.phase === "error" ? "點麥克風圖示可重新嘗試" : ""}
        </p>
      </div>
      ${err ? `<div class="error-banner"><p class="error-title">${err.title}</p><p class="error-tip">${err.tip}</p></div>` : ""}
      ${(vt.transcript || vt.translated) ? `
        <div class="voice-result">
          <div class="voice-line"><p class="voice-label">你說（${source.label}）</p><p class="voice-text">${vt.transcript}</p></div>
          <div class="voice-line highlight">
            <p class="voice-label gold">翻譯結果（${target.label}）</p><p class="voice-text">${vt.translated}</p>
            ${vt.translated ? `<button class="speak-btn" id="voiceSpeakBtn">🔊</button>` : ""}
          </div>
        </div>` : ""}
      <p class="sandbox-hint">提示：手機瀏覽器（尤其 iOS Safari）可能不支援語音辨識；若無反應請改用下方文字翻譯。</p>
    </section>`;
}
window.toggleVoiceDirection = function () {
  const vt = state.voiceTranslate;
  vt.direction = vt.direction === "zh-tr" ? "tr-zh" : "zh-tr";
  vt.transcript = ""; vt.translated = ""; vt.phase = "idle"; vt.errorType = null;
  render();
};
window.handleVoiceMicClick = function () {
  if (state.voiceTranslate.phase === "listening") { stopVoiceListening(); return; }
  startVoiceListening();
};
async function startVoiceListening() {
  const vt = state.voiceTranslate;
  vt.transcript = ""; vt.translated = ""; vt.errorType = null;
  if (!window.isSecureContext) { vt.phase = "error"; vt.errorType = "insecure-context"; render(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { vt.phase = "error"; vt.errorType = "not-supported"; render(); return; }
  vt.phase = "requesting"; render();
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch (err) {
    vt.phase = "error";
    vt.errorType = err.name === "NotAllowedError" || err.name === "PermissionDeniedError" ? "permission-denied"
      : err.name === "NotFoundError" || err.name === "DevicesNotFoundError" ? "no-mic" : "unknown";
    render(); return;
  }
  stream.getTracks().forEach((t) => t.stop());
  const source = vt.direction === "zh-tr" ? SPEECH_LANGS.zh : SPEECH_LANGS.tr;
  const target = vt.direction === "zh-tr" ? SPEECH_LANGS.tr : SPEECH_LANGS.zh;
  const langPair = vt.direction === "zh-tr" ? "zh-TW|tr" : "tr|zh-TW";
  const recognition = new SR();
  recognition.lang = source.code; recognition.interimResults = false; recognition.maxAlternatives = 1;
  recognition.onstart = () => { vt.phase = "listening"; render(); };
  recognition.onerror = (e) => {
    vt.phase = "error";
    vt.errorType = e.error === "not-allowed" || e.error === "service-not-allowed" ? "permission-denied"
      : e.error === "no-speech" ? "no-speech" : e.error === "audio-capture" ? "no-mic"
      : e.error === "network" ? "network" : "unknown";
    render();
  };
  recognition.onresult = async (e) => {
    const text = e.results[0][0].transcript;
    vt.transcript = text; vt.phase = "processing"; render();
    const result = await translateViaAPI(text, langPair);
    vt.translated = result; vt.phase = "idle"; render();
    speakText(result, target.code);
  };
  recognition.onend = () => { if (vt.phase === "listening") { vt.phase = "idle"; render(); } };
  voiceRecognition = recognition;
  recognition.start();
}
function stopVoiceListening() { if (voiceRecognition) voiceRecognition.stop(); }

/* ===================== 錄音備忘 ===================== */
function renderVoiceMemo() {
  const vm = state.voiceMemo;
  return `
    <section class="card">
      <p class="tool-title" style="color:var(--turquoise)">🎙️ 錄音備忘（例如錄下導遊解說，之後回放）</p>
      <div class="mic-wrap small">
        <button class="mic-btn small ${vm.recState}" onclick="handleVoiceMemoClick()">
          ${vm.recState === "recording" ? '<span class="wave-bars"><span></span><span></span><span></span><span></span><span></span></span>' : vm.recState === "error" ? "🚫" : "🎤"}
        </button>
        <p class="mic-hint">
          ${vm.recState === "idle" ? "按下開始錄音" : ""}
          ${vm.recState === "recording" ? `錄音中… ${formatSeconds(vm.seconds)}（再按一次停止）` : ""}
          ${vm.recState === "recorded" ? "錄音完成" : ""}
          ${vm.recState === "error" ? "點麥克風重試" : ""}
        </p>
      </div>
      ${vm.recState === "error" && vm.errorMsg ? `<div class="error-banner light"><p class="error-title">無法使用麥克風</p><p class="error-tip">${vm.errorMsg}</p></div>` : ""}
      ${vm.recState === "recorded" && vm.audioURL ? `
        <audio controls src="${vm.audioURL}" style="width:100%;margin-top:10px;"></audio>
        <button class="link-btn" onclick="resetVoiceMemo()">↺ 重新錄音</button>` : ""}
    </section>`;
}
function formatSeconds(s) { const m = String(Math.floor(s / 60)).padStart(2, "0"); const ss = String(s % 60).padStart(2, "0"); return `${m}:${ss}`; }
window.handleVoiceMemoClick = function () {
  if (state.voiceMemo.recState === "recording") { stopVoiceMemo(); return; }
  startVoiceMemo();
};
async function startVoiceMemo() {
  const vm = state.voiceMemo; vm.errorMsg = ""; vm.audioURL = null;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    voiceMemoStream = stream;
    const recorder = new MediaRecorder(stream);
    voiceMemoRecorder = recorder; voiceMemoChunks = [];
    recorder.ondataavailable = (e) => { if (e.data.size > 0) voiceMemoChunks.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(voiceMemoChunks, { type: "audio/webm" });
      vm.audioURL = URL.createObjectURL(blob); vm.recState = "recorded";
      voiceMemoStream.getTracks().forEach((t) => t.stop());
      clearInterval(voiceMemoTimer); render();
    };
    recorder.start(); vm.recState = "recording"; vm.seconds = 0; render();
    voiceMemoTimer = setInterval(() => { vm.seconds++; render(); }, 1000);
  } catch (err) { vm.errorMsg = mapMicError(err); vm.recState = "error"; render(); }
}
function stopVoiceMemo() { if (voiceMemoRecorder) voiceMemoRecorder.stop(); }
window.resetVoiceMemo = function () { state.voiceMemo = { recState: "idle", errorMsg: "", audioURL: null, seconds: 0 }; render(); };

/* ===================== 文字翻譯／常用短句 ===================== */
function renderTextTranslate() {
  const tt = state.textTranslate;
  const historyHtml = tt.history.map((h) => `
    <div class="text-history-item">
      <p class="history-zh">${h.zh}</p><p class="history-tr">${h.tr}</p>
      ${h.pron ? `<p class="history-pron">發音參考：${h.pron}</p>` : ""}
    </div>`).join("");
  return `
    <section class="card">
      <p class="tool-title" style="color:var(--turquoise)">🌐 文字翻譯（中文 → 土耳其語）</p>
      <div class="row">
        <input id="textTranslateInput" placeholder="輸入想說的中文…" value="${tt.input}" oninput="state.textTranslate.input=this.value" onkeydown="if(event.key==='Enter')submitTextTranslate()" />
        <button class="btn-add" onclick="submitTextTranslate()">➤</button>
      </div>
      ${tt.loading ? '<p class="loading-hint">翻譯中…</p>' : ""}
      <div class="text-history">${historyHtml}</div>
    </section>
    <section class="card">
      <p class="tool-title" style="color:var(--turquoise)">常用短句（點一下直接翻譯）</p>
      <div class="phrase-grid">
        ${PHRASES.map((p, i) => `
          <button class="phrase-card" onclick="translatePhrase(${i})">
            <p class="phrase-zh">${p.zh}</p><p class="phrase-tr">${p.tr}</p><p class="phrase-pron">${p.pron}</p>
          </button>`).join("")}
      </div>
    </section>`;
}
window.submitTextTranslate = async function () {
  const tt = state.textTranslate; const text = (tt.input || "").trim();
  if (!text) return;
  tt.loading = true; render();
  const localHit = PHRASES.find((p) => p.zh === text);
  const result = await translateViaAPI(text, "zh-TW|tr");
  tt.history.unshift({ zh: text, tr: result, pron: localHit ? localHit.pron : undefined });
  tt.loading = false; tt.input = ""; render();
};
window.translatePhrase = function (i) {
  const p = PHRASES[i];
  state.textTranslate.history.unshift({ zh: p.zh, tr: p.tr, pron: p.pron });
  render();
};

/* ===================== 匯率換算 ===================== */
function currencyRowsHTML() {
  const amountUSD = (parseFloat(state.amount) || 0) / (state.rates[state.base] || 1);
  return CURRENCIES.filter((c) => c !== state.base).map((c) => {
    const value = amountUSD * (state.rates[c] || 0);
    const meta = CURRENCY_META[c];
    const formatted = value.toLocaleString("en-US", { minimumFractionDigits: meta.decimals, maximumFractionDigits: meta.decimals });
    return `<button class="currency-row" onclick="switchBase('${c}', ${value})"><span class="currency-left"><span class="code">${c}</span>${meta.name}</span><span class="currency-val">${meta.symbol} ${formatted}</span></button>`;
  }).join("");
}
function updateCurrencyRows() {
  const container = document.getElementById("currencyRows");
  if (container) container.innerHTML = currencyRowsHTML();
}
function renderCurrencySection() {
  const options = CURRENCIES.map((c) => `<option value="${c}" ${state.base === c ? "selected" : ""}>${c}</option>`).join("");
  return `
    <div class="card">
      <h2>💱 匯率換算 <span class="rate-badge ${state.rateSource === "live" ? "live" : ""}">${state.rateLoading ? "更新中…" : state.rateSource === "live" ? "即時匯率" : "離線估算匯率"}</span></h2>
      <div class="row">
        <input id="currencyAmountInput" type="text" inputmode="decimal" value="${state.amount}" oninput="state.amount=this.value; updateCurrencyRows();" placeholder="輸入金額" />
        <select onchange="state.base=this.value; render();">${options}</select>
      </div>
      <div id="currencyRows">${currencyRowsHTML()}</div>
      <div class="rate-meta-row">
        <span class="rate-updated">${state.rateUpdatedAt ? "最後更新：" + state.rateUpdatedAt : "尚未取得即時匯率"}</span>
        <button class="refresh-btn" onclick="fetchLiveRates()">🔄 重新整理匯率</button>
      </div>
      <p style="font-size:10px;color:#94897a;margin-top:6px;">點任一貨幣可切換為輸入基準。匯率僅供參考，實際請以當地兌換或刷卡當下匯率為準。</p>
    </div>`;
}
window.switchBase = function (code, value) {
  state.base = code;
  state.amount = value > 0 ? value.toFixed(CURRENCY_META[code].decimals) : "0";
  render();
};
window.fetchLiveRates = async function () {
  state.rateLoading = true;
  if (state.tab === "tools") render();
  try {
    const res = await fetchWithTimeout(RATE_API_URL, 8000);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data && data.result === "success" && data.rates) {
      const merged = { ...MOCK_RATES_USD_BASE };
      CURRENCIES.forEach((c) => { if (data.rates[c]) merged[c] = data.rates[c]; });
      state.rates = merged; state.rateSource = "live";
      state.rateUpdatedAt = new Date().toLocaleString("zh-TW", { hour12: false });
    }
  } catch (e) { console.error("匯率 API 讀取失敗，維持離線估算匯率：", e); }
  finally { state.rateLoading = false; if (state.tab === "tools") render(); }
};

/* ===================== 工具分頁組合 ===================== */
function renderTools() {
  return renderPhotoTranslate() + renderVoiceTranslate() + renderVoiceMemo() + renderTextTranslate() + renderCurrencySection();
}
function wireToolsEvents() {
  wirePhotoTranslateEvents();
  const speakBtn = document.getElementById("voiceSpeakBtn");
  if (speakBtn) speakBtn.onclick = () => {
    const vt = state.voiceTranslate;
    const target = vt.direction === "zh-tr" ? SPEECH_LANGS.tr : SPEECH_LANGS.zh;
    speakText(vt.translated, target.code);
  };
}

/* ===================== 須知 ===================== */
function renderNotes() {
  return NOTES.map((n) => `
    <div class="card">
      <h2 style="color:var(--terracotta);">${n.icon} ${n.title}</h2>
      <ul class="note-list">${n.items.map((i) => `<li>${i}</li>`).join("")}</ul>
    </div>`).join("");
}

/* ===================== 啟動 ===================== */
render();
fetchLiveRates();
fetchWeather();
