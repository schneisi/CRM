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
];

const domainWhiteList = [
    location.origin,
    'fonts.googleapis.com', //Icons + Design
    'code.getmdl.io', //MDL
    'gstatic.com' //Firebase
];


const useCaching = true;

self.addEventListener('install', async anEvent => {
    const cache = await caches.open('static-assets');
    if (useCaching) {
        cache.addAll(staticAssets);
    }
});

self.addEventListener('fetch', anEvent => {
    let theReponse = caches.match(anEvent.request).then(aResponse => {
        if (aResponse) {
            //Return cached reponse
            return aResponse;
        } else {
            return fetch(anEvent.request)
            .then(aResponse => {
                if(useCaching) {
                    let theRequestUrl = anEvent.request.url;
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
                    console.log("Fetch Failed: " + anError);
                    return aCache.match('./404.html');
                });
            });
        };
    });
    anEvent.respondWith(theReponse);
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