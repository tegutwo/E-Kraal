if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service.js');
    });
  }
  //polyfill
  Cache.prototype.add = function add(request) {
    return this.addAll([request]);
  }

  //Cache assets
  var CACHE_NAME = 'my-offline-cache';
var urlsToCache = [
  '/E-Kraal/index.html',
  '/E-Kraal/app.js',
  '/E-Kraal/style.css',
  '/E-Kraal/Images/header@1X.png'
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
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
 });
