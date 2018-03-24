class OfflineDatabase {
    constructor() {
        this.json = {};
        this.cacheString = "offlineDatabase";
    }
    
    saveSnapshot(aSnapshot) {
        let thePath = aSnapshot.ref.toString();
        thePath = thePath.split(".com/")[1];
        let theSubPathCollection = thePath.split("/");
        
        let theFinalJsonPart = {};
        let theCurrentJsonPart = this.json;

        for (let i = 0; i < theSubPathCollection.length - 1; i++) {
            let eachSubString = theSubPathCollection[i];
            if (!theCurrentJsonPart[eachSubString]) {
                theCurrentJsonPart[eachSubString] = {};
            }
            theCurrentJsonPart = theCurrentJsonPart[eachSubString];
        }
        
        if (aSnapshot.val()) {
            theCurrentJsonPart[theSubPathCollection[theSubPathCollection.length - 1]] = aSnapshot.toJSON();
        
            this.openCache().then(aCache => {
                aCache.put(this.cacheString, new Response(JSON.stringify(this.json)));
            });
        }
        
    }

    jsonForPath(aString) {
        //Answer a promise with the json
        return this.openCache().then(aCache => {
            return aCache.match(this.cacheString).then(aRequest => {
                return aRequest.json().then(aJsonObject => {
                    let thePromise = new Promise(
                        function (resolve, reject) {
                            let theSubPathCollection = trimByChar(aString, "/").split("/");
                            let theJson = aJsonObject;
                            theSubPathCollection.forEach(eachPathString => {
                                theJson = theJson[eachPathString];
                            });
                            resolve(theJson);
                        }
                    );
                    return thePromise;
                });
            });
        });
    }

    openCache() {
        return caches.open('offlineDB');
    }
}

const offlineDatabase = new OfflineDatabase();