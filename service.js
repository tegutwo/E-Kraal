if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service.js');
    });
  }

  //Cache assets
  var CACHE_NAME = 'my-offline-cache';
var urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

//Fetch if No INternet
self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        caches.match(event.request).then(function(response) {
          return response;
        })
        })
        )
        });