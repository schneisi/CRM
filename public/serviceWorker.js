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
    './database/fsDatabase.js',
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
    './nestedViews/appointment.html',
    './nestedViews/appointment.js',
    './nestedViews/appointments.html',
    './nestedViews/appointments.js',
    './nestedViews/contract.html',
    './nestedViews/contract.js',
    './nestedViews/customer.html',
    './nestedViews/customer.js',
    './nestedViews/customers.html',
    './nestedViews/customers.js',
    './nestedViews/dashboard.html',
    './nestedViews/dashboard.js',
    './nestedViews/insurance.html',
    './nestedViews/insurance.js',
    './nestedViews/insurances.html',
    './nestedViews/insurances.js',
    './nestedViews/newAppointment.html',
    './nestedViews/newAppointment.js',
    './nestedViews/newContract.html',
    './nestedViews/newContract.js',
    './nestedViews/newCustomer.html',
    './nestedViews/newCustomer.js',
];

const domainWhiteList = [
    location.origin,
    'fonts.googleapis.com', //Icons + Design
    'code.getmdl.io', //MDL
    'gstatic.com', //Firebase
    'google.com'
];


const useCaching = true;

self.addEventListener('install', async anEvent => {
    const cache = await caches.open('static-assets');
    if (useCaching) {
        cache.addAll(staticAssets);
    }
});

self.addEventListener('fetch', anEvent => {
    let theReponse = caches.match(anEvent.request.clone().url).then(aResponse => {
        if (aResponse) {
            //Return cached reponse
            return aResponse;
        } else {
            let theRequestUrl = anEvent.request.url;
            return fetch(anEvent.request.clone())
            .then(aResponse => {
                if(useCaching) {
                    caches.open("dynamic-assets").then(aCache => {
                        if (domainWhiteList.some(eachString => theRequestUrl.includes(eachString))) {
                            aCache.put(theRequestUrl, aResponse);
                        }
                    });
                }
                return aResponse.clone();
            })
            .catch(anError => {
                return caches.open('static-assets').then(aCache => {
                    console.log("Fetch Failed (" + theRequestUrl + "): " + anError);
                });
            });
        };
    });
    if (theReponse) anEvent.respondWith(theReponse);
});


self.addEventListener('notificationclick', anEvent => {
    anEvent.notification.close();
    anEvent.waitUntil(
        clients.matchAll({
            type: "window"  
        })
        .then(aClientList => {  
            for (var i = 0; i < aClientList.length; i++) {  
                var client = aClientList[i];  
                if (client.url == anEvent.notification.data.url) {
                    client.focus();
                    client.postMessage(anEvent.notification.data);
                    break;
                }   
            }
        })
    );
});