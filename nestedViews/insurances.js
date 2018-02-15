let theList

function initializeInsurances() {
    //TODO: Not Correct. Has to be the content-div, not the container
    const contentDiv = document.getElementById("contentContainer");

    theList = new ListGrid();
    theList.addListGridField(new ListGridField("Versicherungen", function (anObject) {
        return anObject.value;
    }));
    theList.objects.push(new ListGridHelper("Test", "Krankenversicherung ..."));
    let theDiv = document.createElement("div");
 
    theDiv.innerHTML = theList.getHtml();
    contentDiv.appendChild(theDiv);
}

function insuranceClicked(anIndex) {
    let theInsurance = theList.objects[anIndex];
}


