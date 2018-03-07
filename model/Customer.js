class Customer extends BaseDatabaseObject {

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
                FbDatabase.getDatabaseSnapshot("customers", theBirthdayCallback, "birthday", FbDatabase.birthdayStringForDate(new Date()), null, 3);
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
            remark: this.notes,
            address: {
                place: this.place,
                street: this.street,
                zip: this.zip,
            }
        }
        return theJsonObject;
    }
}

