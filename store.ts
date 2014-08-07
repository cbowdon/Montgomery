/// <reference path="result.ts" />
/// <reference path="time.ts" />
/// <reference path="validator.ts" />
/// <reference path="dispatcher.ts" />

interface EventHandler<T> {
    (evt: T): void;
}

class Publisher<T> {
    private handlers: EventHandler<T>[] = [];
    addEventHandler(handler: EventHandler<T>) {
        this.handlers.push(handler);
    }
    dispatchEvent(t: T) {
        this.handlers.forEach(h => h(t));
    }
}

interface RawEntry {
    date: string;
    project: string;
    task: string;
    start: string;
}

interface StoreUpdate {
    store: Store;
    newEntry: Result<RawEntry>;
}

class Store extends Publisher<StoreUpdate> {

    private key = 'Montgomery';

    private rawEntries: RawEntry[] = [];

    private validator = new RawEntryValidator();

    constructor(private dispatcher: Dispatcher) {
        super();
        dispatcher.register('entry', data => this.addRawEntry(data));
    }

    load() {
        var rawEntries: RawEntry[] = JSON.parse(localStorage.getItem(this.key));

        if (rawEntries) {
            rawEntries.forEach(e => this.addRawEntry(e));
        }
    }

    private addRawEntry(rawEntry: RawEntry) {
        var result = this.validator.validate(rawEntry);
        if (result.isSuccess) {
            this.rawEntries.push(result.value);
            this.save();
        }
        this.dispatchEvent({ store: this, newEntry: result });
    }

    private save() {
        var serialized = JSON.stringify(this.rawEntries);
        localStorage.setItem(this.key, serialized);
    }
}
