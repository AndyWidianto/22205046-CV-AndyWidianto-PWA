const static = "Andy-Widianto";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "img/github_banner.jpg",
  "img/icon-andy.jpg",
  "img/img-bg-1.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(static).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: 'img/icon-128x128.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
