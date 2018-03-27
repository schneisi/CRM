class BaseDatabaseObject {
    constructor(aSnapshot) {
        this.snapshot = aSnapshot
        
        this.promises = [];
        this.id = null;
    }


    static createObjectsFromSnapshot(aSnapshotOrJson, aClass) {
        let theObjectList = [];
        aSnapshotOrJson.forEach(function (aChildSnapshot) {
            theObjectList.push(new aClass(aChildSnapshot));
        });
        return theObjectList;
    }

    key() {
        return this.snapshot.id;
    }

    reference() {
        return this.snapshot.ref;
    }

    aboutToDelete() {
        this.reference().delete();
    }

    getValueOfChild(aString) {
        return this.snapshot.get(aString);
    }

    hasChild(aString) {
        let theValue = this.getValueOfChild(aString);
        if (theValue) {
            return true;
        } else {
            return false;
        }
    }

    startListening(aCallback) {
        //TODO => Migrate to new database or remove
        this.listeningCallback = aCallback;
        let theReceiver = this;
        this.reference().on('value', function (aSnapshot) {
            theReceiver.snapshot = aSnapshot;
            aCallback();
        }, function () {}, this);
    }

    stopListening() {
        //TODO => Migrate to new database or remove
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

    getReference() {
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
            FSDatabase.writeInDatabaseCollection(this.path(), this.getJson(), theKey);
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