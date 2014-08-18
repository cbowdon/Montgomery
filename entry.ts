/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="result.ts" />
/// <reference path="shortdate.ts" />
/// <reference path="time.ts" />
/// <reference path="store.ts" />

interface Entry {
    project: string;
    task: string;
    minutes: number;
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
                    },
                    end: {
                        date: dateRes.value,
                        time: <Time>undefined
                    },
                    minutes: <number>undefined
                };
            })
            .sortBy(r => r.start.date.toMillis() + r.start.time.toMillis())
            .reduce((acc, r, i) => {
                if (i === 0) {
                    return [r];
                }

                acc[i - 1].end.time = r.start.time;
                acc[i - 1].minutes = (acc[i - 1].end.time.toMillis() - acc[i - 1].start.time.toMillis()) / (60 * 1000);

                if (i !== rawEntries.length - 1) {
                    // TODO assert that this entry is 'home'
                    acc.push(r);
                }

                return acc;
            }, [])
            .filter(r => r.project.toLowerCase() !== 'home' && r.project.toLowerCase() !== 'lunch')
            .reduce((acc, r) => {
                var existing = _.find(acc, a => a.project === r.project && a.task === r.task);

                if (!existing) {
                    acc.push({ project: r.project, task: r.task, minutes: r.minutes });
                    return acc;
                }

                existing.minutes += r.minutes;
                return acc;
            }, []);

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

