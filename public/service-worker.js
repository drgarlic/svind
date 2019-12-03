const cacheName = 'cache-' + Date.now();

const filesToCache = [
    '/',
    '/index.html',
    '/bundle.css',
    '/bundle.tailwind.css',
    '/bundle.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((thisCacheName) => {
                    if (thisCacheName !== cacheName) {
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const response = await caches.match(event.request);
            return response || fetch(event.request);
        })()
    );
});
