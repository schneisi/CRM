class Customer extends BaseDatabaseObject {

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
        return this.getValueOfChild("address/zip");
    }

    street() {
        return this.getValueOfChild("address/street");
    }

    place() {
        return this.getValueOfChild("address/place");
    }

    //API
    fullName() {
        return this.firstname() + " " + this.lastname();
    }
    addressString() {
        return this.street() + " " + this.zipCode() + " " + this.place();
    }
}