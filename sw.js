// Define a name for the cache
const CACHE_NAME = 'pomofocus-cache-v1';

// List of files to cache when the service worker is installed
const urlsToCache = [
  '/',
  '/index.html'
  // We don't cache the external scripts (tailwindcss, tone.js) here for simplicity,
  // but in a real-world app, you might want to. The app will still work offline
  // after the first visit because the browser caches them anyway.
];

// Install event: opens the cache and adds the core files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves cached content when offline.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return the cached response
        if (response) {
          return response;
        }
        // Otherwise, fetch from the network
        return fetch(event.request);
      })
  );
});
