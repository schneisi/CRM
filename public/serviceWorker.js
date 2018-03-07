const staticAssets = [
    './',
    './manifest.json',
    './serviceWorker.js',
    './index.html',
    './crm.html',
    './css/appShell.css',
    './css/dashboard.css',
    './js/ajax.js',
    './js/navigation.js',
    './js/login.js',
    './js/dashboard.js',
    './nestedViews/customers.html',
    './nestedViews/dashboard.html',
    './nestedViews/demoForm.html',
    './nestedViews/demoTable.html',
];

self.addEventListener('install', async event => {
    const cache = await caches.open('static-assets');
    cache.addAll(staticAssets);
});


self.addEventListener('fetch', async event => {
    const theRequest = event.request;
    event.respondWith(cachedFirst(theRequest));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.data.callback();
});


async function cachedFirst (aRequest) {
    const theCachedResponse = await caches.match(aRequest);
    return theCachedResponse || fetch(aRequest);
}