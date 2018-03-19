class BaseDatabaseObject {
    constructor(aSnapshot) {
        this.snapshot = aSnapshot;
        this.promises = [];
    }

    populateChildren(aSnapshot, anArray, aPath, aClass) {
        let thePromise = new Promise(function (resolve, reject) {
            FbDatabase.getDatabaseSnapshot(aPath, anObjectsSnapshot => {
                aSnapshot.forEach(aChildSnapshot => {
                    let theId = aChildSnapshot.child("id").val();
                    anArray.push(new aClass(anObjectsSnapshot.child(theId)));
                });
                resolve();
            });
        });
        this.promises.push(thePromise);
        return thePromise;
    }

    static createFromPathWithRealtimeQuery(aClass, aPath, aCallback) {
        FbDatabase.startRealTimeQuery(aPath, function (aSnapshot) {
            let theDatabaseObject = new aClass (aSnapshot);
            aCallback(theDatabaseObject);
        });
    }

    static createObjectsFromSnapshot(aSnapshot, aClass) {
        let theObjectList = [];
        aSnapshot.forEach(function (aChildSnapshot) {
            theObjectList.push(new aClass(aChildSnapshot));
        });
        return theObjectList;
    }

    key() {
        return this.snapshot.key;
    }

    reference() {
        return this.snapshot.getRef();
    }

    aboutToDelete() {
        this.reference().remove();
    }

    getValueOfChild(aString) {
        return this.snapshot.child(aString).val();
    }

    startListening(aCallback) {
        this.listeningCallback = aCallback;
        let theReceiver = this;
        this.reference().on('value', function (aSnapshot) {
            theReceiver.snapshot = aSnapshot;
            aCallback();
        }, function () {}, this);
    }

    stopListening() {
        this.reference().off('value', this.listeningCallback);
    }

    stringForDate(aDate) {
        return moment(aDate).format("DD.MM.YYYY");
    }

    isoStringForDate(aDate) {
        return moment(aDate).format("YYYY-MM-DD");
    }
}


class BaseBuilder {

    constructor(anObject) {
        this.object = anObject;
        this.key = null;
    }

    isNew() {
        return this.object == null;
    }

    getJson() {
        throw "Needs to be defined in subclass";
    }

    save() {
        let theKey;
        if (this.isNew()) {
            theKey = null;
        } else {
            theKey = this.object.key();
        }
        FbDatabase.writeInDatabase(this.path(), theKey, this.getJson());
    }
}