class Task {
    #isCompleted = false;
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    set isCompleted(value) {
        if(typeof value !== 'boolean') {
            throw new Error('Must be of type boolean')
        }

        this.#isCompleted = value;
    }

    toggleCompletion() {
        this.#isCompleted = !this.#isCompleted;
    }

    displayDetails() {

    }
}

class TimedTask extends Task {
    constructor(title, description, isCompleted = false, startTime, endTime) {
        super(title, description, isCompleted)
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

function addTask(tasks, taskData) {
  const newTask = {
    ...taskData,
    id: Date.now()
  };

  return [...tasks, newTask];
}

let tasks = [];

tasks = addTask(tasks, { title: "Einkaufen", description: "Eier, Milch", isCompleted: false });
