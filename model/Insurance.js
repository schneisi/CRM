class Insurance extends BaseDatabaseObject {
    //Attributes

    constructor(aSnapshot) {
        super(aSnapshot);
        this.providers = Insurance.createObjectsFromSnapshot(this.snapshot.child("providers"), Provider, function (aList) {});
    }
    name() {
        return this.getValueOfChild("name");
    }

    description() {
        return this.getValueOfChild("description");
    }

    providersAsHtmlList() {
        let theProviderList = this.providers;
        let theProviderListString = "<ul id='customerContractsList'>"
        theProviderList.forEach(function (aProvider) {
            theProviderListString = theProviderListString + "<li>" + aProvider.name() + "</li>";
        })
        theProviderListString = theProviderListString + "</ul>";
        return theProviderListString
    }
}


class Provider extends BaseDatabaseObject {
    name() {
        return this.getValueOfChild("name");
    }
}
