let theCustomer;

class CustomerView extends BaseView {
    initializeView() {
        showEditMenuButton();
        showDeleteMenuButton();
        this.initializeAccordion();
        this.showCustomerData();
    }
    showCustomerData(){
        FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function(aSnapshot) {
            theCustomer = new Customer(aSnapshot);
            theCustomer.loadContracts();
            currentView.showContracts();
            currentView.customer = theCustomer;
            const theContentDiv = document.getElementById("content");
            currentView.table = new StaticList(["30%", "70%"]);
            currentView.table
                .addRow(["Name", theCustomer.lastname()])
                .addRow(["Vorname", theCustomer.firstname()])
                .addRow(["Geschlecht", theCustomer.sex()])
                .addRow(["E-Mail", theCustomer.mail()])
                .addRow(["Telefon", theCustomer.phone()])
                .addRow(["Geburtstag", theCustomer.birthdayString()])
                .addRow(["Straße", theCustomer.street()])
                .addRow(["PLZ", theCustomer.zipCode()])
                .addRow(["Ort", theCustomer.place()])
                .addRow(["Bemerkung", aSnapshot.child("notes").val()]);
            currentView.updateName(theCustomer.lastname());
            document.getElementById("customerDataDiv").innerHTML = currentView.table.getHtml();
            document.getElementById("mapsFrame").src = theCustomer.mapsApiUrl();
        }, this);
    }
    showContracts() {
        Promise.all(theCustomer.promises).then(function () {
            let theListGrid = new ListGrid();
            theListGrid.clickEventSelector = currentView.contractClicked;
            theListGrid.addListGridField(new ListGridField("Datum", aContract => aContract.dateString()));
            theListGrid.addListGridField(new ListGridField("Produkt", aContract => aContract.insuranceName()));
            theListGrid.objects = currentView.customer.contracts;
            currentView.contractList = theListGrid;
            currentView.contractList.setAsChildOf(document.getElementById("contractListDiv"));
            currentView.showSuggestions();
        });
    }

    deleteMenuButtonClicked() {
        this.customer.aboutToDelete();
        navigateToViewWithId("customers");
    }

    editMenuButtonClicked() {
        navigateToViewWithId("newCustomerForm");
    }

    mapsButtonClicked() {
        callGoogleMaps(theCustomer.addressString());
    }

    contractClicked(aContract) {
        setActionId("customers/" + currentView.customer.key() + "/contracts/" + aContract.key());
        navigateToViewWithId("contract");
    }

    newContractButtonClicked() {
        setActionId(this.customer.key());
        setActionString("customer");
        navigateToViewWithId("newContract");
    }



    //Suggestions
    showSuggestions() {
        let theListGrid = new ListGrid();
        theListGrid.showTitle = false;
        theListGrid.noElementsString = "Keine Vorschläge";
        theListGrid.addListGridField(new ListGridField("", aHelper => aHelper.value));
        if (theCustomer.ownsCar() && !theCustomer.hasCarInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "KFZ-Versicherung"));
        }
        theListGrid.setAsChildOf(document.getElementById("suggestionsDiv"));
    }
}