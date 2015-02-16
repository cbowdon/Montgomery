/// <reference path="../typings/tsd.d.ts" />
/// <reference path="store.ts" />

interface Entry {
    project: string;
    task: string;
    minutes: number;
    date: Moment;
}

interface TimeEntry extends Entry {
    start: Moment;
    end: Moment;
}

interface EntryUpdate {
    entries: Entry[];
}

function toTimeEntry(r: RawEntry) {
    var dateRes = moment(r.date, PREFERRED_DATE_FORMAT, true),
    timeRes = moment(r.start, PREFERRED_TIME_FORMAT, true);

    if (!dateRes.isValid() || !timeRes.isValid()) {
        throw new Error('Invalid datetime.');
    }

    timeRes.year(dateRes.year());
    timeRes.month(dateRes.month());
    timeRes.date(dateRes.date());

    return {
        project: r.project,
        task: r.task,
        date: dateRes,
        start: timeRes,
        end: <Moment>undefined,
        minutes: <number>undefined
    };
}

function calculateMinutes(day: TimeEntry[]) : TimeEntry[] {

    if (day.length < 2) {
        return [];
    }

    return _.chain(day)
        .sortBy(r => r.start.format())
        .reduce((acc, r, i) => {
            if (i === 0) {
                return [r];
            }

            acc[i - 1].end = r.start;
            acc[i - 1].minutes = acc[i - 1].end.diff(acc[i - 1].start) / (60 * 1000)

            if (i !== day.length - 1) {
                acc.push(r);
            }

            return acc;
        }, [])
        .value();
}

function sumMinutes(day: TimeEntry[]) {
    return _.reduce(day, (acc: Entry[], r: TimeEntry) => {
        var existing: Entry;

        if (r.project.toLowerCase() === 'home' || r.project.toLowerCase() === 'lunch') {
            return acc;
        }

        existing  = _.find(acc, a => a.project === r.project && a.task === r.task);

        if (!existing) {
            acc.push({ project: r.project, task: r.task, minutes: r.minutes, date: r.date });
            return acc;
        }

        existing.minutes += r.minutes;
        return acc;
    }, []);
}

function extractEntries(rawEntries: RawEntry[]) {
    var timeEntries = _.map(rawEntries, toTimeEntry);
    var days        = _.groupBy(timeEntries, r => r.date.format(PREFERRED_DATE_FORMAT));
    var daysArray   = _.values(days);
    // tsc was inferring wrong types here, hence no chain
    // it could be that underscore.d.ts is not right
    var populated   = _.map(daysArray, calculateMinutes);
    var summed      = _.map(populated, sumMinutes);

    return _.flatten(summed);
}

class EntryCollection extends Publisher<EntryUpdate> {

    constructor(store: Store) {
        super();
        store.subscribe(su => this.update(su.validated));
    }

    private update(rawEntries: Validated<RawEntry>[]) {
        if (rawEntries.length < 2 || !_.every(rawEntries, r => r.isValid)) {
            return;
        }

        var entries = extractEntries(_.map(rawEntries, r => r.value));

        this.publish({ entries: entries });
    }
}

