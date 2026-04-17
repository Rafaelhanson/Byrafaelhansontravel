const CACHE_NAME = "by-rafael-hanson-v5";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./login.html",
  "./local.html",
  "./app.js",
  "./local.js",
  "./auth-config.js",
  "./auth.js",
  "./manifest.webmanifest",
  "./rafael-road-1.jpg",
  "./rafael-road-2.jpg",
  "./ushuaia-cover.jpg",
  "./torres-cover.jpg",
  "./puerto-madryn-cover.jpg",
  "./bariloche-cover.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === "opaque") {
            return response;
          }
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
