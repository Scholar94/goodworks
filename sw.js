const CACHE_NAME = 'church-website-v1';
const urlsToCache = [
  '/',
  '/church.html',
  '/main.css',
  '/main.js',
  '/assets/images/logo.png',
  // Add other critical assets
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});