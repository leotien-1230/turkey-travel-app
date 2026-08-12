const CACHE_NAME = "turkey-travel-v2";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://unpkg.com",
  "https://unpkg.com",
  "https://githubusercontent.com",
  "https://githubusercontent.com"
];

// 安裝並快取基礎靜態資源
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 激活並清理舊快取
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 智慧快取策略：網路優先，失敗時自動啟用本地快取 (針對天氣與地圖十分重要)
self.addEventListener("fetch", (e) => {
  // 忽略外站非 GET 請求或特殊 scheme
  if (e.request.method !== "GET" || !e.request.url.startsWith('http')) return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // 拿到最新網路資料，順手拷貝一份進快取 (包含 OSM 地圖圖磚)
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, resClone);
        });
        return response;
      })
      .catch(() => {
        // 斷網漫遊時，直接從快取無縫讀取地圖或網頁資料
        return caches.match(e.request);
      })
  );
});
