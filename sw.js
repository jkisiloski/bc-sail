// BC Sail service worker: app shell cache-first, data network-first with offline fallback.
const V = "bcsail-v7";
const SHELL = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",
  "https://cdn.jsdelivr.net/npm/geotiff@2.1.3/dist-browser/geotiff.js"];
const LIMITS = {"bcsail-tiles": 600, "bcsail-model": 150, "bcsail-data": 200};

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("bcsail-v") && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

async function trim(name){
  const c = await caches.open(name); const keys = await c.keys(); const max = LIMITS[name] || 300;
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
}
async function cacheFirst(req, name){
  const hit = await caches.match(req); if (hit) return hit;
  const r = await fetch(req);
  if (r.ok) { const c = await caches.open(name); c.put(req, r.clone()); trim(name); }
  return r;
}
async function networkFirst(req, name, timeout = 10000){
  try {
    const r = await Promise.race([fetch(req), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), timeout))]);
    if (r.ok) { const c = await caches.open(name); c.put(req, r.clone()); trim(name); }
    return r;
  } catch (e) {
    const hit = await caches.match(req); if (hit) return hit;
    throw e;
  }
}

self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.origin === location.origin || u.hostname === "cdnjs.cloudflare.com" || u.hostname === "cdn.jsdelivr.net") {
    // shell: serve cached, refresh in background
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok) caches.open(V).then(c => c.put(req, r.clone())); return r; }).catch(() => hit);
      return hit || net;
    }));
  } else if (/server\.arcgisonline\.com|tile\.openstreetmap\.org|openseamap\.org/.test(u.hostname)) {
    e.respondWith(cacheFirst(req, "bcsail-tiles"));
  } else if (u.hostname === "geo.weather.gc.ca") {
    e.respondWith(networkFirst(req, "bcsail-model", 15000));
  } else if (/open-meteo\.com|dfo-mpo\.gc\.ca|api\.weather\.gc\.ca/.test(u.hostname)) {
    e.respondWith(networkFirst(req, "bcsail-data", 15000));
  }
});
