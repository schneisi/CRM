class FSDatabase {
    static writeInDatabaseCollection(aPath, aJsonObject, aKeyString){
        let theReference = fsDatabase.collection(aPath);
        if (aKeyString) {
            theReference.doc(aKeyString).set(aJsonObject);
        } else {
            theReference.add(aJsonObject);
        }
    }

    static getDatabaseSnapshotForDoc(aPath, aCallback, aContextObject, aJsonObject) {
        this.getDatabaseSnapshotForReference(fsDatabase.doc(aPath), aCallback, aContextObject, aJsonObject);
    }
    static getDatabaseSnapshotForCollection(aPath, aCallback, aContextObject, aJsonObject) {
        this.getDatabaseSnapshotForReference(fsDatabase.collection(aPath), aCallback, aContextObject, aJsonObject);
    }

    static getDatabaseSnapshotForReference(aReference, aCallback, aContextObject = null, anOptionsJson = {}) {
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