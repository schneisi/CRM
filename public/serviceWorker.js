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
    './nestedViews/dashboard.js',
    './nestedViews/customers.html',
    './nestedViews/dashboard.html',
    './nestedViews/demoForm.html',
    './nestedViews/demoTable.html',
];
const useCaching = false;

self.addEventListener('install', async anEvent => {
    const cache = await caches.open('static-assets');
    if (useCaching) {
        cache.addAll(staticAssets);
    }
});


self.addEventListener('fetch', async anEvent => {
    const theRequest = anEvent.request;
    anEvent.respondWith(cachedFirst(theRequest));
});

self.addEventListener('notificationclick', function(anEvent) {
    /*setActionId(anEvent.notification.data.actionId);
    navigateToViewWithId(anEvent.notification.data.viewId);*/
});


async function cachedFirst (aRequest) {
    const theCachedResponse = await caches.match(aRequest);
    return theCachedResponse || fetch(aRequest);
}