class BaseDatabaseObject {
    constructor(aSnapshot) {
        this.snapshot = aSnapshot;
    }

    getValueOfChild(aString) {
        return this.snapshot.child(aString).val();
    }
}