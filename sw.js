const CACHE_NAME = "by-rafael-hanson-v13";
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
  "./bariloche-cover.jpg",
  "./logo.png.jpg",
  "./overland-logo-white.png",
  "./overland-logo-print.png",
  "./site-intro.jpg",
  "./intro-adv-1.jpg",
  "./intro-adv-2.jpg",
  "./intro-adv-3.jpg",
  "./intro-adv-4.jpg",
  "./intro-adv-5.jpg",
  "./intro-adv-6.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(STATIC_ASSETS.map((asset) => cache.add(asset)))
    )
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

  const isAppShellRequest =
    event.request.mode === "navigate" ||
    requestUrl.pathname.endsWith(".html") ||
    requestUrl.pathname.endsWith(".js") ||
    requestUrl.pathname.endsWith(".webmanifest");

  if (isAppShellRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type !== "opaque") {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => {
            if (cached) return cached;
            if (event.request.mode === "navigate") return caches.match("./index.html");
            return Response.error();
          })
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === "opaque") {
          return response;
        }
        const cloned = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        return response;
      });
    })
  );
});
