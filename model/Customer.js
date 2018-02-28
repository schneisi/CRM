class Customer extends BaseDatabaseObject {
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

    addressString() {
        return this.street() + " " + this.zipCode() + " " + this.place();
    }
}