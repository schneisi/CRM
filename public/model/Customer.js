class Customer extends BaseDatabaseObject {

    constructor(aSnapshot){
        super(aSnapshot);
        this.contracts = [];
    }

    //Attributes
    firstname() {
        return this.getValueOfChild("firstname");
    }

    lastname() {
        return this.getValueOfChild("lastname");
    }

    phone() {
        return this.getValueOfChild("phone");
    }

    mail() {
        return this.getValueOfChild("mail");
    }

    zipCode() {
        return this.getValueOfChild("address/zip");
    }

    street() {
        return this.getValueOfChild("address/street");
    }

    place() {
        return this.getValueOfChild("address/place");
    }
    birthday() {
        return new Date(this.getValueOfChild("birthday"));
    }
    sex() {
        return this.getValueOfChild("sex");
    }
    notes() {
        return this.getValueOfChild("notes");
    }

    //API
    fullName() {
        return this.firstname() + " " + this.lastname();
    }
    tableName() {
        return this.lastname() + ", " + this.firstname();
    }
    addressString() {
        return this.street() + " " + this.zipCode() + " " + this.place();
    }
    birthdayString() {
        return this.stringForDate(this.birthday());
    }
    isoBirthdayOnlyString() {
        let theDateMonth = this.birthday().getMonth() + 1;
        return this.birthday().getFullYear() + "-" + this.getFullStringForNumber(theDateMonth) + "-" + this.getFullStringForNumber(this.birthday().getDate());
    }

    mapsApiUrl() {
        let apiKey = "AIzaSyCeZvXTabw2_pt2TnB7KnfmcOndEbDwvhk";
        return "https://www.google.com/maps/embed/v1/place?key=" + apiKey + "&q=" + encodeURI(this.addressString());
    }

    loadContracts(){
        let theReceiver = this;
        this.promises = [];
        this.snapshot.child("contracts").forEach(eachChildSnapshot => {
            let theContract = new Contract(eachChildSnapshot);
            theReceiver.contracts.push(theContract);
            theReceiver.promises.push(theContract.loadInsurance());
        });
    }

    static createTask() {
        //BirthdayTask
        let theBirthdayTaskName = "BirthdayTask"
        if (Scheduler.instance.hasTaskWithName(theBirthdayTaskName)) {
            this.showUpcomingBirthdays();
        } else {
            let theBirthdayTask = new ScheduledTask(theBirthdayTaskName, function () {
                let theBirthdayCallback = aSnapshot => {
                    Customer.upcomingBirthdays = Customer.createObjectsFromSnapshot(aSnapshot, Customer);
                    if (currentView instanceof DashboardView) {
                        currentView.showUpcomingBirthdays();
                    }
                }
                let theOptions = {
                    orderChild: "birthday",
                    startObject: FbDatabase.birthdayStringForDate(new Date()),
                    limit: 3
                }
                FbDatabase.getDatabaseSnapshot("customers", theBirthdayCallback, null, theOptions);
            }, 60);
            Scheduler.instance.addTask(theBirthdayTask);
        }
    }
}

Customer.upcomingBirthdays = [];
Customer.createTask();



class CustomerBuilder extends BaseBuilder {
    constructor(anObject) {
        super(anObject);
        this.firstname = null;
        this.lastname = null;
        this.path = "customers";
        this.birthday = null;
        this.sex = null;
        this.phone = null;
        this.mail = null;
        this.zip = null;
        this.place = null;
        this.street = null;
        this.notes = null;
    }
    getJson() {
        let theJsonObject = {
            lastname: this.lastname,
            firstname: this.firstname,
            mail: this.mail,
            birthday: this.birthday.getMonth() + 1 + "/" + this.birthday.getDate() + "/" + this.birthday.getFullYear(),
            sex: this.sex,
            phone: this.phone,
            notes: this.notes,
            address: {
                place: this.place,
                street: this.street,
                zip: this.zip,
            }
        }
        return theJsonObject;
    }
}

