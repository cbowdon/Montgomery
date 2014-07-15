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
    project: string;
    task: string;
    start: string;
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
    latest: RawEntry;
}

class Store extends Publisher<StoreUpdate> {

    private key = 'Montgomery';

    constructor(private dispatcher: Dispatcher) {
        super();
        dispatcher.register('entry', data => this.addEntry(data));
    }

    rawEntries: RawEntry[] = [];

    entries: Entry[] = [];

    addEntry(rawEntry: RawEntry) {
        this.rawEntries.push(rawEntry);
        this.save();
        this.dispatchEvent({ store: this, latest: rawEntry });
    }

    load() {
        var rawEntries = JSON.parse(localStorage.getItem(this.key));

        if (rawEntries) {
            rawEntries.forEach(e => this.addEntry(e));
        }
    }

    private save() {
        var serialized = JSON.stringify(this.rawEntries);
        localStorage.setItem(this.key, serialized);
    }
}
