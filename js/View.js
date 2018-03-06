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
}