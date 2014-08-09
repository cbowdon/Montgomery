/// <reference path="typings/underscore/underscore.d.ts" />
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
    validated: Result<RawEntry>[];
}

class Store extends Publisher<StoreUpdate> {

    private key = 'Montgomery';

    private validator = new RawEntryValidator();

    constructor(private dispatcher: Dispatcher) {
        super();
        dispatcher.register('entry', data => this.update(data));
    }

    load() {
        var rawEntries: RawEntry[] = JSON.parse(localStorage.getItem(this.key));

        if (rawEntries) {
            this.update(rawEntries);
        }
    }

    private update(rawEntries: RawEntry[]) {
        var validated = _.map(rawEntries, re => this.validator.validate(re));

        if (_.every(validated, v => v.isSuccess)) {
            this.save(rawEntries);
        }
        this.dispatchEvent({ validated: validated });
    }

    private save(rawEntries: RawEntry[]) {
        var serialized = JSON.stringify(rawEntries);
        localStorage.setItem(this.key, serialized);
    }
}
