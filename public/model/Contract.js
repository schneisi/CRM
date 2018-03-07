class Contract extends BaseDatabaseObject{

    constructor(aSnapshot) {
        super(aSnapshot);
        this.customer = null;
    }

    //Attributes
    customerId(){
        return this.getValueOfChild("customerId");
    }

    productId(){
        return this.getValueOfChild("productId");
    }

    date(){
        return FbDatabase.dateForValue(this.getValueOfChild("date"));
    }

    //API
    loadInsurance() {
        let theReceiver = this;
        return new Promise(function (resolve, reject) {
            FbDatabase.getDatabaseSnapshot("products/" + theReceiver.productId(), aSnapshot => {
                theReceiver.insurance = new Insurance(aSnapshot);
                resolve(theReceiver);
            });
        });
    }
    dateString() {
        return this.stringForDate(this.date());
    }
    insuranceName() {
        return this.insurance.name();
    }

}