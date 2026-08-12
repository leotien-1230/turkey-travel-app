// 全域視覺樣式常數
const C = { turquoise: "#12857F", terracotta: "#C1442D", gold: "#C79A3C" };

// 2026年8月最新市場基準 Fallback 匯率（美金基準）
const FALLBACK_RATES = { USD: 1, TWD: 32.22, TRY: 47.75, EUR: 0.92 };

// 土耳其景點地標經緯度數據
const MARKERS = [
  { name: "卡帕多奇亞熱氣球", lat: 38.6455, lng: 34.8393, desc: "世界頂級熱氣球聖地，奇岩怪石環繞。" },
  { name: "棉堡 Pamukkale", lat: 37.9258, lng: 29.1174, desc: "石灰岩地形形成的純白溫泉階梯梯田。" },
  { name: "藍色清真寺", lat: 41.0054, lng: 28.9768, desc: "蘇丹艾哈邁德清真寺，經典伊斯蘭建築結晶。" }
];

let mapObj = null;
let userMarker = null;
let currentRates = { ...FALLBACK_RATES };

// 初始化地圖與元件
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons(); // 初始化圖標
  initMap();
  fetchCappaWeather();
  fetchLiveRates();
  initConverter();
  initTranslator();
  
  // 監聽網路連線狀況
  window.addEventListener('online', () => updateOnlineStatus(true));
  window.addEventListener('offline', () => updateOnlineStatus(false));
});

function updateOnlineStatus(isOnline) {
  const badge = document.getElementById("connection-badge");
  if (isOnline) {
    badge.className = "text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400";
    badge.innerText = "🟢 連線中";
  } else {
    badge.className = "text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400";
    badge.innerText = "🔴 離線模式";
  }
}

// 1. 地圖建置
function initMap() {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  mapObj = L.map(mapContainer, { center: [38.9, 32.6], zoom: 6, zoomControl: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapObj);

  MARKERS.forEach(m => {
    L.marker([m.lat, m.lng]).addTo(mapObj)
     .bindPopup(`<b style="color:${C.turquoise}">${m.name}</b><p style="font-size:11px;margin-top:2px;">${m.desc}</p>`);
  });

  // 全螢幕切換
  document.getElementById("btn-fullscreen").addEventListener("click", () => {
    const wrapper = document.getElementById("map-wrapper");
    wrapper.classList.toggle("fullscreen-map-mode");
    setTimeout(() => { mapObj.invalidateSize(); }, 300);
  });

  // GPS 實時定位
  document.getElementById("btn-gps").addEventListener("click", () => {
    if (!navigator.geolocation) return alert("裝置不支援 GPS");
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      if (userMarker) mapObj.removeLayer(userMarker);
      userMarker = L.circleMarker([latitude, longitude], { color: '#1E88E5', radius: 8, fillOpacity: 0.8 }).addTo(mapObj);
      mapObj.setView([latitude, longitude], 14);
      userMarker.bindPopup("<b>您目前的位置</b>").openPopup();
    }, () => alert("無法取得 GPS 訊號，請檢查權限設定"));
  });
}

// 2. 熱氣球天氣連動
async function fetchCappaWeather() {
  const alertEl = document.getElementById("balloon-alert");
  const titleEl = document.getElementById("balloon-title");
  const descEl = document.getElementById("balloon-desc");
  
  try {
    const res = await fetch("https://open-meteo.com");
    const data = await res.json();
    if (data?.current) {
      const wind = Math.round(data.current.wind_speed_10m);
      alertEl.classList.remove("hidden");
      if (wind >= 15) {
        alertEl.className = "rounded-xl p-3 border bg-rose-50 border-rose-300 text-rose-800";
        titleEl.innerText = `🛑 停飛風險高 (風速 ${wind} km/h)`;
        descEl.innerText = "風速已達或超過民航局停飛臨界點，請與導遊密切核對當天晨間行程。";
      } else {
        alertEl.className = "rounded-xl p-3 border bg-emerald-50 border-emerald-300 text-emerald-800";
        titleEl.innerText = `🍏 氣候良好適宜 (風速 ${wind} km/h)`;
        descEl.innerText = "目前風速極度平穩，非常適合熱氣球飛行升空！高空寒冷請記得備妥保暖大衣。";
      }
    }
  } catch (e) {
    alertEl.classList.add("hidden");
  }
}

// 3. 匯率整合控制
async function fetchLiveRates() {
  try {
    const res = await fetch("https://er-api.com");
    const data = await res.json();
    if (data?.rates) {
      currentRates = { ...FALLBACK_RATES, ...data.rates };
      document.getElementById("btn-refresh-rates").innerText = "🍏 匯率已同步";
      renderRates();
    }
  } catch (e) {
    renderRates();
  }
}

function renderRates() {
  const inputVal = parseFloat(document.getElementById("currency-input").value) || 0;
  const base = document.getElementById("currency-base").value;
  const listEl = document.getElementById("currency-list");
  listEl.innerHTML = "";

  const amountInUSD = inputVal / currentRates[base];
  const targetCurrencies = ["TWD", "TRY", "USD", "EUR"].filter(c => c !== base);

  targetCurrencies.forEach(c => {
    const convertedValue = (amountInUSD * currentRates[c]).toFixed(c === "TWD" ? 0 : 2);
    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-[#faf7f2] px-3 py-2 rounded-xl text-xs";
    item.innerHTML = `
      <span class="font-medium text-slate-600">${c === "TRY" ? "₺ 土耳其里拉" : c === "TWD" ? "NT$ 新台幣" : c}</span>
      <span class="font-mono font-bold text-[#C1442D] text-sm">${convertedValue}</span>
    `;
    listEl.appendChild(item);
  });
}

function initConverter() {
  document.getElementById("currency-input").addEventListener("input", renderRates);
  document.getElementById("currency-base").addEventListener("change", renderRates);
  document.getElementById("btn-refresh-rates").addEventListener("click", fetchLiveRates);
}

// 4. 雙向應急翻譯核心
function initTranslator() {
  let direction = "zh-tr";
  const btnToggle = document.getElementById("btn-toggle-lang");
  const srcLabel = document.getElementById("lang-src");
  const tgtLabel = document.getElementById("lang-tgt");

  btnToggle.addEventListener("click", () => {
    direction = direction === "zh-tr" ? "tr-zh" : "zh-tr";
    srcLabel.innerText = direction === "zh-tr" ? "中文" : "土耳其文";
    tgtLabel.innerText = direction === "zh-tr" ? "土耳其文" : "中文";
  });

  document.getElementById("btn-translate").addEventListener("click", async () => {
    const input = document.getElementById("translate-input").value.trim();
    if (!input) return;

    const pair = direction === "zh-tr" ? "zh-TW|tr" : "tr|zh-TW";
    try {
      const res = await fetch(`https://translated.net{encodeURIComponent(input)}&langpair=${pair}`);
      const data = await res.json();
      const output = data?.responseData?.translatedText || "翻譯失敗";
      
      document.getElementById("translate-result-box").classList.remove("hidden");
      document.getElementById("translate-orig").innerText = input;
      document.getElementById("translate-out").innerText = output;
    } catch (e) {
      alert("網路連線不穩，建議點選常用短句查看");
    }
  });

  document.getElementById("btn-speak").addEventListener("click", () => {
    const text = document.getElementById("translate-out").innerText;
    if (!text || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = direction === "zh-tr" ? "tr-TR" : "zh-TW";
    window.speechSynthesis.speak(u);
  });
}

