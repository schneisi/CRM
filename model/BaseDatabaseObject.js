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