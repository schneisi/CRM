class ListGrid {

    constructor () {
        this.fields = [];
        this.objects = [];
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
        for (var i = 0; i < this.objects.length; i++) {
            let eachObject = this.objects[i];
            theResultString += "<tr>";
            for (var i = 0; i < this.fields.length; i++) {
                let eachField = this.fields[i];
                let eachContentString = eachField.readSelector(eachObject);
                theResultString += '<td>' + eachContentString + '</td>';
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