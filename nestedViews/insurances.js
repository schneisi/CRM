let theList;

function initializeInsurances() {
    //TODO: Not Correct. Has to be the content-div, not the container
    const contentDiv = document.getElementById("contentContainer");

    theList = new ListGrid();
    theList.addListGridField(new ListGridField("Versicherungen", function (anObject) {
        return anObject.value;
    }));
    theList.objects.push(new ListGridHelper("Test", "Krankenversicherung ..."));
    theList.objects.push(new ListGridHelper("Test", "Lebensversucherung ..."));
    theList.clickEventSelector = insuranceClicked;
    let theDiv = document.createElement("div");
 
    theDiv.innerHTML = theList.getHtml();
    contentDiv.appendChild(theDiv);
}

function insuranceClicked(anIndex) {
    let theHelper = theList.objects[anIndex];
    console.log(theHelper.value)
}