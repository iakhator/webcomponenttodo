if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
        console.log('Service Worker Registered');
    });
}

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('isUnderMaintenance.json')) {
        event.respondWith(fetch(event.request).then(response => {
            if (response.status === 200) {
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => client.postMessage({ type: 'maintenance', state: true }));
                });
            } else {
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => client.postMessage({ type: 'maintenance', state: false }));
                });
            }
            return response;
        }));
    }
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});