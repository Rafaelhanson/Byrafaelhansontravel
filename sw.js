const CACHE_NAME = "by-rafael-hanson-v9";
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
  "./assets/rafael-road-1.jpg",
  "./assets/rafael-road-2.jpg",
  "./assets/ushuaia-cover.jpg",
  "./assets/torres-cover.jpg",
  "./assets/puerto-madryn-cover.jpg",
  "./assets/bariloche-cover.jpg",
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

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  if (!isSameOrigin) {
    event.respondWith(fetch(event.request));
    return;
  }

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
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return Response.error();
        });
    })
  );
});
