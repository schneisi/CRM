class BaseDatabaseObject {
    constructor(aSnapshot) {
        this.snapshot = aSnapshot
        
        this.promises = [];
        this.id = null;
    }


    static createObjectsFromSnapshot(aSnapshotOrJson, aClass) {
        let theObjectList = [];
        aSnapshotOrJson.forEach(aChildSnapshot => {
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
        let theValue = this.snapshot.get(aString);
        if (theValue) {
            return theValue;
        } else {
            return "";
        }

    }

    hasChild(aString) {
        let theValue = this.getValueOfChild(aString);
        if (theValue) {
            return true;
        } else {
            return false;
        }
    }
    
    stringForDate(aDate) {
        //Uses moment.js
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

    hasValidString(aString) {
        return aString && aString.length > 0;
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
    check() {
        //Empty implementation => subclass may override
    }
    hasError() {
        return this.errors.length > 0;
    }
    addError(aNumber) {
        let theError = this.errorForNumber(aNumber);
        this.errors.push(theError);
        return theError;
    }

    errorForNumber(aNumber) {
        let theErrorText = this.errorJson()[aNumber];
        return new BuilderError(aNumber, theErrorText);
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