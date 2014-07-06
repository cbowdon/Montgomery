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
    constructor(public name: string) {}
}

interface RawEntry {
    project: Project;
    task: string;
    start: Date;
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

    constructor(private dispatcher: Dispatcher) {
        super();
        dispatcher.register('entry', data => this.addEntry(data));
    }

    rawEntries: RawEntry[] = [];

    entries: Entry[] = [];

    addEntry(rawEntry: RawEntry) {
        this.rawEntries.push(rawEntry);
        this.save();
        this.dispatchEvent({ store: this });
    }

    load() {
        var entries = JSON.parse(localStorage.getItem('Montgomery'));
        if (!entries || entries.length === 0) {
            this.dispatchEvent({ store: this });
        }
        entries.forEach(e => this.addEntry(e));
    }

    private save() {
        localStorage.setItem('Montgomery', JSON.stringify(this.entries));
    }
}
