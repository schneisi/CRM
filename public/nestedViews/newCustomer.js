class NewCustomerView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewCustomer);
        this.setComponents();
        this.initializeAccordion();
        if (hasActionId()) {
            this.updateName("Kunde bearbeiten");
            FSDatabase.getDatabaseSnapshotForDoc("/customers/" + getActionId(), aSnapshot => {
                let theCustomer = new Customer(aSnapshot);
                this.customer = theCustomer;

                this.lastNameField.value = theCustomer.lastname();
                this.lastNameField.parentElement.classList.add("is-dirty");
                this.firstNameField.value = theCustomer.firstname();
                this.firstNameField.parentElement.classList.add("is-dirty");
                this.streetField.value = theCustomer.street();
                this.streetField.parentElement.classList.add("is-dirty");
                this.zipField.value = theCustomer.zipCode();
                this.zipField.parentElement.classList.add("is-dirty");
                this.phoneField.value = theCustomer.phone();
                this.phoneField.parentElement.classList.add("is-dirty");
                this.placeField.value = theCustomer.place();
                this.placeField.parentElement.classList.add("is-dirty");
                this.mailField.value = theCustomer.mail();
                this.mailField.parentElement.classList.add("is-dirty");
                this.noteField.value = theCustomer.notes();
                this.noteField.parentElement.classList.add("is-dirty");
                this.birthdayField.value = theCustomer.isoBirthdayOnlyString();
                this.birthdayField.parentElement.classList.add("is-dirty");
                this.setRadioButtonByValue(this.sexRadio, theCustomer.sex());

                if (theCustomer.ownsCar()) this.ownsCarHelper.check();
                if (theCustomer.ownsCommercialBuilding()) this.ownsCommercialBuildingHelper.check();
                if (theCustomer.ownsPrivateBuilding()) this.ownsPrivateBuildingHelper.check();
                if (theCustomer.hasPrivateHousehold()) this.hasPrivateHouseholdHelper.check();
                if (theCustomer.isIndependent()) this.isIndependentHelper.check();
                if (theCustomer.isOfficial()) this.isOfficialHelper.check();
                if (theCustomer.isCrossBorderCommuter()) this.isCrossBorderCommuterHelper.check();
                if (theCustomer.hadIllness()) this.hadIllnessHelper.check();
                if (theCustomer.earnsMoreThanAverage()) this.earnsMoreThanAverageHelper.check();
                if (theCustomer.isInterestInCapitalMarked()) this.isInterestInCapitalMarkedHelper.check();
                if (theCustomer.completedInitialTraining()) this.completedInitialTrainingHelper.check();
                if (theCustomer.hasLeadingPosition()) this.hasLeadingPositionHelper.check();
                if (theCustomer.partnerIsEmployee()) this.partnerIsEmployee.check();
            }, this);
        }
    }

    setRadioButtonByValue(radioButtonGroup, value) {
        let theRadioButtonGroupLength = radioButtonGroup.length;
        if (theRadioButtonGroupLength > 0) { 
            for (let radioButtonCounter = 0; radioButtonCounter < theRadioButtonGroupLength; radioButtonCounter++) {
                if (radioButtonGroup[radioButtonCounter].value == value) {
                    radioButtonGroup[radioButtonCounter].parentNode.MaterialRadio.check();
                }
            }
        }
    }

    getSelectedValueFromRadioButtonGroup(radioButtonGroup) {
        for (let radioButtonCounter = 0; radioButtonCounter < radioButtonGroup.length; radioButtonCounter++) {
            if (radioButtonGroup[radioButtonCounter].checked) {
                return radioButtonGroup[radioButtonCounter].value;
            }
        }
    }


    setComponents() {
        this.firstNameField = document.getElementById("firstname");
        this.lastNameField = document.getElementById("lastname");
        this.zipField = document.getElementById("zipCode");
        this.placeField = document.getElementById("place");
        this.streetField = document.getElementById("street");
        this.noteField = document.getElementById("notes");
        this.birthdayField = document.getElementById("birthday");
        this.mailField = document.getElementById("mail");
        this.phoneField = document.getElementById("phone");
        this.sexRadio = document.getElementsByName("sex");

        this.completedInitialTrainingHelper = new CheckBoxHelper("completedInitialTrainingCheckbox");
        this.ownsCarHelper = new CheckBoxHelper("ownsCarCheckBox");
        this.ownsPrivateBuildingHelper = new CheckBoxHelper("ownsPrivateBuildingCheckbox");
        this.ownsCommercialBuildingHelper = new CheckBoxHelper("ownsCommercialBuildingCheckbox");
        this.hasPrivateHouseholdHelper = new CheckBoxHelper("hasPrivateHouseholdCheckbox");
        this.isIndependentHelper = new CheckBoxHelper("isIndependentCheckbox");
        this.isOfficialHelper = new CheckBoxHelper("isOfficialCheckbox");
        this.isCrossBorderCommuterHelper = new CheckBoxHelper("isCrossBorderCommuterCheckbox");
        this.hadIllnessHelper = new CheckBoxHelper("hadIllnessCheckbox");
        this.earnsMoreThanAverageHelper = new CheckBoxHelper("earnsMoreThanAverageCheckbox");
        this.isInterestInCapitalMarkedHelper = new CheckBoxHelper("isInterestInCapitalMarkedCheckbox");
        this.hasLeadingPositionHelper = new CheckBoxHelper("hasLeadingPositionCheckbox");
        this.partnerIsEmployee = new CheckBoxHelper("partnerIsEmployeeCheckbox");
    }

    saveNewCustomer() {
        let theBuilder = new CustomerBuilder(this.customer);
        theBuilder.firstname = this.firstNameField.value;
        theBuilder.lastname = this.lastNameField.value;
        theBuilder.street = this.streetField.value;
        theBuilder.zip = this.zipField.value;
        theBuilder.place = this.placeField.value;
        theBuilder.notes = this.noteField.value;
        theBuilder.mail = this.mailField.value;
        theBuilder.phone = this.phoneField.value;
        theBuilder.birthday = new Date(this.birthdayField.value);
        theBuilder.sex = this.getSelectedValueFromRadioButtonGroup(this.sexRadio);

        theBuilder.completedInitialTraining = this.completedInitialTrainingHelper.isChecked();
        theBuilder.ownsCar = this.ownsCarHelper.isChecked();
        theBuilder.ownsPrivateBuilding = this.ownsPrivateBuildingHelper.isChecked();
        theBuilder.ownsCommercialBuilding = this.ownsCommercialBuildingHelper.isChecked();
        theBuilder.hasPrivateHousehold = this.hasPrivateHouseholdHelper.isChecked();
        theBuilder.isIndependent = this.isIndependentHelper.isChecked();
        theBuilder.isOfficial = this.isOfficialHelper.isChecked();
        theBuilder.isCrossBorderCommuter = this.isCrossBorderCommuterHelper.isChecked();
        theBuilder.hadIllness = this.hadIllnessHelper.isChecked();
        theBuilder.earnsMoreThanAverage = this.earnsMoreThanAverageHelper.isChecked();
        theBuilder.isInterestInCapitalMarked = this.isInterestInCapitalMarkedHelper.isChecked();
        theBuilder.hasLeadingPosition = this.hasLeadingPositionHelper.isChecked();
        theBuilder.partnerIsEmployee = this.partnerIsEmployee.isChecked();

        if (theBuilder.save()) {
            let theViewId = "customers";
            if (this.customer) theViewId = "customer";
            navigateToViewWithId(theViewId);
        } else {
            showModal("Fehler", theBuilder.errorStringBrSeparated());
        }
    }
}