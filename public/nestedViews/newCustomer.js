class NewCustomerView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewCustomer);
        this.setComponents();
        this.initializeAccordion();
        if (hasActionId()) {
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

                currentView.setRadioButtonByValue(currentView.isMarriedRadio, theCustomer.isMarried());
                currentView.setRadioButtonByValue(currentView.ownsCarRadio, theCustomer.ownsCar());
                currentView.setRadioButtonByValue(currentView.ownsCommercialBuildingRadio, theCustomer.ownsCommercialBuilding());
                currentView.setRadioButtonByValue(currentView.ownsPrivateBuildingRadio, theCustomer.ownsPrivateBuilding());
                currentView.setRadioButtonByValue(currentView.hasPrivateHouseholdRadio, theCustomer.hasPrivateHousehold());
                currentView.setRadioButtonByValue(currentView.isIndependentRadio, theCustomer.isIndependent());
                currentView.setRadioButtonByValue(currentView.isOfficialRadio, theCustomer.isOfficial());
                currentView.setRadioButtonByValue(currentView.isCrossBorderCommuterRadio, theCustomer.isCrossBorderCommuter());
                currentView.setRadioButtonByValue(currentView.hadIllnessRadio, theCustomer.hadIllness());
                currentView.setRadioButtonByValue(currentView.earnsMoreThanAverageRadio, theCustomer.earnsMoreThanAverage());
                currentView.setRadioButtonByValue(currentView.isInterestInCapitalMarkedRadio, theCustomer.isInterestInCapitalMarked());
                currentView.setRadioButtonByValue(currentView.completedInitialTrainingRadio, theCustomer.completedInitialTraining());
                currentView.setRadioButtonByValue(currentView.hasLeadingPositionRadio, theCustomer.hasLeadingPosition());
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
        else {
            console.log("Empty radioButtonGroup" + radioButtonGroup);
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

        this.completedInitialTrainingRadio = document.getElementsByName("completedInitialTraining");
        this.isMarriedRadio = document.getElementsByName("isMarried");
        this.ownsCarRadio = document.getElementsByName("ownsCar");
        this.ownsPrivateBuildingRadio = document.getElementsByName("ownsPrivateBuilding");
        this.ownsCommercialBuildingRadio = document.getElementsByName("ownsCommercialBuilding");
        this.hasPrivateHouseholdRadio = document.getElementsByName("hasPrivateHousehold");
        this.isIndependentRadio = document.getElementsByName("isIndependent");
        this.isOfficialRadio = document.getElementsByName("isOfficial");
        this.isCrossBorderCommuterRadio = document.getElementsByName("isCrossBorderCommuter");
        this.hadIllnessRadio = document.getElementsByName("hadIllness");
        this.earnsMoreThanAverageRadio = document.getElementsByName("earnsMoreThanAverage");
        this.isInterestInCapitalMarkedRadio = document.getElementsByName("isInterestInCapitalMarked");
        this.hasLeadingPositionRadio = document.getElementsByName("hasLeadingPosition");
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

        theBuilder.completedInitialTraining = this.getSelectedValueFromRadioButtonGroup(this.completedInitialTrainingRadio);
        theBuilder.isMarried = this.getSelectedValueFromRadioButtonGroup(this.isMarriedRadio);
        theBuilder.ownsCar = this.getSelectedValueFromRadioButtonGroup(this.ownsCarRadio);
        theBuilder.ownsPrivateBuilding = this.getSelectedValueFromRadioButtonGroup(this.ownsPrivateBuildingRadio);
        theBuilder.ownsCommercialBuilding = this.getSelectedValueFromRadioButtonGroup(this.ownsCommercialBuildingRadio);
        theBuilder.hasPrivateHousehold = this.getSelectedValueFromRadioButtonGroup(this.hasPrivateHouseholdRadio);
        theBuilder.isIndependent = this.getSelectedValueFromRadioButtonGroup(this.isIndependentRadio);
        theBuilder.isOfficial = this.getSelectedValueFromRadioButtonGroup(this.isOfficialRadio);
        theBuilder.isCrossBorderCommuter = this.getSelectedValueFromRadioButtonGroup(this.isOfficialRadio);
        theBuilder.hadIllness = this.getSelectedValueFromRadioButtonGroup(this.hadIllnessRadio);
        theBuilder.earnsMoreThanAverage = this.getSelectedValueFromRadioButtonGroup(this.earnsMoreThanAverageRadio);
        theBuilder.isInterestInCapitalMarked = this.getSelectedValueFromRadioButtonGroup(this.isInterestInCapitalMarkedRadio);
        theBuilder.hasLeadingPosition = this.getSelectedValueFromRadioButtonGroup(this.hasLeadingPositionRadio);
        
        theBuilder.save();
        navigateToViewWithId("customers");
    }
}