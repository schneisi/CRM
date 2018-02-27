class ListGrid {

    constructor () {
        this.fields = [];
        this.objects = [];
        this.clickEventSelector = null;
    }
    
    addListGridField(aField) {
        this.fields.push(aField);
    }

    getHtml() {
        let theResultString = "<table class='listTable'>";
        
        //Builing Table Header
        theResultString += "<tr>";
        for (var i = 0; i < this.fields.length; i++) {
            let eachField = this.fields[i];
            theResultString += '<th>'+eachField.title + '</th>';
        }
        theResultString += "</tr>";

        //Building Table content
        for (var eachRowIndex = 0; eachRowIndex < this.objects.length; eachRowIndex++) {
            let eachObject = this.objects[eachRowIndex];
            if (this.clickEventSelector != null) {
                theResultString += '<tr onclick="' + this.clickEventSelector.name + '(' + eachRowIndex + ');">';
            } else {
                theResultString += "<tr>";
            }
            for (var eachFieldIndex = 0; eachFieldIndex < this.fields.length; eachFieldIndex++) {
                let eachField = this.fields[eachFieldIndex];
                let eachContentString = eachField.readSelector(eachObject);
                theResultString += '<td>' + eachContentString + '</td>'
                
            }
            theResultString += "</tr>";
        }

        theResultString += "</table>";
        return theResultString;
    }
}

class ListGridField {
    constructor (aTitleString, aSelectorCallback) {
        this.title = aTitleString;
        this.readSelector = aSelectorCallback;
    }
}


class ListGridHelper {
    constructor(aTitleString, aValue) {
        this.title = aTitleString;
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
        for (var eachRowIndex = 0; eachRowIndex < this.rows.length; eachRowIndex++) {
            theString += this.rows[eachRowIndex].getHtml();
        }
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


