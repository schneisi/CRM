const staticAssets = [
    './',
    './manifest.json',
    './serviceWorker.js',
    './index.html',
    './crm.html',
    './404.html',
    './css/appShell.css',
    './css/dashboard.css',
    './css/getmdl-select.min.css',
    './Frameworks/getmdl-select.min.js',
    './Frameworks/hammer.min.js',
    './Frameworks/moment.js',
    './database/authentification.js',
    './database/database.js',
    './database/fsDatabase.js',
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
    './nestedViews/appointment.js',
    './nestedViews/appointment.html',
    './nestedViews/appointments.js',
    './nestedViews/appointments.html',
    './nestedViews/dashboard.js',
    './nestedViews/dashboard.html',
    './nestedViews/customers.html',
    './nestedViews/customers.js',
    './nestedViews/customer.html',
    './nestedViews/customer.js',
    './nestedViews/insurance.js',
    './nestedViews/insurance.html',
    './nestedViews/insurances.js',
    './nestedViews/insurances.html',
    './nestedViews/newAppointment.js',
    './nestedViews/newAppointment.html',
];


const useCaching = true;

self.addEventListener('install', async anEvent => {
    const cache = await caches.open('static-assets');
    if (useCaching) {
        cache.addAll(staticAssets);
    }
});

addEventListener('fetch', anEvent => {
    let theReponse = caches.match(anEvent.request).then(aResponse => {
        if (aResponse) {
            //Return cached reponse
            return aResponse;
        } else {
            return fetch(anEvent.request)
            .then(aReponse => {
                return caches.open("dynamic-asssets").then(aCache => {
                    //Save and return the fetched response
                    if (useCaching) {
                        aCache.put(anEvent.request.url, aReponse.clone());
                    }
                    return aReponse;
                });
            })
            .catch(anError => {
                return caches.open('static-assets').then(aCache => {
                    return aCache.match('./404.html');
                });
            });
        };
    });
    anEvent.respondWith(theReponse);
});


self.addEventListener('notificationclick', function(anEvent) {
    /*setActionId(anEvent.notification.data.actionId);
    navigateToViewWithId(anEvent.notification.data.viewId);*/
});


async function cachedFirst (aRequest) {
    const theCachedResponse = await caches.match(aRequest);
    return theCachedResponse || fetch(aRequest);
}