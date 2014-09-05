/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../entry.ts" />

module Test {
    QUnit.module('Entry');

    interface TestEntry {
        date: string;
        project: string;
        task: string;
        minutes: number;
    }

    QUnit.test('Extract entries - single day', assert => {
        var raw: RawEntry[], result: TestEntry[];

         raw = [
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '09:00' },
            { project: 'P0', task: 'T1', date: '2014-08-18', start: '10:15' },
            // repeat proj/task here
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '11:15' },
            // immediate repeat proj/task here
            { project: 'P1', task: 'T0', date: '2014-08-18', start: '12:15' },
            { project: 'P1', task: 'T0', date: '2014-08-18', start: '13:15' },
            { project: 'Lunch', date: '2014-08-18', start: '13:45' },
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '14:15' },
            { project: 'Home', date: '2014-08-18', start: '17:00' }
        ];

        result = _.chain(EntryCollection.extractEntries(raw))
            .sortBy(r => r.task)
            .sortBy(r => r.project)
            .map(r => { return { date: r.date.format('YYYY-MM-DD'), project: r.project, task: r.task, minutes: r.minutes }; })
            .value();

        assert.deepEqual(result, [
            { date: '2014-08-18', project: 'P0', task: 'T0', minutes: 300 },
            { date: '2014-08-18', project: 'P0', task: 'T1', minutes: 60 },
            { date: '2014-08-18', project: 'P1', task: 'T0', minutes: 90 }
        ]);

        assert.strictEqual(_.reduce(result, (acc: number, r: Entry) => acc + r.minutes, 0), 450, 'Expect a 7.5 hour day');
    });

    QUnit.test('Extract entries - multiple days', assert => {
        var raw: RawEntry[], result: TestEntry[];

         raw = [
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '09:00' },
            { project: 'lunch', date: '2014-08-18', start: '12:30' },
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '13:00' },
            { project: 'Home', date: '2014-08-18', start: '17:00' },

            { project: 'P0', task: 'T0', date: '2014-08-19', start: '09:00' },
            { project: 'P0', task: 'T1', date: '2014-08-19', start: '10:15' },
            { project: 'lunch', date: '2014-08-19', start: '12:30' },
            { project: 'P0', task: 'T1', date: '2014-08-19', start: '13:00' },
            { project: 'Home', date: '2014-08-19', start: '17:00' },

            { project: 'P0', task: 'T0', date: '2014-08-20', start: '09:00' },
            { project: 'P0', task: 'T1', date: '2014-08-20', start: '11:00' },
            { project: 'P1', task: 'T0', date: '2014-08-20', start: '11:15' },
            { project: 'lunch', date: '2014-08-20', start: '12:30' },
            { project: 'P1', task: 'T0', date: '2014-08-20', start: '13:00' },
            { project: 'Home', date: '2014-08-20', start: '17:00' }
        ];

        result = _.chain(EntryCollection.extractEntries(raw))
            .sortBy(r => r.task)
            .sortBy(r => r.project)
            .map(r => { return { date: r.date.format('YYYY-MM-DD'), project: r.project, task: r.task, minutes: r.minutes }; })
            .sortBy(r => r.date)
            .value();

        assert.deepEqual(result, [
            { date: '2014-08-18', project: 'P0', task: 'T0', minutes: 450 },

            { date: '2014-08-19', project: 'P0', task: 'T0', minutes: 75 },
            { date: '2014-08-19', project: 'P0', task: 'T1', minutes: 375 },

            { date: '2014-08-20', project: 'P0', task: 'T0', minutes: 120 },
            { date: '2014-08-20', project: 'P0', task: 'T1', minutes: 15 },
            { date: '2014-08-20', project: 'P1', task: 'T0', minutes: 315 },
        ]);

        assert.strictEqual(_.reduce(result, (acc: number, r: Entry) => acc + r.minutes, 0), 3 * 450, 'Expect three 7.5 hour days');
    });
}
