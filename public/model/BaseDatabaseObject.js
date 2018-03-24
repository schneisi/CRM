class BaseDatabaseObject {
    constructor(aSnapshotOrJsonObject) {
        this.online = isOnline();
        if (this.online) {
            this.snapshot = aSnapshotOrJsonObject;
        } else {
            this.json = aSnapshotOrJsonObject;
        }
        
        this.promises = [];
        this.id = null;
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

    static createObjectsFromSnapshot(aSnapshotOrJson, aClass) {
        let theObjectList = [];
        if (isOnline()) {
            aSnapshotOrJson.forEach(function (aChildSnapshot) {
                theObjectList.push(new aClass(aChildSnapshot));
            });
        } else {
            Object.keys(aSnapshotOrJson).forEach(aKeyString => {
                let theObject = new aClass(aSnapshotOrJson[aKeyString]);
                theObject.id = aKeyString;
                theObjectList.push(theObject);
            })
        }
        return theObjectList;
    }

    key() {
        if (this.online) {
            return this.snapshot.key;
        } else {
            return this.id;
        }
    }

    reference() {
        return this.snapshot.getRef();
    }

    aboutToDelete() {
        this.reference().remove();
    }

    getValueOfChild(aString) {
        if (this.online) {
            return this.snapshot.child(aString).val();
        } else {
            let theSubPathCollection = aString.split("/");
            let theResponseObject = this.json;
            theSubPathCollection.forEach(eachString => theResponseObject = theResponseObject[eachString]);
            return theResponseObject;
        }
    }

    hasChild(aString) {
        return this.snapshot.child(aString).exists();
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
        this.errors = [];
    }

    isNew() {
        return this.object == null;
    }

    getJson() {
        throw "Needs to be defined in subclass";
    }

    save() {
        this.check();
        if (this.hasError()) {
            return false;
        } else {
            let theKey;
            if (this.isNew()) {
                theKey = null;
            } else {
                theKey = this.object.key();
            }
            FbDatabase.writeInDatabase(this.path(), theKey, this.getJson());
            return true;
        }
    }

    //Errors
    check() {}
    hasError() {
        return this.errors.length > 0;
    }
    addError(aNumber) {
        let theError = this.errorForNumber(aNumber);
        this.errors.push(theError);
        return theError;
    }

    errorForNumber(aNumber) {
        throw "Implement in subclass";
    }
    errorStringBrSeparated() {
        let theErrorTexts = [];
        this.errors.forEach(eachError => {
            theErrorTexts.push(eachError.text);
        })
        return theErrorTexts.join("<br />");
    }
}

class BuilderError {
    constructor(aNumber, aString) {
        this.number = aNumber;
        this.text = aString;
    }
}