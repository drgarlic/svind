// Regexes are sorted by priority

const regexesOnlineFirst = [
    self.location.origin + '/api/',
];

const regexesOnlineOnly = [
    'localhost',
    'aws',
];

const regexesCacheFirst = [
    self.location.origin,
    'https://rsms.me/inter/',
    'cdn',
];

const regexesCacheOnly = [
];

// If the url doesn't match any of those regexes, it will do online first

// /!\ Warning /!\
// Variables auto updated by Gulp, do not change them !
const cacheName = 'cache-name-id';
const filesToPreCache = [
    'file'
];

console.log(`[Service Worker] Origin: ${self.location.origin}`);

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log(`[Service Worker] Creating cache: ${cacheName}`);
            return cache.addAll(filesToPreCache);
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
            if (event.request.method === 'GET') {
                cache.put(event.request, response.clone());
            }
            return response;
        });
    }).catch(() => {
        return cache;
    });
};

const cacheFirst = {
    method: (event, cache) => {
        console.log(`[Service Worker] Cache first: ${event.request.url}`);
        const fun = update(event, cache);
        return cache || fun;
    },
    regexes: regexesCacheFirst,
};

const cacheOnly = {
    method: (event, cache) => {
        console.log(`[Service Worker] Cache only: ${event.request.url}`);
        return cache || update(event, cache);
    },
    regexes: regexesCacheOnly,
};

const onlineFirst = {
    method: (event, cache) => {
        console.log(`[Service Worker] Online first: ${event.request.url}`);
        return update(event, cache);
    },
    regexes: regexesOnlineFirst,
};

const onlineOnly = {
    method: (event) => {
        console.log(`[Service Worker] Online only: ${event.request.url}`);
        return fetch(event.request);
    },
    regexes: regexesOnlineOnly,
};

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cache) => {
            // The order matters !
            const patterns = [
                onlineFirst,
                onlineOnly,
                cacheFirst,
                cacheOnly
            ];

            for (let pattern of patterns) {
                for (let regex of pattern.regexes) {
                    if (RegExp(regex).test(event.request.url)) {
                        return pattern.method(event, cache);
                    }
                }
            }

            return onlineFirst.method(event, cache);
        })
    );
});
