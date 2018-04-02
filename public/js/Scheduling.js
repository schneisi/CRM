let scheduler; //Singleton instance

class Scheduler {    
    constructor() {
        if (scheduler) {
            return scheduler;
        } else {
            this.tasks = [];
            this.isActive = true;
            this.seconds = 0;
            this.interval = setInterval(function (){scheduler.loop();}, 1000);
        }
    }

    static get instance() {
        return new Scheduler();
    }

    addTask (aScheduledTask) {
        this.tasks.push(aScheduledTask);
        aScheduledTask.counterOffset = this.seconds;
    }

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
    }

    hasTaskWithName(aNameString) {
        let theFoundBoolean = false;
        for (var eachIndex = 0; eachIndex < this.tasks.length; eachIndex++) {
            let eachTask = this.tasks[eachIndex];
            if (eachTask.name == aNameString) {
                theFoundBoolean = true;
                break;
            }
        };
        return theFoundBoolean;
    }

    loop() {
        if (this.isActive) {
            this.tasks.forEach(eachTask => {
                if (eachTask.isActive && (eachTask.counterOffset + this.seconds) % eachTask.interval == 0) {
                    if (this.isIdleCallbackAvailable && !eachTask.isHighPriority) {
                        requestIdleCallback(eachTask.execute.bind(eachTask), {timeout: eachTask.deadline});
                    } else {
                        eachTask.execute();
                    }
                }
            });
        }
        this.seconds++;
    }

    isIdleCallbackAvailable() {
        //Answer whether the browser supports idle callbacks. Seel https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback for details
        return 'requestIdleCallback' in window;
    }
}

scheduler = new Scheduler();

class ScheduledTask {
    constructor(aNameString, aCallback, aIntervalNumber, aBoolean = true) {
        this.name = aNameString;
        this.callback = aCallback;
        this.counter = 0;
        this.interval = aIntervalNumber;
        this.isActive = aBoolean;
        this.counterOffset = 0;
        this.isHighPriority = false;
        this.deadline = 10*1000;
    }

    execute() {
        this.callback();
        logString("Task " + this.name + " done");
        this.counter++;
    }

    totalSeconds() {
        return this.interval + this.counterOffset;
    }
}