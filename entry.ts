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
                    startMillis: dateRes.value.toMillis() + timeRes.value.toMillis(),
                    minutes: <number>undefined
                };
            })
            .sortBy('startMillis')
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
            .reduce((acc, r) => {
                var existing: Entry;

                if (r.project.toLowerCase() === 'home' || r.project.toLowerCase() === 'lunch') {
                    return acc;
                }

                existing  = _.find(acc, a => a.project === r.project && a.task === r.task);

                if (!existing) {
                    acc.push({ project: r.project, task: r.task, minutes: r.minutes });
                    return acc;
                }

                existing.minutes += r.minutes;
                return acc;
            }, []);

        return result.value();
    }

    private update(rawEntries: Validated<RawEntry>[]) {
        if (!_.every(rawEntries, r => r.isValid)) {
            return;
        }

        var entries = EntryCollection.extractEntries(_.map(rawEntries, r => r.value));

        _.map(entries, e => console.log(e));
        //throw new Error('not yet implemented');
    }
}

