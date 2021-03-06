class Customer extends BaseDatabaseObject {

    constructor(aSnapshot){
        super(aSnapshot);
        this.contracts = [];
    }

    //Attributes
    firstname() {
        return this.getValueOfChild("firstname");
    }

    lastname() {
        return this.getValueOfChild("lastname");
    }

    phone() {
        return this.getValueOfChild("phone");
    }

    mail() {
        return this.getValueOfChild("mail");
    }

    zipCode() {
        return this.getValueOfChild("address.zip");
    }

    street() {
        return this.getValueOfChild("address.street");
    }

    place() {
        return this.getValueOfChild("address.place");
    }
    birthday() {
        return new Date(this.getValueOfChild("birthday"));
    }
    sex() {
        return this.getValueOfChild("sex");
    }
    notes() {
        return this.getValueOfChild("notes");
    }

    age() {
        
    }

    //Segmentation information
    completedInitialTraining() {
        return this.getValueOfChild("completedInitialTraining");
    }

    ownsCar() {
        return this.getValueOfChild("ownsCar");
    }

    ownsPrivateBuilding() {
        return this.getValueOfChild("ownsPrivateBuilding");
    }

    ownsCommercialBuilding() {
        return this.getValueOfChild("ownsCommercialBuilding");
    }

    hasPrivateHousehold() {
        return this.getValueOfChild("hasPrivateHousehold");
    }

    isIndependent() {
        return this.getValueOfChild("isIndependent");
    }

    isOfficial() {
        return this.getValueOfChild("isOfficial");
    }

    isCrossBorderCommuter() {
        return this.getValueOfChild("isCrossBorderCommuter");
    }

    hadIllness() {
        return this.getValueOfChild("hadIllness");
    }

    earnsMoreThanAverage() {
        return this.getValueOfChild("earnsMoreThanAverage");
    }

    isInterestInCapitalMarked() {
        return this.getValueOfChild("isInterestInCapitalMarked");
    }

    hasLeadingPosition() {
        return this.getValueOfChild("hasLeadingPosition");
    }

    partnerIsEmployee() {
        return this.getValueOfChild("partnerIsEmployee");
    }

    //API
    ageInFullYears() {
        let theNowMoment = moment();
        return theNowMoment.diff(moment(this.birthday()), "year");
    }
    fullName() {
        return this.firstname() + " " + this.lastname();
    }
    tableName() {
        return this.lastname() + ", " + this.firstname();
    }
    addressString() {
        return this.street() + " " + this.zipCode() + " " + this.place();
    }
    birthdayString() {
        return this.stringForDate(this.birthday());
    }
    isoBirthdayOnlyString() {
        return this.isoStringForDate(this.birthday());
    }
    phoneLink() {
        return this.linkForString("tel", this.phone());
    }
    mailLink() {
        return this.linkForString("mailto", this.mail());
    }
    linkForString(anAttributeName, aValueString) {
        return "<a href='" + anAttributeName + ":" + aValueString + "'>" + aValueString + "</a>";
    }

    mapsApiUrl() {
        let apiKey = "AIzaSyCeZvXTabw2_pt2TnB7KnfmcOndEbDwvhk";
        return "https://www.google.com/maps/embed/v1/place?key=" + apiKey + "&q=" + encodeURI(this.addressString());
    }

    loadContracts(aCallback){
        let theReceiver = this;
        this.promises = [];
        this.snapshot.ref.collection("contracts").get().then(aSnapshot => {
            aSnapshot.forEach(eachContractSnapshot => {
                let theContract = new Contract(eachContractSnapshot);
                theReceiver.contracts.push(theContract);
                theReceiver.promises.push(theContract.loadInsurance());
            });
            aCallback();
        });
    }

    //Task for updating the birthdays on dashboard
    static createTask() {
        //BirthdayTask
        let theBirthdayTaskName = "BirthdayTask";
        if (Scheduler.instance.hasTaskWithName(theBirthdayTaskName)) {
            this.showUpcomingBirthdays();
        } else {
            let theBirthdayTask = new ScheduledTask(theBirthdayTaskName, function () {
                let theBirthdayCallback = aSnapshot => {
                    Customer.upcomingBirthdays = Customer.createObjectsFromSnapshot(aSnapshot, Customer);
                    if (currentView instanceof DashboardView) {
                        currentView.showUpcomingBirthdays();
                    }
                };
                let theOptions = {
                    orderChild: "birthday",
                    startObject: moment().format("MM/DD"),
                    limit: 3
                };
                FSDatabase.getDatabaseSnapshotForCollection("customers", theBirthdayCallback, null, theOptions);
            }, 60);
            Scheduler.instance.addTask(theBirthdayTask);
        }
    }

    //Insurance-stuff
    hasCarInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.CAR_INSURANCE);
    }

    hasPrivateLiabilityInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.PRIVATE_LIABILITY_INSURANCE);
    }

    hasAccidentInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.ACCIDENT_INSURANCE);
    }

    hasCareInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.CARE_INSURANCE);
    }

    hasCommercialBuildingInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.COMMERCIAL_BUILDING_INSURANCE);
    }

    hasDirectorsAndOfficersInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.DIRECTORS_AND_OFFICERS_INSURANCE);
    }

    hasDisabilityInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.DISABILITY_INSURANCE);
    }

    hasHouseInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.HOUSE_INSURANCE);
    }

    hasCompanyLegalExpensesInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.COMPANY_LEGAL_EXPENSES_INSURANCE);
    }

    hasLegalExpensesInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.LEGAL_EXPENSES_INSURANCE);
    }

    hasPensionInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.PENSION_INSURANCE);
    }

    hasBasicAbilityInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.BASIC_ABILITY_INSURANCE);
    }

    hasDreadDiseaseInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.DREAD_DISEASE_INSURANCE);
    }

    hasPrivateAdditionalHealthInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.PRIVATE_ADDITIONAL_HEALTH_INSURANCE);
    }

    hasUnitLinkedPensionInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.UNIT_LINKED_PENSION_INSURANCE);
    }

    hasPrivateBuildingInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.PRIVATE_BUILDING_INSURANCE);
    }

    hasPrivateHealthInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.PRIVATE_HEALTH_INSURANCE);
    }

    hasRiskLifeInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.RISK_LIFE_INSURANCE);
    }

    hasTravelInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.TRAVEL_INSURANCE);
    }

    hasUnemploymentInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.UNEMPLOYMENT_INSURANCE);
    }

    hasRiesterPension() {
        return this.hasInsuranceOfType(InsuranceTypes.RIESTER_PENSION);
    }

    hasRuerupPension() {
        return this.hasInsuranceOfType(InsuranceTypes.RUERUP_PENSION);
    }

    hasUnableToWorkInsurance() {
        return this.hasInsuranceOfType(InsuranceTypes.UNABLE_TO_WORK_INSURANCE);
    }
    hasInsuranceOfType(aString) {
        return this.contracts.some(eachContract => {
            return eachContract.type() == aString;
        });
    }
}

Customer.upcomingBirthdays = [];
Customer.createTask();


class CustomerBuilder extends BaseBuilder {
    constructor(anObject) {
        super(anObject);
        this.firstname = null;
        this.lastname = null;
        this.birthday = null;
        this.sex = null;
        this.phone = null;
        this.mail = null;
        this.zip = null;
        this.place = null;
        this.street = null;
        this.notes = null;
        
        this.completedInitialTraining = false;
        this.ownsCar = false;
        this.ownsPrivateBuilding = false;
        this.ownsCommercialBuilding = false;
        this.hasPrivateHousehold = false;
        this.isIndependent = false;
        this.isOfficial = false;
        this.isCrossBorderCommuter = false;
        this.hadIllness = false;
        this.earnsMoreThanAverage = false;
        this.isInterestInCapitalMarked = false;
        this.hasLeadingPosition = false;
        this.partnerIsEmployee = false;
        
    }

    path() {
        return "customers";
    }

    birthdayString() {
        return moment(this.birthday).format("MM/DD/YYYY")
    }

    getJson() {
        let theJsonObject = {
            lastname: this.lastname,
            firstname: this.firstname,
            mail: this.mail,
            birthday: this.birthdayString(),
            sex: this.sex,
            phone: this.phone,
            notes: this.notes,
            address: {
                place: this.place,
                street: this.street,
                zip: this.zip,
            },
            completedInitialTraining: this.completedInitialTraining,
            ownsCar: this.ownsCar,
            ownsPrivateBuilding: this.ownsPrivateBuilding,
            ownsCommercialBuilding: this.ownsCommercialBuilding,
            hasPrivateHousehold: this.hasPrivateHousehold,
            isIndependent: this.isIndependent,
            isOfficial: this.isOfficial,
            isCrossBorderCommuter: this.isCrossBorderCommuter,
            hadIllness: this.hadIllness,
            earnsMoreThanAverage: this.earnsMoreThanAverage,
            isInterestInCapitalMarked: this.isInterestInCapitalMarked,
            hasLeadingPosition: this.hasLeadingPosition,
            partnerIsEmployee: this.partnerIsEmployee
        };
       
        return theJsonObject;
    }

    check() {
        if (!this.hasValidString(this.firstname)) {
            this.addError(1);
        }
        if (!this.hasValidString(this.lastname)) {
            this.addError(2);
        }
        if (!this.hasValidString(this.mail)) {
            this.addError(3);
        }
        if (!this.birthday.isValid() || this.birthday > new Date()) {
            this.addError(4);
        }
    }

    errorJson() {
        return {
            1: "Vorname ist Pflichtfeld",
            2: "Nachname ist Pflichtfeld",
            3: "E-Mail ist ungültig",
            4: "Geburtsdatum ist ungültig"
        }
    }
}