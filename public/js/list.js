let ListGridGroupingModes = {
    NONE: "none",
    ALPHABETICAL: "alphabetical",
    NESTED_ARRAYS: "nested_arrays"
};


class ListGrid {
    constructor () {
        this.fields = [];
        this.objects = [];
        this.clickEventSelector = null;
        this.showTitle = true;
        this.noElementsString = "Keine Elemente";
        this.enableDeletion = false;
        this.view = currentView;
        this.deleteSelector = null;
        this.tableRows = [];
        this.isDeleteButtonVisible = false;
        this.groupingMode = ListGridGroupingModes.NONE;
        this.groups = [];
    }
    
    addListGridField(aField) {
        this.fields.push(aField);
    }

    addObject(anObject) {
        this.objects.push(anObject);
    }

    setAsChildOf(anElement) {
        while (anElement.firstChild) {
            anElement.removeChild(anElement.firstChild);
        }
        anElement.appendChild(this.getTableElement());
    }

    getTableElement() {
        let theReceiver = this;
    
        let theTableElement = document.createElement("table");
        theTableElement.classList.add("listTable");

        if (this.objects.length == 0) {
            theTableElement.innerHTML =  "<center>" + this.noElementsString + "</center>";
            return theTableElement;
        }

        //Builing Table Header
        if (this.showTitle) {
            let theTableRow = document.createElement("tr");
            this.fields.forEach(eachField => {
                let theTh = document.createElement("th");
                theTh.innerHTML = eachField.title;
                theTableRow.appendChild(theTh);
            });

            if (this.deleteSelector) {
                for (let i = 0; i < 2; i++) {
                    let theTh = document.createElement("th");
                    theTableRow.appendChild(theTh);
                }
            }
            theTableElement.appendChild(theTableRow);
            this.tableRows.push(theTableRow);
        }

        //Building Table content
        function groupHeadingRow(aString) {
            let theTr = document.createElement("tr");
            let theTd = document.createElement("td");
            theTd.innerHTML = aString;
            theTr.appendChild(theTd);
            if (theReceiver.deleteSelector) {
                theTr.appendChild(document.createElement("td"));
            }
            theTr.classList.add("listTable-groupRow");
            theTableElement.appendChild(theTr);
        };

        this.objects.forEach(eachObject => {
            if (this.groupingMode == ListGridGroupingModes.ALPHABETICAL) {
                let theFirstString = this.fields[0].readSelector(eachObject);
                let theFirstCharacter = theFirstString[0];
                if (this.groups.length == 0 || this.groups[this.groups.length - 1] != theFirstCharacter) {
                    groupHeadingRow(theFirstCharacter)
                    this.groups.push(theFirstCharacter);
                }
            }

            let theTableRow = document.createElement("tr");
            if (this.clickEventSelector != null) {
                let theTapHammer = new Hammer(theTableRow);
                theTapHammer.on("tap", function () {
                    if (theReceiver.isDeleteButtonVisible) {
                        theReceiver.hideDeleteButtons();
                    } else {
                        theReceiver.clickEventSelector(eachObject);
                    }
                });
            }

            for (var eachFieldIndex = 0; eachFieldIndex < this.fields.length; eachFieldIndex++) {
                let eachField = this.fields[eachFieldIndex];
                let eachContentString = eachField.readSelector(eachObject);
                let theTableDataElement = document.createElement("td");
                theTableDataElement.innerHTML = eachContentString;
                theTableRow.appendChild(theTableDataElement);
            }

            if (this.deleteSelector) {
                let theDummyTd = document.createElement("td");
                theDummyTd.style.display = "block";
                theTableRow.appendChild(theDummyTd);
                let theTd = document.createElement("td");
                theTd.style.backgroundColor = "red";
                theTd.style.display = "none";
                theTd.style.color = "white";
                theTd.style.width = "50px";
                theTd.innerHTML = "Löschen";
                let theDeleteTapHammer = new Hammer(theTd);
                theDeleteTapHammer.on("tap", aGesture => {
                    if (theReceiver.deleteSelector(eachObject)) {
                        theTableElement.removeChild(theTableRow);
                    }
                    theReceiver.isDeleteButtonVisible = false;
                });
                theTableRow.appendChild(theTd);
                
                let theHammer = Hammer(theTableRow);
                theHammer.on("swipeleft", aGesture => {
                    theReceiver.hideDeleteButtons();
                    theHammer.element.children[this.fields.length + 1].style.display = "";
                    theHammer.element.children[this.fields.length].style.display = "none";
                    this.isDeleteButtonVisible = true;
                });
            }
            this.tableRows.push(theTableRow);
            theTableElement.appendChild(theTableRow);
        });

        return theTableElement;
    }

    hideDeleteButtons() {
        this.tableRows.forEach(eachRow => {
            eachRow.children[this.fields.length + 1].style.display = "none";
            eachRow.children[this.fields.length].style.display = "block";
        });
        this.isDeleteButtonVisible = false;
    }
}

class ListGridField {
    constructor (aTitleString, aSelectorCallback) {
        this.title = aTitleString;
        this.readSelector = aSelectorCallback;
    }
}


class ListGridHelper {
    constructor(anObject, aValue) {
        this.object = anObject;
        this.value = aValue;
    }
}



class StaticList {
    constructor(anArray) {
        this.rows = [];
        this.rowWidths = anArray;
    }

    addRow(anArray) {
        let theRow = new StaticListRow(this);
        this.rows.push(theRow);
        for (var eachCellIndex = 0; eachCellIndex < anArray.length;eachCellIndex++) {
            theRow.addCell(anArray[eachCellIndex]);
        }
        return this;
    }

    getHtml() {
        let theString = '<table class="listTable mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">';
        this.rows.forEach( eachRow => {
            theString += eachRow.getHtml();
        });
        return theString + "</tr>";
    }
}

class StaticListRow {
    constructor(aStaticList) {
        this.staticList = aStaticList;
        this.cells = [];
    }

    addCell(aString) {
        let theCell = new StaticListCell(this, aString);
        this.cells.push(theCell);
    }

    getHtml() {
        let theString = "<tr>";
        for (var eachCellIndex = 0; eachCellIndex < this.cells.length; eachCellIndex++) {
            theString += this.cells[eachCellIndex].getHtml();
        }
        return theString + "</tr>";
    }
}

class StaticListCell {
    constructor(aRow, aString) {
        this.text = aString;
        this.isLeftAlign = true;
        this.row = aRow;
    }

    getHtml() {
        let theString;
        if (this.isLeftAlign) {
            theString = '<td class="mdl-data-table__cell--non-numeric">';
        } else {
            theString = "<td>";
        }
        return theString + this.text + "</td>";
    }
}