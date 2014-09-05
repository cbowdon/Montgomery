/// <reference path="../typings/tsd.d.ts" />
/// <reference path="publisher.ts" />
/// <reference path="validator.ts" />
/// <reference path="dispatcher.ts" />

interface RawEntry {
    date: string;
    project: string;
    task?: string;
    start: string;
}

interface StoreUpdate {
    validated: Validated<RawEntry>[];
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
        var validated = _.chain(rawEntries)
            .filter(re => _.some(_.values(re)))
            .map(re => this.validator.validate(re))
            .value();

        if (_.every(validated, v => v.isValid)) {
            this.save(_.map(validated, v => v.value));
        }
        this.publish({ validated: validated });
    }

    private save(rawEntries: RawEntry[]) {
        var serialized = JSON.stringify(rawEntries);
        localStorage.setItem(this.key, serialized);
    }
}
