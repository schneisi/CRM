class NewContractView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewContract);
        
            FbDatabase.getDatabaseSnapshot("products", function (aSnapshot) {
                let theInsurances = Insurance.createObjectsFromSnapshot(aSnapshot, Insurance);
                theInsurances.forEach(eachInsurance =>{
                    let theLi = document.createElement("li");
                    theLi.classList.add("mdl-menu__item");
                    theLi.setAttribute("data-val", eachInsurance.key());
                    theLi.innerHTML = eachInsurance.name();
                    document.getElementById("insuranceList").appendChild(theLi);
                });
                getmdlSelect.init(".getmdl-select");
            }, this);
        
    }

    saveNewContract(){
        let theBuilder = new ContractBuilder(this.contract);
        theBuilder.date = new Date(document.getElementById("dateField").value);
        if (getActionString() == "customer"){
            theBuilder.customerId = getActionId();
        }
        theBuilder.productId = document.getElementById("insuranceValueField").value;
        theBuilder.save();
        navigateToViewWithId("customer");
    }
}
