/// <reference path="typings/tsd.d.ts" />
/// <reference path="result.ts" />
/// <reference path="store.ts" />

interface Entry {
    project: string;
    task: string;
    minutes: number;
    date: Moment;
}

interface EntryUpdate {
    entries: Entry[];
}

class EntryCollection extends Publisher<EntryUpdate> {

    constructor(store: Store) {
        super();
        store.subscribe(su => this.update(su.validated));
    }

    static extractEntries(rawEntries: RawEntry[]) {
        var result = _.chain(rawEntries)
            .map(r => {
                var dateRes = moment(r.date, 'YYYY-MM-DD', true),
                    timeRes = moment(r.start, 'HH:mm', true);

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
            })
            .groupBy(r => r.date.format('YYYY-MM-DD'))
            .values()
            .map(day => {
                return _.chain(day)
                    .sortBy(r => r.start.format())
                    .reduce((acc, r, i) => {
                        if (i === 0) {
                            return [r];
                        }

                        acc[i - 1].end = r.start;
                        acc[i - 1].minutes = acc[i - 1].end.diff(acc[i - 1].start) / (60 * 1000)

                        if (i !== rawEntries.length - 1) {
                            // TODO assert that this entry is 'home'
                            acc.push(r);
                        }

                        return acc;
                    }, [])
                    .reduce((acc, r) => {
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
                    }, [])
                    .value();
            })
            .flatten();

        return result.value();
    }

    private update(rawEntries: Validated<RawEntry>[]) {
        if (rawEntries.length < 2 || !_.every(rawEntries, r => r.isValid)) {
            return;
        }

        var entries = EntryCollection.extractEntries(_.map(rawEntries, r => r.value));

        this.publish({ entries: entries });
    }
}

