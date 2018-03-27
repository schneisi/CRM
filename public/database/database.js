class FbDatabase {
    static writeInDatabase(aPath, aKey, aJSONData){
        let theKey;
        if (aKey) {
            theKey = aKey;
        } else {
            theKey = fbDatabase.ref().child(aPath).push().key;
        }
        let theDictionary = {};
        theDictionary[aPath + "/" + theKey] = aJSONData;
        fbDatabase.ref().update(theDictionary);
    }

    static getDatabaseSnapshot(aPath, aCallback, aContextObject = null, anOptionsJson = {}) {
        
        let theCallback;
        if (aContextObject) {
            theCallback = aCallback.bind(aContextObject);
        } else {
            theCallback = aCallback;
        }

        if (isOnline()) {
            let theErrorCallback = function (anError) {
                logString(anError);
            };
            let theReference = fbDatabase.ref(aPath);
            
            let thePromise = theReference;
            if (anOptionsJson.orderChild) {
                thePromise = thePromise.orderByChild(anOptionsJson.orderChild);
                if (anOptionsJson.startObject) {
                    thePromise = thePromise.startAt(anOptionsJson.startObject);
                }
                if (anOptionsJson.endObject) {
                    thePromise = thePromise.endAt(anOptionsJson.endObject);
                }
            }
            if (anOptionsJson.limit) {
                thePromise = thePromise.limitToFirst(anOptionsJson.limit);
            }
    
    
            thePromise.once("value", aSnapshot => {
                //offlineDatabase.saveSnapshot(aSnapshot);
                theCallback(aSnapshot);
            }).catch(anError => theErrorCallback(anError));
        } else {
            /*offlineDatabase.jsonForPath(aPath).then(aJson => {
                theCallback(aJson);
            });*/
        }
    }

    static startRealTimeQuery(aPath, aCallback) {
        let theReference = fbDatabase.ref(aPath);
        theReference.on("value", aCallback);
    }

    static valueForDate(aDate) {
        return aDate.getTime();
    }

    static dateForValue(aNumber) {
        var theDate = new Date();
        theDate.setTime(aNumber);
        return theDate;
    }

    static getCurrentUserId() {
        return firebase.auth().currentUser.uid;
    }
}