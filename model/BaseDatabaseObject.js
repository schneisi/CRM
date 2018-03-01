class BaseDatabaseObject {
    constructor(aSnapshot) {
        this.snapshot = aSnapshot;
    }

    static createObjectsFromSnapshot(aSnapshot, aClass, aCallback) {
        let theObjectList = [];
        aSnapshot.forEach(function (aChildSnapshot) {
            theObjectList.push(new aClass(aChildSnapshot));
        });
        aCallback(theObjectList);
    }

    key() {
        return this.snapshot.key;
    }

    getValueOfChild(aString) {
        return this.snapshot.child(aString).val();
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

    create() {
        let theKey;
        if (this.isNew()) {
            theKey = null;
        } else {
            theKey = this.object.key;
        }
        FbDatabase.writeInDatabase(this.path, theKey, this.getJson());
    }
}