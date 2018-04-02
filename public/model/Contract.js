class Contract extends BaseDatabaseObject{

    constructor(aSnapshot) {
        super(aSnapshot);
        this.customer = null;
    }

    //Attributes
    customerId() {
        return this.reference().parent.parent.id;
    }
    productId(){
        return this.getValueOfChild("productId");
    }

    date(){
        return FSDatabase.dateForValue(this.getValueOfChild("date"));
    }

    remark() {
        return this.getValueOfChild("remark");
    }

    type() {
        return this.insurance.type();
    }

    //API
    loadInsurance() {
        //Answers a promises that resolves when the insurances are loaded from firebase
        let theReceiver = this;
        return new Promise(function (resolve, reject) {
            FSDatabase.getDatabaseSnapshotForDoc("products/" + theReceiver.productId(), aSnapshot => {
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
    isoDateString() {
        return this.isoStringForDate(this.date());
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
            date: FSDatabase.valueForDate(this.date),
            productId: this.productId,
            remark: this.remark
        };
        return theJson
    }

    errorJson() {
        return {
            1: "Ungültiges Datum",
            2: "Ungültiges Produkt"
        }
    }

    check() {
        if (!this.date.isValid()) {
            this.addError(1);
        }
        if (!this.productId || this.productId <= 0) {
            this.addError(2);
        }
    }
}