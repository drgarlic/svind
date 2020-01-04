const cacheName = 'cache-' + Date.now();

const filesToCache = [
    '/',
    '/index.html',
    '/bundle.css',
    '/bundle.tailwind.css',
    '/bundle.js',
];

console.log(`[Service Worker] Origin: ${self.location.origin}`);

const regexesOnlineFirst = [
    self.location.origin + '/api/',
    'localhost',
];

const regexesCacheFirst = [
    self.location.origin,
];

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log(`[Service Worker] Creating cache: ${cacheName}`);
            return cache.addAll(filesToCache);
        }).then(() => {
            self.skipWaiting();
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((thisCacheName) => {
                    if (thisCacheName !== cacheName) {
                        console.log(`[Service Worker] Deleting: ${thisCacheName}`);
                        return caches.delete(thisCacheName);
                    }
                })
            ).then(() => self.clients.claim());
        })
    );
});

const update = (event, cache) => {
    return fetch(event.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
        });
    }).catch(() => {
        return cache;
    });
};

const cacheFirst = (event, cache) => {
    console.log(`[Service Worker] Cache first: ${event.request.url}`);
    const fun = update(event, cache);
    return cache || fun;
};

const onlineFirst = (event, cache) => {
    console.log(`[Service Worker] Online first: ${event.request.url}`);
    return update(event, cache);
};

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cache) => {
            for (const regex of regexesOnlineFirst) {
                if (RegExp(regex).test(event.request.url)) {
                    return onlineFirst(event, cache);
                }
            }
            for (const regex of regexesCacheFirst) {
                if (new RegExp(regex).test(event.request.url)) {
                    return cacheFirst(event, cache);
                }
            }
            return onlineFirst(event, cache);
        })
    );
});
