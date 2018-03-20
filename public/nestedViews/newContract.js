class NewContractView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewContract);
        this.setComponents();
        if (getActionString() == "contract" ){
            FbDatabase.getDatabaseSnapshot(getActionId(), function (aSnapshot) {
                let theContract = new Contract(aSnapshot);
                currentView.dateField.value = theContract.isoDateString();
                currentView.productId.value = theContract.productId();
                currentView.remarkField.value = theContract.remark();
                currentView.remarkField.parentElement.classList.add("is-dirty");

                currentView.contract = theContract;
            });
        }
        FbDatabase.getDatabaseSnapshot("products", function (aSnapshot) {
            let theInsurances = Insurance.createObjectsFromSnapshot(aSnapshot, Insurance);
            theInsurances.forEach(eachInsurance =>{
                let theLi = document.createElement("li");
                theLi.classList.add("mdl-menu__item");
                theLi.setAttribute("data-val", eachInsurance.key());
                theLi.innerHTML = eachInsurance.name();
                if (this.contract && this.contract.productId() == eachInsurance.key()) {
                    theLi.setAttribute("data-selected", true);
                }
                document.getElementById("insuranceList").appendChild(theLi);
            });
            getmdlSelect.init(".getmdl-select");
        }, this);
    }

    saveNewContract(){
        let theBuilder = new ContractBuilder(this.contract);
        theBuilder.date = new Date(this.dateField.value);
        if (getActionString() == "customer"){
            theBuilder.customerId = getActionId();
        } else {
            setActionId(this.contract.customerId());
        }
        theBuilder.remark = this.remarkField.value;
        theBuilder.productId = document.getElementById("insuranceValueField").value;
        theBuilder.save();
        navigateToViewWithId("customer");
    }

    setComponents(){
        this.productId = document.getElementById("insurance");
        this.dateField = document.getElementById("dateField");
        this.remarkField = document.getElementById("remarkField");
    }
}
