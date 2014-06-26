/// <reference path="dispatcher.ts" />

interface EventEmitter {
    addEventListener(Callback) : void;
}

class Project {
    constructor(public name: string) {
    }
}

class Entry {
    minutes: number;
    constructor(public date: Date,
                public project: Project,
                public task: string,
                public start: Date,
                public end: Date) {
        this.minutes = (end.getTime() - start.getTime()) / (60 * 1000);
    }
}

class Store implements EventEmitter {

    addEntry(entry: Entry) {
        throw new Error('nyet');
    }

    addEventListener(cb) {
        throw new Error('nada');
    }
}

var AppStore = new Store();
