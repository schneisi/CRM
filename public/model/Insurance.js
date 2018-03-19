const InsuranceTypes = {
    ACCIDENT_INSURANCE: "accidentInsurance",
    BASIC_ABILITY_INSURANCE: "basicAbilityInsurance",
    CAR_INSURANCE: "carInsurance",
    CARE_INSURANCE: "careInsurance",
    COMMERCIAL_BUILDING_INSURANCE, "commercialBuildingInsurance",
};

class Insurance extends BaseDatabaseObject {
    //Attributes

    constructor(aSnapshot) {
        super(aSnapshot);
        this.providers = [];
    }

    name() {
        return this.getValueOfChild("name");
    }

    description() {
        return this.getValueOfChild("description");
    }

    type() {
        return this.getValueOfChild("type");
    }

    loadProviders() {
        this.populateChildren(this.snapshot.child("providers"), this.providers, "providers", Provider);
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
