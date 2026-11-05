self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method === "GET" &&
    url.origin === self.location.origin &&
    (request.mode === "navigate" || url.pathname.endsWith(".css"))
  ) {
    event.respondWith(fetch(request, { cache: "no-store" }));
  }
});
