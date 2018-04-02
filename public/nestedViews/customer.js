let theCustomer;

class CustomerView extends BaseView {
    initializeView() {
        showEditMenuButton();
        showDeleteMenuButton();
        this.initializeAccordion();
        this.showCustomerData();
    }
    showCustomerData(){
        FSDatabase.getDatabaseSnapshotForDoc("/customers/" + getActionId(), aSnapshot => {
            theCustomer = new Customer(aSnapshot);
            this.customer = theCustomer;
            this.updateName(theCustomer.lastname());
            theCustomer.loadContracts(this.showContracts);
            let theTable = new StaticList(); 
            theTable
                .addRow(["Name", theCustomer.lastname()])
                .addRow(["Vorname", theCustomer.firstname()])
                .addRow(["Geschlecht", theCustomer.sex()])
                .addRow(["E-Mail", theCustomer.mailLink()])
                .addRow(["Telefon", theCustomer.phoneLink()])
                .addRow(["Geburtstag", theCustomer.birthdayString()])
                .addRow(["Straße", theCustomer.street()])
                .addRow(["PLZ", theCustomer.zipCode()])
                .addRow(["Ort", theCustomer.place()])
                .addRow(["Bemerkung", theCustomer.notes()]);
            
            document.getElementById("customerDataDiv").innerHTML = theTable.getHtml();
            this.showCustomerInfo();
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
        setActionId("customers/" + aContract.customerId() + "/contracts/" + aContract.key());
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
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.CAR_INSURANCE, "KFZ-Versicherung"));
        }

        //PrivateLiabilityInsurance
        if (theCustomer.completedInitialTraining() && !theCustomer.hasPrivateLiabilityInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.PRIVATE_LIABILITY_INSURANCE, "Private-Haftpflicht-Versicherung"));
        }

        //House Insurance
        if (theCustomer.hasPrivateHousehold() && !theCustomer.hasHouseInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.HOUSE_INSURANCE, "Private Hausratsversicherung"));
        }

        //Rechtsschutz
        if (!theCustomer.isIndependent() && !theCustomer.hasLegalExpensesInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.LEGAL_EXPENSES_INSURANCE, "Private Rechtschutzversicherung"));
        } else if (theCustomer.isIndependent() && !theCustomer.hasCompanyLegalExpensesInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.COMPANY_LIABILITY_INSURANCE, "Firmen Rechtsschutzversicherung"));
        }

        //Private Building Insurance
        if (theCustomer.ownsPrivateBuilding() && !theCustomer.hasPrivateBuildingInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.PRIVATE_BUILDING_INSURANCE, "Private Gebäudeversicherung"));
        }

        //Commercial Building Insurance
        if (theCustomer.ownsCommercialBuilding() && !theCustomer.hasCommercialBuildingInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.COMMERCIAL_BUILDING_INSURANCE, "Firmen Gebäudeversicherung"));
        }

        /*
        Pension Insurance
        Disability Insurance
        Basic Ability Insurance
        Dread Disease Insurance
        */
        if (theCustomer.ageInFullYears() < 67) {
            if (!theCustomer.isInterestInCapitalMarked() && !theCustomer.hasPensionInsurance()) {
                theListGrid.addObject(new ListGridHelper(InsuranceTypes.PENSION_INSURANCE, "Rentenversicherung"));
            } else if (theCustomer.isInterestInCapitalMarked() && !theCustomer.hasUnitLinkedPensionInsurance()) {
                theListGrid.addObject(new ListGridHelper(InsuranceTypes.UNIT_LINKED_PENSION_INSURANCE, "Fondsgebundene Rentenversicherung"));
            }

            if (theCustomer.hadIllness()) {
                if (!theCustomer.hasDisabilityInsurance()) {
                    theListGrid.addObject(new ListGridHelper(InsuranceTypes.DISABILITY_INSURANCE, "Erwerbsunfähigkeitsversicherung"));
                }
                if (!theCustomer.hasBasicAbilityInsurance()) {
                    theListGrid.addObject(new ListGridHelper(InsuranceTypes.BASIC_ABILITY_INSURANCE, "Grundfähigkeitsversicherung"));
                }

                if (!theCustomer.hasDreadDiseaseInsurance()) {
                    theListGrid.addObject(new ListGridHelper(InsuranceTypes.DREAD_DISEASE_INSURANCE, "Dread-Disease Versicherung"));
                }

            } else if (!theCustomer.hasUnableToWorkInsurance()) {
                theListGrid.addObject(new ListGridHelper(InsuranceTypes.UNABLE_TO_WORK_INSURANCE, "Berufsunfähigkeitsversicherung"));
            }
        } else {
            if (!theCustomer.hasRiesterPension() && !theCustomer.isIndependent() || theCustomer.partnerIsEmployee()) {
                theListGrid.addObject(new ListGridHelper(InsuranceTypes.RIESTER_PENSION, "Riester Rente"));
            } else if (!theCustomer.hasRuerupPension()) {
                theListGrid.addObject(new ListGridHelper(InsuranceTypes.RUERUP_PENSION, "Rürup Rente"));
            }
            
        }



        //Risklife Insurance
        if (!theCustomer.hasRiskLifeInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.RISK_LIFE_INSURANCE, "Risikolebensversicherung"));
        }

        //AccidentInsurance
        if (!theCustomer.hasAccidentInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.ACCIDENT_INSURANCE, "Unfallversicherung"));
        }

        //Private Additional Health Insurance
        if (theCustomer.earnsMoreThanAverage() && !theCustomer.isOfficial() && theCustomer.hasPrivateAdditionalHealthInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.PRIVATE_ADDITIONAL_HEALTH_INSURANCE, "Private Krankenzusatzversicherung"));
        }

        //Private Health Insurance
        if (theCustomer.isIndependent() || theCustomer.isOfficial() || theCustomer.isCrossBorderCommuter() || theCustomer.earnsMoreThanAverage()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.PRIVATE_HEALTH_INSURANCE, "Private Krankenversicherung"));
        }

        //Directors And Officers Insurance
        if (theCustomer.hasLeadingPosition() && !theCustomer.hasDirectorsAndOfficersInsurance()) {
            theListGrid.addObject(new ListGridHelper(InsuranceTypes.DIRECTORS_AND_OFFICERS_INSURANCE, "Vermögensschadensversicherung"));
        }

      

        theListGrid.setAsChildOf(document.getElementById("suggestionsDiv"));
    }

    suggestionClicked(aHelper) {
        let theId = aHelper.object;
        setActionId(theId);
        navigateToViewWithId("insurance");
    }

    showCustomerInfo(){
        let theTable = new StaticList();
        theTable
            .addRow(["Besitzt KFZ", this.stringForBoolean(theCustomer.ownsCar())])
            .addRow(["Hat eine Ausbildung abgeschlossen",this.stringForBoolean(theCustomer.completedInitialTraining())])
            .addRow(["Kunde ist Selbstständig", this.stringForBoolean(theCustomer.isIndependent())])
            .addRow(["Kunde ist Beamter", this.stringForBoolean(theCustomer.isOfficial())])
            .addRow(["Kunde hat führende Position", this.stringForBoolean(theCustomer.hasLeadingPosition())])
            .addRow(["Kunde ist vermögend", this.stringForBoolean(theCustomer.earnsMoreThanAverage())])
            .addRow(["Besitzt privat genutztes Gebäude", this.stringForBoolean(theCustomer.ownsPrivateBuilding())])
            .addRow(["Besitzt gewerblich genutztes Gebäude", this.stringForBoolean(theCustomer.ownsCommercialBuilding())])
            .addRow(["Führt privaten Haushalt",this.stringForBoolean(theCustomer.hasPrivateHousehold())])
            .addRow(["Ist am Kapitalmarkt interessiert", this.stringForBoolean(theCustomer.isInterestInCapitalMarked())])
            .addRow(["Kunde hat eine Vorerkrankung",this.stringForBoolean(theCustomer.hadIllness())])
            .addRow(["Der Ehepartner ist angestellte/r", this.stringForBoolean(theCustomer.partnerIsEmployee())])
            .addRow(["Der Kunde ist Grenzgänger", this.stringForBoolean(theCustomer.isCrossBorderCommuter())]);
        document.getElementById("customerInformation").innerHTML = theTable.getHtml();

    }

    stringForBoolean(aBoolean){
        if(aBoolean){
            return "Ja";
        }else{
            return "Nein";
        }

    }
}