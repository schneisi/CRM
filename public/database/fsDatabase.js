

class FSDatabase {
    static setOnlineStatus() {
        if (isOnline()) {
            fsDatabase.enableNetwork();
        } else {
            fsDatabase.disableNetwork();
        }
    }
    static getDatabaseSnapshotForDoc(aPath, aCallback, aContextObject, aJsonObject) {
        this.getDatabaseSnapshotForReference(fsDatabase.doc(aPath), aCallback, aContextObject, aJsonObject);
    }
    static getDatabaseSnapshotForCollection(aPath, aCallback, aContextObject, aJsonObject) {
        this.getDatabaseSnapshotForReference(fsDatabase.collection(aPath), aCallback, aContextObject, aJsonObject);
    }

    static writeInDatabaseCollection(aPath, aJsonObject, aKeyString){
        this.setOnlineStatus();
        let theReference = fsDatabase.collection(aPath);
        let theJson = this.makeJsonSecure(aJsonObject);
        if (aKeyString) {
            theReference.doc(aKeyString).set(theJson);
        } else {
            theReference.add(theJson);
        }
    }
    static makeJsonSecure(aJsonObject) {
        let theTagsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        };
        return JSON.parse(JSON.stringify(aJsonObject).replace(/[&<>]/g, aTagString => {return theTagsToReplace[aTagString] || aTagString}));
    }

    static getDatabaseSnapshotForReference(aReference, aCallback, aContextObject = null, anOptionsJson = {}) {
        this.setOnlineStatus();
        let theCallback;
        if (aContextObject) {
            theCallback = aCallback.bind(aContextObject);
        } else {
            theCallback = aCallback;
        }
        let thePromise = aReference;
        if (anOptionsJson.orderChild) {
            thePromise = thePromise.orderBy(anOptionsJson.orderChild);
            if (anOptionsJson.startObject) {
                thePromise = thePromise.startAt(anOptionsJson.startObject);
            }
            if (anOptionsJson.endObject) {
                thePromise = thePromise.endAt(anOptionsJson.endObject);
            }
        }
        
        if (anOptionsJson.limit) {
            thePromise = thePromise.limit(anOptionsJson.limit);
        }

        thePromise.get().then(aSnapshot => {
            theCallback(aSnapshot);
        }).catch(anError => logString(anError));

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