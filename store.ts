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

class Result<T> {

    isSuccess: boolean;

    constructor(public value: T,
                public errors: string[]) {
        this.isSuccess = !!value;
    }

    static success(val) {
        return new Result(val, []);
    }

    static fail<Y>(errs) {
        return new Result<Y>(null, errs);
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

    static fromRaw(raw: RawEntry) : Result<Entry> {
        var start;
        if (!raw.project || !raw.task || !raw.start) {
            return Result.fail<Entry>(["Missing fields"]);
        }
        start = new Date(raw.start);
        if (!start) {
            return Result.fail<Entry>(["Invalid date"]);
        }
        return Result.success(new Entry(new Project(raw.project), raw.task, start, new Date()));
    }

    private validateRaw(raw: RawEntry) : Result<RawEntry> {
        var start, prop, errors = [];

        for (prop in raw) {
            if (raw.hasOwnProperty(prop)) {
                if (!raw[prop]) {
                    errors.push("Invalid " + prop);
                }
            }
        }

        start = new Date(raw.start);
        if (!start.getDate()) {
            errors.push("Invalid date");
        }

        return errors.length > 0 ? Result.fail<RawEntry>(errors) : Result.success(raw);
    }
}

interface StoreUpdate {
    store: Store;
    newEntry: Result<RawEntry>;
}

class Store extends Publisher<StoreUpdate> {

    private key = 'Montgomery';

    constructor(private dispatcher: Dispatcher) {
        super();
        dispatcher.register('entry', data => this.addEntry(data));
    }

    private rawEntries: RawEntry[] = [];

    entries: Entry[] = [];

    load() {
        var rawEntries = JSON.parse(localStorage.getItem(this.key));

        if (rawEntries) {
            rawEntries.forEach(e => this.addEntry(e));
        }
    }

    private addEntry(rawEntry: RawEntry) {
        // TODO validate
        this.rawEntries.push(rawEntry);
        this.save();
        this.dispatchEvent({ store: this, newEntry: Result.success(rawEntry) });
    }

    private save() {
        var serialized = JSON.stringify(this.rawEntries);
        localStorage.setItem(this.key, serialized);
    }
}
