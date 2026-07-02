const CACHE_NAME = 'fg-pwa-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/favicon.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(res => res || caches.match('/'));
    })
  );
});
