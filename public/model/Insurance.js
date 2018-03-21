const InsuranceTypes = {
    ACCIDENT_INSURANCE: "accidentInsurance",
    BASIC_ABILITY_INSURANCE: "basicAbilityInsurance",
    CAR_INSURANCE: "carInsurance",
    CARE_INSURANCE: "careInsurance",
    COMMERCIAL_BUILDING_INSURANCE: "commercialBuildingInsurance",
    COMPANY_LEGAL_EXPENSES_INSURANCE: "companyLegalExpensesInsurance",
    DIRECTORS_AND_OFFICERS_INSURANCE: "directorsAndOfficersInsurance",
    LEGAL_EXPENSES_INSURANCE: "legalExpensesInsurance",
    DISABILITY_INSURANCE: "disabilityInsurance",
    DREAD_DISEASE_INSURANCE: "dreadDiseaseInsurance",
    HOUSE_INSURANCE: "houseInsurance",
    LEGAL_EXPENSES_INSURANCE: "legalExpensesInsurance",
    PENSION_INSURANCE: "pensionInsurance",
    PRIVATE_ADDITIONAL_HEALTH_INSURANCE: "privateAdditionalHealthInsurance",
    PRIVATE_BUILDING_INSURANCE: "privateBuildingInsurance",
    PRIVATE_HEALTH_INSURANCE: "privateHealthInsurance",
    PRIVATE_LIABILITY_INSURANCE: "privateLiabilityInsurance",
    RISK_LIFE_INSURANCE: "riskLifeInsurance",
    TRAVEL_INSURANCE: "travelInsurance",
    UNABLE_TO_WORK_INSURANCE: "unableToWorkInsurance",
    UNEMPLOYMENT_INSURANCE: "unemploymentInsurance",
    UNIT_LINKED_PENSION_INSURANCE: "unitLinkedPensionInsurance",
    RUERUP_PENSION: "ruerupPension",
    RIESTER_PENSION: "riesterPension"
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

    link() {
        return this.getValueOfChild("link");
    }

    hasLink() {
        return this.hasChild("link");
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
