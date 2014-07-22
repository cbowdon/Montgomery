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

class Result<T> {

    isSuccess: boolean;

    constructor(public value: T,
                public errors: string[]) {
        this.isSuccess = !!value;
    }

    static success(val: any) {
        return new Result(val, []);
    }

    static fail<Y>(errs: string[]) {
        return new Result<Y>(null, errs);
    }
}

interface RawEntry {
    [id: string]: string;
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
        var start: Date,
            prop: string,
            errs: string[] = [];

        for (prop in raw) {
            if (raw.hasOwnProperty(prop)) {
                if (!raw[prop]) {
                    errs.push("Invalid " + prop);
                }
            }
        }

        if (!/\d{1,2}:?\d\d/.test(raw.start)) {
            errs.push("Invalid time");
        }

        return errs.length > 0 ? Result.fail<RawEntry>(errs) : Result.success(raw);
    }
}
