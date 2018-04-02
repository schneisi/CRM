class NewContractView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewContract);
        this.setComponents();
        if (getActionString() == "contract"){
            FSDatabase.getDatabaseSnapshotForDoc(getActionId(), aSnapshot =>  {
                let theContract = new Contract(aSnapshot);
                this.dateField.value = theContract.isoDateString();
                this.productId.value = theContract.productId();
                this.remarkField.value = theContract.remark();
                this.remarkField.parentElement.classList.add("is-dirty");

                this.contract = theContract;
            }, this);
        }
        FSDatabase.getDatabaseSnapshotForCollection("products", aSnapshot =>  {
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
            getmdlSelect.init(".getmdl-select"); //Initialize the MDL-selectbox
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
        if (theBuilder.save()) {
            navigateToViewWithId("customer");
        } else {
            showModal("Fehler", theBuilder.errorStringBrSeparated());
        }
        
    }

    setComponents(){
        this.productId = document.getElementById("insurance");
        this.dateField = document.getElementById("dateField");
        this.remarkField = document.getElementById("remarkField");
    }
}
