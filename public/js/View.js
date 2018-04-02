class BaseView {
    constructor() {
        this.name = null;
    }

    initializeView() {
        //Empty implementation => subclass may override
    }

    unload() {
        //Empty implementation => subclass may override
    }

    updateName(aString) {
        this.name = aString;
        titleSpan.innerHTML = aString;
    }

    getUserId() {
        return FSDatabase.getCurrentUserId();
    }

    initializeAccordion() {
        let theAccordion = document.getElementsByClassName("accordion");
        Array.from(theAccordion).forEach(eachAccordion => {
            eachAccordion.addEventListener("click", function() {
                let thePanel = this.nextElementSibling;
                if (thePanel.classList.contains("panel-visible")) {
                    thePanel.classList.remove("panel-visible");
                    eachAccordion.classList.remove("accordion-selected");
                } else {
                    thePanel.classList.add("panel-visible");
                    eachAccordion.classList.add("accordion-selected");
                }
            });
        });
    }
}

//Helper object used in browser history to save application state
class HistoryObject {
    constructor(aJsonView, anActionId) {
        this.jsonView = aJsonView;
        this.actionId = anActionId;
    }
}

//Checkbox-wrapper -> makes it easier to use MDL
class CheckBoxHelper {
    constructor(anIdString) {
        this.checkboxId = anIdString;
        this.mdlComponent = document.getElementById(this.checkboxId + "MDL").MaterialCheckbox;
        this.component = document.getElementById(this.checkboxId);
    }

    //API
    isChecked() {
        return this.component.checked;
    }

    check() {
        this.mdlComponent.check();
    }

    disable() {
        this.mdlComponent.disable();
    }
}