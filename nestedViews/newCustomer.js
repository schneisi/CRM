function initializeNewCustomer(){
    showSaveButton(saveNewCustomer);

    if (hasActionId()) {

        FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function (aSnapshot) {
            theCustomer = new Customer(aSnapshot);
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
        });
    }
}

function saveNewCustomer(){
    console.log("Customer Saved")
}