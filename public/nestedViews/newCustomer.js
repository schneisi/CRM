class NewCustomerView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewCustomer);
        this.setComponents();
        this.initializeAccordion();
        if (hasActionId()) {
            this.updateName("Kunde bearbeiten");
            FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function (aSnapshot) {
                let theCustomer = new Customer(aSnapshot);
                currentView.lastNameField.value = theCustomer.lastname();
                currentView.lastNameField.parentElement.classList.add("is-dirty");
                currentView.firstNameField.value = theCustomer.firstname();
                currentView.firstNameField.parentElement.classList.add("is-dirty");
                currentView.streetField.value = theCustomer.street();
                currentView.streetField.parentElement.classList.add("is-dirty");
                currentView.zipField.value = theCustomer.zipCode();
                currentView.zipField.parentElement.classList.add("is-dirty");
                currentView.phoneField.value = theCustomer.phone();
                currentView.phoneField.parentElement.classList.add("is-dirty");
                currentView.placeField.value = theCustomer.place();
                currentView.placeField.parentElement.classList.add("is-dirty");
                currentView.mailField.value = theCustomer.mail();
                currentView.mailField.parentElement.classList.add("is-dirty");
                currentView.noteField.value = theCustomer.notes();
                currentView.noteField.parentElement.classList.add("is-dirty");
                currentView.birthdayField.value = theCustomer.isoBirthdayOnlyString();
                currentView.birthdayField.parentElement.classList.add("is-dirty");
                currentView.setRadioButtonByValue(currentView.sexRadio, theCustomer.sex());

                if (theCustomer.isMarried()) currentView.isMarriedHelper.check();
                if (theCustomer.ownsCar()) currentView.ownsCarHelper.check();
                if (theCustomer.ownsCommercialBuilding()) currentView.ownsCommercialBuildingHelper.check();
                if (theCustomer.ownsPrivateBuilding()) currentView.ownsPrivateBuildingHelper.check();
                if (theCustomer.hasPrivateHousehold()) currentView.hasPrivateHouseholdHelper.check();
                if (theCustomer.isIndependent()) currentView.isIndependentHelper.check();
                if (theCustomer.isOfficial()) currentView.isOfficialHelper.check();
                if (theCustomer.isCrossBorderCommuter()) currentView.isCrossBorderCommuterHelper.check();
                if (theCustomer.hadIllness()) currentView.hadIllnessHelper.check();
                if (theCustomer.earnsMoreThanAverage()) currentView.earnsMoreThanAverageHelper.check();
                if (theCustomer.isInterestInCapitalMarked()) currentView.isInterestInCapitalMarkedHelper.check();
                if (theCustomer.completedInitialTraining()) currentView.completedInitialTrainingHelper.check();
                if (theCustomer.hasLeadingPosition()) currentView.hasLeadingPositionHelper.check();

                currentView.customer = theCustomer;
            });
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
                break;
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
        this.isMarriedHelper = new CheckBoxHelper("isMarriedCheckbox");
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
        theBuilder.isMarried = this.isMarriedHelper.isChecked();
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

        theBuilder.save();
        let theViewId = "customers";
        if (this.customer) theViewId = "customer";
        navigateToViewWithId(theViewId);
    }
}