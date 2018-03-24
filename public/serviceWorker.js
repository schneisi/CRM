const staticAssets = [
    './',
    './manifest.json',
    './serviceWorker.js',
    './index.html',
    './crm.html',
    './css/appShell.css',
    './css/dashboard.css',
    './css/getmdl-select.min.css',
    './Frameworks/getmdl-select.min.js',
    './Frameworks/hammer.min.js',
    './Frameworks/moment.js',
    './database/authentification.js',
    './database/database.js',
    './database/offlineDatabase.js',
    './js/ajax.js',
    './js/app.js',
    './js/list.js',
    './js/login.js',
    './js/main.js',
    './js/navigation.js',
    './js/Scheduling.js',
    './js/sites.json',
    './js/View.js',
    './model/Appointment.js',
    './model/BaseDatabaseObject.js',
    './model/Contract.js',
    './model/Customer.js',
    './model/Insurance.js',
    './nestedViews/dashboard.js',
    './nestedViews/dashboard.html',
    './nestedViews/customers.html',
    './nestedViews/customers.js',
    './nestedViews/customer.html',
    './nestedViews/customer.js',
];


const useCaching = true;

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