// Set this to true for production
const doCache = true;

// Name our cache
const CACHE_NAME = 'pwa-cache-v1';

// Register static files
const staticFiles = [
  './',
  './main.bundle.js',
];

// Delete old caches that are not our current one!
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            console.log(`Deleting cache: ${key}`);
            return caches.delete(key);
          }

          return false;
        }))
      )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', (event) => {
  if (doCache) {
    self.skipWaiting();
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(staticFiles))
    )
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', (event) => {
  if (doCache) {
    event.respondWith(
        caches.match(event.request).then(response => (
            response || fetch(event.request)
        ))
    );
  }
});
