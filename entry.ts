/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="result.ts" />
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

    private update(rawEntries: Result<RawEntry>[]) {
        if (!_.every(rawEntries, r => r.isSuccess)) {
            return;
        }
        var result = _.chain(rawEntries)
            .map(v => v.value)
            .map(r => { return { project: r.project, task: r.task, start: this.extractTime(r.start) } })
            .groupBy(r => r.project);

        console.log(result.value());
        // group by project
        // sort by start time
        // calculate minutes
        //throw new Error('not yet implemented');
    }

    private addEntry(raw: RawEntry) {

        var project = new Project(raw.project),
            task = raw.task,
            start = this.extractTime(raw.start),
            prev = last(this.entries);

        if (prev) {
            prev.end = start;
        }

        this.entries.push(new Entry(project, task, start, new Date()));
    }

    private extractTime(rawStart: string) {
        var timeResult = Time.parse(rawStart),
            year = this.date.getFullYear(),
            month = this.date.getMonth(),
            day = this.date.getDate(),
            time: Time;

        if (!timeResult.isSuccess) {
            throw new TypeError('Cannot parse time: ' + rawStart);
        }

        time = timeResult.value;

        return new Date(year, month, day, time.hour, time.minute);
    }
}

