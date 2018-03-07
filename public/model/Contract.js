class Contract extends BaseDatabaseObject{

    constructor(aSnapshot) {
        super(aSnapshot);
        this.customer = null;
    }
    customerId(){
        return this.getValueOfChild("customerId");
    }

    productId(){
        return this.getValueOfChild("productId");
    }

    date(){
        return FbDatabase.dateForValue(this.getValueOfChild("date"));
    }

}