class NewContractView extends BaseView {
    initializeView(){
        showSaveButton(this.saveNewContract);
        getmdlSelect.init(".getmdl-select");
            FbDatabase.getDatabaseSnapshot("products", function (aSnapshot) {
                let theInsurances = Insurance.createObjectsFromSnapshot(aSnapshot, Insurance);
                theInsurances.forEach(eachInsurance =>{
                    let theLi = document.createElement("li");
                    theLi.classList.add("mdl-menu__item");
                    theLi.innerHTML = eachInsurance.name();
                    document.getElementById("insuranceList").appendChild(theLi);
                });
                
            }, this);
        
    }

    saveNewContract(){

    }
}
