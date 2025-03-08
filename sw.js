const CACHE_NAME = 'M3U-Designer-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/styles.css',
  './css/tutorial.css',
  './css/logo.css',
  './css/editor-tutorial.css',
  './css/modal.css',
  './css/voice-tooltip.css',
  './css/voice-commands.css',
  './js/script.js',
  './js/tutorial.js',
  './js/editor-tutorial.js',
  './js/epg.js',
  './js/online-status.js',
  './js/voice-commands.js',
  './js/voice-tooltip.js',
  './js/patron-apps.js',
  './js/forum-posts.js',
  './js/no-results.js',
  './images/logo.png',
  './images/default-channel.png',
  './images/maskot.png',
  './images/sesli-asistan.svg',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});