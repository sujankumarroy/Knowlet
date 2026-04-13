const APP_VERSION = '1.8.35';
const CACHE_NAME = `knowlet-${APP_VERSION}`;
const IGNORE_PARAMS_FOR = '/navigator';
const STATIC_ASSETS = [
    '/',
    '/offline',
    '/about',
    '/help',
    '/legal/declaration',
    '/legal/privacy-policy',
    '/legal/terms-and-conditions',

    '/index',
    '/favourite',
    '/assistant',
    '/history',
    '/profile',
    '/login_signup',
    '/profile_complition_form',
    '/search',
    '/navigator',

    '/css/style.css',
    '/css/favourite.css',
    '/css/assistant.css',
    '/css/history.css',
    '/css/profile.css',
    '/css/login_signup.css',
    '/css/profile_complition_form.css',
    '/css/search.css',
    '/css/navigator.css',

    '/js/script.js',
    '/js/favourite.js',
    '/js/assistant.js',
    '/js/history.js',
    '/js/profile.js',
    '/js/login_signup.js',
    '/js/profile_complition_form.js',
    '/js/search.js',
    '/js/navigator.js',

    '/css/core.css',
    '/js/core.js',

    '/assets/notes.json',
    '/assets/pyq.json'
];

self.addEventListener('install', event => {
    self.skipWaiting(); // activate immediately

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => {
            // Force all open pages to reload under the new service worker
            return self.clients.matchAll({ type: 'window' }).then(clients =>
                clients.forEach(client => client.navigate(client.url))
            );
        })
    );

    self.clients.claim(); // take control immediately
});

self.addEventListener('fetch', event => {

    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    let fetchRequest = event.request;

    if (url.origin === self.location.origin && url.pathname === IGNORE_PARAMS_FOR) {
        fetchRequest = new Request('/navigator');
    }

    event.respondWith(
        caches.match(fetchRequest).then(cachedResponse => {

            // Start network fetch in the background
            const networkResponse = fetch(fetchRequest)
                .then(res => {

                    // Update cache with latest response
                    if ( res && res.status === 200 && fetchRequest.url.startsWith(self.location.origin)) {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(fetchRequest, res.clone());
                        });
                    }

                    return res;
                })
                .catch(() => {
                    // If network fails and it's a page navigation, show offline page
                    if (fetchRequest.mode === 'navigate') {
                        return caches.match('/offline');
                    }
                });

            // If cached version exists, return it immediately; network fetch updates cache in background
            return cachedResponse || networkResponse;

        })
    );
});

self.addEventListener('push', event => {
    const data = event.data.json();

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/assets/icons/android-chrome-192x192.png'
    });
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
    );
});
