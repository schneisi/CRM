function initializeReadOnlyInsurance(){
    const theContentDiv = document.getElementById("content");
    let theTable = new StaticList(["30%", "70%"]);
 
    getDatabaseSnapshot("/products/" + getActionId(), function (aSnapshot) {
        let theName = aSnapshot.child("name").val();
        let theDescription = aSnapshot.child("description").val();
        let theProviders = aSnapshot.child("/providers/");
        theTable
            .addRow(["Versicherung: ", theName])
            .addRow(["Beschreibung: ", theDescription]);

        getDatabaseSnapshot("/products/" + getActionId() + "/providers", function (aSnapshot) {
            let thePrividerListString = "<ul id='customerContractsList'>"
            aSnapshot.forEach(function (aChildSnapshot) {
                thePrividerListString = thePrividerListString + "<li>" + (aChildSnapshot.child("name").val()) + "</li>";
            })
            thePrividerListString = thePrividerListString + "</ul>";
            theTable.addRow(["Mögliche Anbieter: ", thePrividerListString]);
            let theTableDiv = document.createElement("div");
            theTableDiv.innerHTML = theTable.getHtml();
            theContentDiv.appendChild(theTableDiv);
            hideSpinner();
        })

        
    })
    
    
 
    

    
    
}