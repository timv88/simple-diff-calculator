const CACHE_NAME = 'simple-diff-calculator-v1';
const urlsToCache = [
    './',
    './styles/style.css',
    './scripts/index.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Installing', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                console.log('Matched cache entry', event.request.url, response);
                return response ? response : fetch(event.request)
            })
    );
});