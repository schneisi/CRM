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
                alert(theCustomer.birthdayString());
                currentView.birthdayField.parentElement.classList.add("is-dirty");
                currentView.setRadioButtonByValue(currentView.sexRadio, theCustomer.sex());
                currentView.customer = theCustomer;
            });
        }
    }

    setRadioButtonByValue(radioButtonGroup, value) {
        for (let radioButtonCounter = 0; radioButtonCounter < radioButtonGroup.length; radioButtonCounter++) {
            if (radioButtonGroup[radioButtonCounter].value == value) {
                radioButtonGroup[radioButtonCounter].parentNode.MaterialRadio.check();
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
    }

    saveNewCustomer() {
        console.log(this);
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
        theBuilder.save();
        navigateToViewWithId("customers");
    }
}