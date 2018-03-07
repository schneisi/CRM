class Contract extends BaseDatabaseObject{

    customerId(){
        return this.getValueOfChild("customerId");
    }

    productId(){
        return this.getValueOfChild("productId");
    }

    date(){
        return fbDatabase.dateForValue(this.getValueOfChild("date"));
    }

}