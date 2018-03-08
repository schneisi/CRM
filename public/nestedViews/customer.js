include("model/Customer.js");
include("model/Contract.js");

let theCustomer;

class CustomerView extends BaseView {
    initializeView() {
        showEditMenuButton();
        showDeleteMenuButton();
        this.showCustomerData();
    }
    showCustomerData(){
        FbDatabase.getDatabaseSnapshot("/customers/" + getActionId(), function(aSnapshot) {
            theCustomer = new Customer(aSnapshot);
            theCustomer.loadContracts(currentView.showContracts);
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
        });
    }
    showContracts(aPromiseList) {
        Promise.all(aPromiseList).then(function () {
            let theString = "<br /> <center>Keine Verträge</center>";
            if (currentView.customer.contracts.length > 0) {
                let theListGrid = new ListGrid();
                theListGrid.clickEventSelector = currentView.insuranceClicked;
                theListGrid.addListGridField(new ListGridField("Datum", aContract => aContract.dateString()));
                theListGrid.addListGridField(new ListGridField("Produkt", aContract => aContract.insuranceName()));
                theListGrid.objects = currentView.customer.contracts;
                theString = theListGrid.getHtml();
                currentView.contractList = theListGrid;
            }
            
            document.getElementById("contractListDiv").innerHTML = theString;
        })
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

    insuranceClicked(anIndex) {
        let theInsurance = this.contractList.objects[anIndex];
        setActionId(theInsurance.key());
        navigateToViewWithId("insurance");
    }
}