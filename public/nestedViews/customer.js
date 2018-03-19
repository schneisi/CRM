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
            theListGrid.deleteSelector = currentView.deleteContractClicked;
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

    contractClicked(aContract) {
        setActionId("customers/" + currentView.customer.key() + "/contracts/" + aContract.key());
        navigateToViewWithId("contract");
    }

    newContractButtonClicked() {
        setActionId(this.customer.key());
        setActionString("customer");
        navigateToViewWithId("newContract");
    }

    deleteContractClicked(aContract){
        aContract.aboutToDelete();
        return true;
    }

    //Suggestions
    showSuggestions() {
        let theListGrid = new ListGrid();
        theListGrid.showTitle = false;
        theListGrid.clickEventSelector = this.suggestionClicked;
        theListGrid.noElementsString = "Keine Vorschläge";
        theListGrid.addListGridField(new ListGridField("", aHelper => aHelper.value));

        //CarInsurance
        if (theCustomer.ownsCar() && !theCustomer.hasCarInsurance()) {
            theListGrid.addObject(new ListGridHelper("carInsurance", "KFZ-Versicherung"));
        }

        //PrivateLiabilityInsurance
        if (theCustomer.completedInitialTraining() && !theCustomer.hasPrivateLiabilityInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Private-Haftplficht-Versicherung"));
        }

        if (theCustomer.hasPrivateHousehold() && !theCustomer.hasHouseInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Private Hausratsversicherung"));
        }

        if (theCustomer.isIndependent() && !theCustomer.hasPrivateLiabilityInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Private Hausratsversicherung"));
        } else if (!theCustomer.isIndependent() && !theCustomer.hasCompanyLiabilityInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Firmenrechtsschutzversicherung"));
        }

        if (theCustomer.ownsPrivateBuilding() && !theCustomer.hasPrivateBuildingInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Private Gebäudeversicherung"));
        }

        if (theCustomer.ownsCommercialBuilding() && !theCustomer.hasCommercialBuildingInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Firmen Gebäudeversicherung"));
        }

        if (theCustomer.getAge() > 67 && !theCustomer.isInterestInCapitalMarked() && !theCustomer.hasPensionInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Rentenversicherung"));
        } else if (theCustomer.getAge() > 67 && theCustomer.isInterestInCapitalMarked() && !theCustomer.hasUnitLinkedPensionInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Fondsgebundene Rentenversicherung"));
        }

        if (theCustomer.getAge() > 67) {
            if (!theCustomer.isInterestInCapitalMarked() && !theCustomer.hasPensionInsurance()) {
                theListGrid.addObject(new ListGridHelper("", "Rentenversicherung"));
            } else if (theCustomer.isInterestInCapitalMarked() && !theCustomer.hasUnitLinkedPensionInsurance()) {
                theListGrid.addObject(new ListGridHelper("", "Fondsgebundene Rentenversicherung"));
            }

            if (theCustomer.hadIllness()) {
                if (!theCustomer.hasDisabilityInsurance()) {
                    theListGrid.addObject(new ListGridHelper("", "Erwerbsunfähigkeitsversicherung"));
                }
                if (!theCustomer.hasBasicAbilityInsurance()) {
                    theListGrid.addObject(new ListGridHelper("", "Grundfähigkeitsversicherung"));
                }

                if (!theCustomer.hasDreadDiseaseInsurance()) {
                    theListGrid.addObject(new ListGridHelper("", "Dread-Disease Versicherung"));
                }
                
            } else {
                theListGrid.addObject(new ListGridHelper("", "Berufsunfähigkeitsversicherung"));
            }
        }

        if (!theCustomer.hasRiskLifeInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Risikolebensversicherung"));
        }

        if (!theCustomer.hasAccidentInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Unfallversicherung"));
        }

        if (theCustomer.earnsMoreThanAverage() && !theCustomer.isOfficial() && theCustomer.hasPrivateAddiationalHealthInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Private Krankenzusatzversicherung"));
        }

        if (theCustomer.isIndependent() || theCustomer.isOfficial() || theCustomer.isCrossBoarderCommuter() || theCustomer.earnsMoreThanAverage()) {
            theListGrid.addObject(new ListGridHelper("", "Private Krankenversicherung"));
        }

        if (theCustomer.hasLeadingPosition() && !theCustomer.hasDirectorsAndOfficersInsurance()) {
            theListGrid.addObject(new ListGridHelper("", "Vermögensschadensversicherung"));
        }

      

        theListGrid.setAsChildOf(document.getElementById("suggestionsDiv"));
    }

    suggestionClicked(aHelper) {
        let theId = aHelper.object;
        setActionId(theId);
        navigateToViewWithId("insurance");
    }
}