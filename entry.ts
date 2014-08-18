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

    private entries: Entry[] = [];

    private date = new Date();

    constructor(store: Store) {
        store.addEventHandler(su => this.update(su.validated));
    }

    private update(rawEntries: Validated<RawEntry>[]) {
        if (!_.every(rawEntries, r => r.isValid)) {
            return;
        }

        var result = _.chain(rawEntries)
            .map(r => {
                var dateRes = ShortDate.parse(r.value.date),
                    timeRes = Time.parse(r.value.start);

                if (!dateRes || !timeRes) {
                    throw new Error('Invalid datetime.');
                }

                return {
                    project: r.value.project,
                    task: r.value.task,
                    start: {
                      date: dateRes.value,
                      time: timeRes.value
                    }
                };
            })
            //.sortBy(r =>
            .groupBy(r => r.project);

        console.log(result.value());
        // sort by start time
        // group by project
        // calculate minutes
        //throw new Error('not yet implemented');
    }
}

