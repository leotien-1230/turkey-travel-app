/* ===================== 資料 ===================== */
const ITINERARY = [
  { day: 1, date: "8/14 (五)", city: "台北 → 伊斯坦堡", transport: "TK025 ‧ 21:45 桃園起飛 → 隔日 05:10 抵伊斯坦堡", meals: ["－", "－", "機上精緻簡餐"], hotel: "夜宿機上" },
  { day: 2, date: "8/15 (六)", city: "伊斯坦堡 → 番紅花城", transport: "巴士 ‧ 約 410 公里／4 小時 20 分", meals: ["機上簡餐", "土式風味料理", "傳統民宿套餐"], hotel: "ZALIFRE HOTEL" },
  { day: 3, date: "8/16 (日)", city: "番紅花城 → 安卡拉 → 卡帕多奇亞", transport: "巴士 ‧ 約 555 公里（含旋轉舞表演）", meals: ["旅館早餐", "土式風味料理", "旅館自助餐"], hotel: "EXEDRA HOTEL CAPPADOCIA" },
  { day: 4, date: "8/17 (一)", city: "卡帕多奇亞全日遊", transport: "市區接駁（果里美博物館／地下城）", meals: ["旅館早餐", "窯甕風味料理", "旅館自助餐"], hotel: "EXEDRA HOTEL CAPPADOCIA" },
  { day: 5, date: "8/18 (二)", city: "卡帕多奇亞 → 孔亞 → 巴穆嘉麗", transport: "巴士 ‧ 約 640 公里", meals: ["旅館早餐", "土式鐵板＋披薩", "旅館自助餐"], hotel: "PAM THERMAL HOTEL" },
  { day: 6, date: "8/19 (三)", city: "巴穆嘉麗（棉堡）→ 庫薩達西", transport: "巴士 ‧ 約 200 公里", meals: ["旅館早餐", "土耳其風味料理", "旅館自助餐"], hotel: "QLUSIVE HOTEL" },
  { day: 7, date: "8/20 (四)", city: "庫薩達西 → 以弗所 → 布爾薩", transport: "巴士 ‧ 約 420 公里", meals: ["旅館早餐", "土耳其風味料理", "旅館自助餐"], hotel: "ALMIRA HOTEL THERMAL SPA" },
  { day: 8, date: "8/21 (五)", city: "布爾薩 → 伊斯坦堡", transport: "巴士 ‧ 約 165 公里（博斯普魯斯遊船）", meals: ["旅館早餐", "土耳其風味料理", "方便逛街．自理"], hotel: "RAMADA PLAZA BY WYNDHAM" },
  { day: 9, date: "8/22 (六)", city: "伊斯坦堡市區", transport: "市區行程（藍色清真寺／大市集）", meals: ["旅館早餐", "中式 7 菜 1 湯", "舊城區經典漢堡餐"], hotel: "當晚前往機場" },
  { day: 10, date: "8/23 (日)", city: "伊斯坦堡 → 台北", transport: "TK024 ‧ 01:30 伊斯坦堡 → 17:55 桃園", meals: ["機上簡餐", "機上簡餐", "－"], hotel: "抵達溫暖的家" },
];

const CURRENCY_META = {
  TWD: { name: "新台幣", symbol: "NT$", decimals: 0 },
  USD: { name: "美元", symbol: "$", decimals: 2 },
  JPY: { name: "日圓", symbol: "¥", decimals: 0 },
  KRW: { name: "韓元", symbol: "₩", decimals: 0 },
  EUR: { name: "歐元", symbol: "€", decimals: 2 },
  THB: { name: "泰銖", symbol: "฿", decimals: 2 },
  TRY: { name: "土耳其里拉", symbol: "₺", decimals: 2 },
};
const CURRENCIES = Object.keys(CURRENCY_META);
const MOCK_RATES_USD_BASE = { USD: 1, TWD: 32.5, JPY: 155.2, KRW: 1380, EUR: 0.92, THB: 36.8, TRY: 44 };
const RATE_API_URL = "https://open.er-api.com/v6/latest/USD"; // 🔌 免金鑰即時匯率端點，之後可換成自己的服務

const NOTES = [
  { title: "各地天氣", icon: "🌡️", items: ["伊斯坦堡 23–32°C／番紅花城 18–31°C／卡帕多奇亞 17–30°C", "棉堡（巴穆嘉麗）最熱 23–37°C，早晚溫差大", "建議洋蔥式穿搭，帶一件薄外套"] },
  { title: "穿著提醒", icon: "👕", items: ["風俗較保守，避免緊身、暴露服裝", "參觀清真寺需脫鞋；女性需頭巾、長袖、長褲或長裙", "棉堡石灰棚僅能赤腳，建議帶拖鞋", "溫泉飯店可自備泳衣泡湯"] },
  { title: "飲食須知", icon: "🍽️", items: ["主食以麵包為主，肉類以牛雞為主", "不要飲用自來水，請購買瓶裝水", "腸胃敏感者建議攜帶腸胃藥與電解質粉", "素食選擇少，建議自備罐頭"] },
  { title: "住宿須知", icon: "🏨", items: ["多數飯店不提供牙刷、牙膏、拖鞋", "電壓 220V 雙圓孔歐規，記得帶轉接頭", "部分洞穴／民宿飯店無空調"] },
  { title: "money 匯兌", icon: "💰", items: ["當地可用歐元、美金、里拉", "建議準備 700–800 美金換匯", "美金需攜帶新版鈔票，避免收 50 美金面額", "每日房間小費約 1 美元／房"] },
];

/* ===================== 狀態與儲存 ===================== */
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("讀取 localStorage 失敗：", e);
    return fallback;
  }
}
function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("寫入 localStorage 失敗：", e);
  }
}

const state = {
  tab: "itinerary",
  members: loadJSON("trip-members", ["我", "同伴A", "同伴B"]),
  expenses: loadJSON("trip-expenses", []),
  rates: MOCK_RATES_USD_BASE,
  rateSource: "mock",
  amount: 1000,
  base: "TWD",
  expenseDraft: { desc: "", amount: "", paidBy: null, split: [] },
};
state.expenseDraft.paidBy = state.members[0];
state.expenseDraft.split = [...state.members];

/* ===================== 切換分頁 ===================== */
document.getElementById("bottomNav").addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;
  state.tab = btn.dataset.tab;
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b === btn));
  render();
});

/* ===================== 渲染 ===================== */
function render() {
  const el = document.getElementById("content");
  if (state.tab === "itinerary") el.innerHTML = renderItinerary();
  if (state.tab === "expense") el.innerHTML = renderExpense();
  if (state.tab === "currency") el.innerHTML = renderCurrency();
  if (state.tab === "notes") el.innerHTML = renderNotes();
}

/* ---------- 行程 ---------- */
function renderItinerary() {
  return ITINERARY.map(
    (d) => `
    <details class="card day-card" ${d.day === 1 ? "open" : ""}>
      <summary>
        <div class="day-badge"><span>DAY</span><b>${d.day}</b></div>
        <div class="day-meta">
          <p class="date">${d.date}</p>
          <p class="city">${d.city}</p>
        </div>
      </summary>
      <div class="day-detail">
        <p>🚌 ${d.transport}</p>
        <p>🏨 ${d.hotel}</p>
        <div class="meals">
          <span class="meal-chip">早：${d.meals[0]}</span>
          <span class="meal-chip">午：${d.meals[1]}</span>
          <span class="meal-chip">晚：${d.meals[2]}</span>
        </div>
      </div>
    </details>`
  ).join("");
}

/* ---------- 記帳 ---------- */
function renderExpense() {
  const d = state.expenseDraft;
  const membersHtml = state.members
    .map((m) => `<span class="chip">${m}<button onclick="removeMember('${m}')">✕</button></span>`)
    .join("");
  const splitHtml = state.members
    .map((m) => `<button class="chip split ${d.split.includes(m) ? "active" : ""}" onclick="toggleSplit('${m}')">${m}</button>`)
    .join("");
  const paidByOptions = state.members.map((m) => `<option value="${m}" ${d.paidBy === m ? "selected" : ""}>${m}</option>`).join("");

  const total = state.expenses.reduce((s, e) => s + e.amount, 0);
  const listHtml = state.expenses
    .map(
      (e) => `
      <div class="expense-item">
        <div>
          <div>${e.desc}</div>
          <p class="meta">${e.paidBy} 代墊 ‧ ${e.split.length} 人均分</p>
        </div>
        <div style="display:flex;align-items:center;">
          <span class="amt">${e.amount.toLocaleString()}</span>
          <button onclick="deleteExpense(${e.id})">🗑</button>
        </div>
      </div>`
    )
    .join("");

  const balances = computeBalances();

  return `
    <div class="card">
      <h2>👥 同行夥伴</h2>
      <div class="chip-row">${membersHtml}</div>
      <div class="row">
        <input id="newMemberInput" placeholder="新增夥伴名字" onkeydown="if(event.key==='Enter')addMember()" />
        <button class="btn btn-add" onclick="addMember()">＋</button>
      </div>
    </div>

    <div class="card">
      <h2>➕ 新增支出</h2>
      <input id="descInput" placeholder="項目（例如：晚餐／計程車）" value="${d.desc}" oninput="state.expenseDraft.desc=this.value" style="margin-bottom:8px;" />
      <div class="row">
        <input id="amountInput" type="number" placeholder="金額" value="${d.amount}" oninput="state.expenseDraft.amount=this.value" />
        <select onchange="state.expenseDraft.paidBy=this.value">${paidByOptions}</select>
      </div>
      <p style="font-size:11px;color:#94897a;margin:4px 0;">由誰均分？</p>
      <div class="chip-row">${splitHtml}</div>
      <button class="btn btn-primary" onclick="addExpense()">加入這筆支出</button>
    </div>

    ${state.expenses.length ? `<div class="card"><h2>📋 支出紀錄（共計 ${total.toLocaleString()}）</h2>${listHtml}</div>` : ""}

    ${
      state.expenses.length
        ? `<div class="card balance-card">
        <h2 style="color:#C79A3C;">🔁 分帳結果</h2>
        ${Object.entries(balances.net)
          .map(
            ([m, v]) =>
              `<div class="balance-row"><span>${m}</span><span class="${v >= 0 ? "balance-pos" : "balance-neg"}">${v >= 0 ? "應收回 " : "應支付 "}${Math.abs(v).toFixed(0)} 元</span></div>`
          )
          .join("")}
        ${
          balances.settlements.length
            ? balances.settlements.map((s) => `<div class="settle-row">💰 ${s.from} 付給 ${s.to}<span class="amt">${s.amt.toFixed(0)} 元</span></div>`).join("")
            : `<p style="font-size:12px;color:rgba(255,255,255,0.5);">目前帳務已平衡 🎉</p>`
        }
      </div>`
        : ""
    }
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
  const settlements = [];
  let i = 0, j = 0;
  while (i < creditors.length && j < debtors.length) {
    const pay = Math.min(creditors[i].v, debtors[j].v);
    settlements.push({ from: debtors[j].n, to: creditors[i].n, amt: pay });
    creditors[i].v -= pay; debtors[j].v -= pay;
    if (creditors[i].v < 0.5) i++;
    if (debtors[j].v < 0.5) j++;
  }
  return { net, settlements };
}

window.addMember = function () {
  const input = document.getElementById("newMemberInput");
  const name = input.value.trim();
  if (!name || state.members.includes(name)) return;
  state.members.push(name);
  state.expenseDraft.split.push(name);
  saveJSON("trip-members", state.members);
  render();
};
window.removeMember = function (name) {
  state.members = state.members.filter((m) => m !== name);
  state.expenseDraft.split = state.expenseDraft.split.filter((m) => m !== name);
  if (state.expenseDraft.paidBy === name) state.expenseDraft.paidBy = state.members[0];
  saveJSON("trip-members", state.members);
  render();
};
window.toggleSplit = function (name) {
  const s = state.expenseDraft.split;
  state.expenseDraft.split = s.includes(name) ? s.filter((m) => m !== name) : [...s, name];
  render();
};
window.addExpense = function () {
  const d = state.expenseDraft;
  const amt = parseFloat(d.amount);
  if (!d.desc.trim() || !amt || amt <= 0 || d.split.length === 0) return;
  state.expenses.unshift({ id: Date.now(), desc: d.desc.trim(), amount: amt, paidBy: d.paidBy, split: [...d.split] });
  saveJSON("trip-expenses", state.expenses);
  state.expenseDraft.desc = "";
  state.expenseDraft.amount = "";
  render();
};
window.deleteExpense = function (id) {
  state.expenses = state.expenses.filter((e) => e.id !== id);
  saveJSON("trip-expenses", state.expenses);
  render();
};

/* ---------- 匯率 ---------- */
function renderCurrency() {
  const amountUSD = (parseFloat(state.amount) || 0) / (state.rates[state.base] || 1);
  const rows = CURRENCIES.filter((c) => c !== state.base)
    .map((c) => {
      const value = amountUSD * (state.rates[c] || 0);
      const meta = CURRENCY_META[c];
      const formatted = value.toLocaleString("en-US", { minimumFractionDigits: meta.decimals, maximumFractionDigits: meta.decimals });
      return `
        <button class="currency-row" onclick="switchBase('${c}', ${value})">
          <span class="currency-left"><span class="code">${c}</span>${meta.name}</span>
          <span class="currency-val">${meta.symbol} ${formatted}</span>
        </button>`;
    })
    .join("");

  const options = CURRENCIES.map((c) => `<option value="${c}" ${state.base === c ? "selected" : ""}>${c}</option>`).join("");

  return `
    <div class="card">
      <h2>💱 匯率換算 <span class="rate-badge ${state.rateSource === "live" ? "live" : ""}" style="margin-left:auto;">${state.rateSource === "live" ? "即時匯率" : "離線估算匯率"}</span></h2>
      <div class="row">
        <input type="number" value="${state.amount}" oninput="state.amount=this.value; render();" placeholder="輸入金額" />
        <select onchange="state.base=this.value; render();">${options}</select>
      </div>
      ${rows}
      <p style="font-size:10px;color:#94897a;margin-top:8px;">點任一貨幣可切換為輸入基準。匯率僅供參考，實際請以當地兌換或刷卡當下匯率為準。</p>
    </div>
  `;
}
window.switchBase = function (code, value) {
  state.base = code;
  state.amount = value > 0 ? value.toFixed(CURRENCY_META[code].decimals) : "0";
  render();
};

async function fetchLiveRates() {
  try {
    const res = await fetch(RATE_API_URL);
    const data = await res.json();
    if (data && data.result === "success" && data.rates) {
      const merged = { ...MOCK_RATES_USD_BASE };
      CURRENCIES.forEach((c) => { if (data.rates[c]) merged[c] = data.rates[c]; });
      state.rates = merged;
      state.rateSource = "live";
      if (state.tab === "currency") render();
    }
  } catch (e) {
    console.error("匯率 API 讀取失敗，維持離線估算匯率：", e);
  }
}

/* ---------- 須知 ---------- */
function renderNotes() {
  return NOTES.map(
    (n) => `
    <div class="card">
      <h2 style="color:var(--terracotta);">${n.icon} ${n.title}</h2>
      <ul class="note-list">${n.items.map((i) => `<li>${i}</li>`).join("")}</ul>
    </div>`
  ).join("");
}

/* ===================== 啟動 ===================== */
render();
fetchLiveRates();
