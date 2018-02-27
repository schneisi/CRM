function initializeReadOnlyInsurance(){
    const theContentDiv = document.getElementById("content");
    let theTable = new StaticList(["30%", "70%"]);
    
    let theName = "Krankenversicherung";
    let theDiscription = "Versicherung bei Krankheit";
    
    theTable
        .addRow(["Versicherung: ", theName])
        .addRow(["Beschreibung: ", theDiscription])
        .addRow(["Mögliche Anbieter: ", "<ul id='customerContractsList'><li>Zurich</li><li>Allianz</li></ul>"]);

    let theTableDiv = document.createElement("div");
    theTableDiv.innerHTML = theTable.getHtml();
    theContentDiv.appendChild(theTableDiv);
}