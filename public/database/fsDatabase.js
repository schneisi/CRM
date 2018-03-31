let tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

class FSDatabase {
    static writeInDatabaseCollection(aPath, aJsonObject, aKeyString){
        let theReference = fsDatabase.collection(aPath);
        if (aKeyString) {
            theReference.doc(aKeyString).set(this.safe_tags_replace(aJsonObject));
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
    static replaceTag(tag) {
        return tagsToReplace[tag] || tag;
    }

    static safe_tags_replace(aJSONObject) {
        return JSON.parse(JSON.stringify(aJSONObject).replace(/[&<>]/g, this.replaceTag));
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