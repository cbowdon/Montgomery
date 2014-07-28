/// <reference path="result.ts" />
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
    [id: string]: string;
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

    constructor(private dispatcher: Dispatcher) {
        super();
        dispatcher.register('entry', data => this.addRawEntry(data));
    }

    private rawEntries: RawEntry[] = [];

    load() {
        var rawEntries: RawEntry[] = JSON.parse(localStorage.getItem(this.key));

        if (rawEntries) {
            rawEntries.forEach(e => this.addRawEntry(e));
        }
    }

    private addRawEntry(rawEntry: RawEntry) {
        var result = this.validate(rawEntry);
        if (result.isSuccess) {
            this.rawEntries.push(rawEntry);
            this.save();
        }
        this.dispatchEvent({ store: this, newEntry: result });
    }

    private save() {
        var serialized = JSON.stringify(this.rawEntries);
        localStorage.setItem(this.key, serialized);
    }

    private validate(raw: RawEntry) : Result<RawEntry> {
        var prop: string,
            errs: string[] = [];

        for (prop in raw) {
            if (raw.hasOwnProperty(prop)) {
                if (!raw[prop]) {
                    errs.push('Invalid ' + prop);
                }
            }
        }

        if (!Time.parse(raw.start).isSuccess) {
            errs.push('Invalid time');
        }

        if (isNaN(Date.parse(raw.date))) {
            errs.push('Invalid date');
        }

        return errs.length > 0 ? Result.fail<RawEntry>(errs) : Result.success(raw);
    }
}
