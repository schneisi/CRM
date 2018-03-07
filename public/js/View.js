class BaseView {
    constructor() {
        this.name = null;
    }

    initializeView() {
        
    }

    unload() {
        
    }

    updateName(aString) {
        this.name = aString;
        titleSpan.innerHTML = aString;
    }

    initializeAccordion() {
        let theAccordion = document.getElementsByClassName("accordion");
        Array.from(theAccordion).forEach(eachAccordion => {
            eachAccordion.addEventListener("click", function() {
                let thePanel = this.nextElementSibling;
                if (thePanel.classList.contains("panel-visible")) {
                    thePanel.classList.remove("panel-visible");
                } else {
                    thePanel.classList.add("panel-visible");
                }
            });
        });
    }
}

class HistoryObject {
    constructor(aJsonView, anActionId) {
        this.jsonView = aJsonView;
        this.actionId = anActionId;
    }
}