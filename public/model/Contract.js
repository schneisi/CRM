class Contract extends BaseDatabaseObject{

    constructor(aSnapshot) {
        super(aSnapshot);
        this.customer = null;
    }

    //Attributes
    customerId() {
        return this.reference().parent.parent.key;
    }
    productId(){
        return this.getValueOfChild("productId");
    }

    date(){
        return FbDatabase.dateForValue(this.getValueOfChild("date"));
    }

    remark() {
        return this.getValueOfChild("remark");
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


class ContractBuilder extends BaseBuilder {
    constructor(aContract) {
        super(aContract);
        this.date = new Date();
        if (aContract) {
            this.date = aContract.date();
            this.remark = aContract.remark();
            this.productId = aContract.productId();
            this.customerId = aContract.customerId();
        } else {
            this.remark = "";
        }
    }
    
    path() {
        return "customers/" + this.customerId + "/contracts";
    }

    getJson() {
        let theJson = {
            date: FbDatabase.valueForDate(this.date),
            productId: this.productId,
            remark: this.remark
        };
        return theJson
    }
}