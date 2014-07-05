/// <reference path="dispatcher.ts" />

interface EventHandler<T> {
    (T): void;
}

class Publisher<T> {
    private handlers: EventHandler<T>[] = [];
    addEventHandler(handler) {
        this.handlers.push(handler);
    }
    dispatchEvent(t: T) {
        this.handlers.forEach(h => h(t));
    }
}

class Project {
    constructor(public name: string) {
    }
}

class Entry {
    minutes: number;
    constructor(public project: Project,
                public task: string,
                public start: Date,
                public end: Date) {
        this.minutes = (end.getTime() - start.getTime()) / (60 * 1000);
    }
}

interface StoreUpdate {
    store: Store;
    newEntry?: Entry;
}

class Store extends Publisher<StoreUpdate> {

    entries: Entry[] = [];

    addEntry(entry: Entry) {
        this.entries.push(entry);
        this.dispatchEvent({ store: this, newEntry: entry });
    }
}

var AppStore = new Store();
