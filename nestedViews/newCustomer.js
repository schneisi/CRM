class NewCustomerView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewCustomer);
    
        if (hasActionId()) {
            FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function (aSnapshot) {
                let theCustomer = new Customer(aSnapshot);
                let theNameField = document.getElementById("lastname");
                theNameField.value = theCustomer.lastname();
                theNameField.parentElement.classList.add("is-dirty");
                let theFirstNameField = document.getElementById("firstname");
                theFirstNameField.value = theCustomer.firstname();
                theFirstNameField.parentElement.classList.add("is-dirty");
                let theStreetField = document.getElementById("street");
                theStreetField.value = theCustomer.street();
                theStreetField.parentElement.classList.add("is-dirty");
                let theZipField = document.getElementById("zipCode");
                theZipField.value = theCustomer.zipCode();
                theZipField.parentElement.classList.add("is-dirty");
                let thePhoneField = document.getElementById("phone");
                thePhoneField.value = theCustomer.phone();
                thePhoneField.parentElement.classList.add("is-dirty");
                let thePlaceField = document.getElementById("place");
                thePlaceField.value = theCustomer.place();
                thePlaceField.parentElement.classList.add("is-dirty");
                let theMailField = document.getElementById("mail");
                theMailField.value = theCustomer.mail();
                theMailField.parentElement.classList.add("is-dirty");
                let theNotesField = document.getElementById("notes");
                theNotesField.value = theCustomer.notes();
                theNotesField.parentElement.classList.add("is-dirty");
                
                currentView.customer = theCustomer;
            });
        }
    }
    // set components
    saveNewCustomer() {
        console.log(this);
        let theBuilder = new CustomerBuilder(this.customer);
        theBuilder.firstname = document.getElementById("firstname").value;
        theBuilder.lastname = document.getElementById("lastname").value;
        theBuilder.birthday = document.getElementById("birthday").value;
        theBuilder.street = document.getElementById("street").value;
        theBuilder.zip = document.getElementById("zipCode").value;
        theBuilder.place = document.getElementById("place").value;
        theBuilder.notes = document.getElementById("notes").value;
        theBuilder.mail = document.getElementById("mail").value;
        theBuilder.phone = document.getElementById("phone").value;
        theBuilder.save();
        navigateToViewWithId("customers");
    }
}