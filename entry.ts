/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="result.ts" />
/// <reference path="shortdate.ts" />
/// <reference path="time.ts" />
/// <reference path="store.ts" />

class Project {
    constructor(public name: string) {}
}

class Entry {
    constructor(public project: Project,
                public task: string,
                public start: Date,
                public end: Date) {
    }

    minutes() {
        return (this.end.getTime() - this.start.getTime()) / (60 * 1000);
    }
}

function last<T>(arr: T[]) {
    var lastIx = arr.length - 1;
    return arr[lastIx];
}

class EntryCollection {

    constructor(store: Store) {
        store.addEventHandler(su => this.update(su.validated));
    }

    static extractEntries(rawEntries: RawEntry[]) {
        var result = _.chain(rawEntries)
            .map(r => {
                var dateRes = ShortDate.parse(r.date),
                    timeRes = Time.parse(r.start);

                if (!dateRes || !timeRes) {
                    throw new Error('Invalid datetime.');
                }

                return {
                    project: r.project,
                    task: r.task,
                    start: {
                      date: dateRes.value,
                      time: timeRes.value
                    }
                };
            })
            .sortBy(r => r.start.date.toMillis() + r.start.time.toMillis())
            .groupBy(r => r.project);

        // sort by start time
        // group by project
        // calculate minutes
        return result.value();
    }

    private update(rawEntries: Validated<RawEntry>[]) {
        if (!_.every(rawEntries, r => r.isValid)) {
            return;
        }

        var entries = EntryCollection.extractEntries(_.map(rawEntries, r => r.value));

        //throw new Error('not yet implemented');
    }
}

