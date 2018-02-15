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