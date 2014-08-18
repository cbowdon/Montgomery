/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../entry.ts" />

module Test {

    QUnit.test('Extract entries - single day', assert => {
        var raw: RawEntry[],
            result: Entry[];

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
            { project: 'Home', date: '2014-08-18', start: '17:00' },
        ];

        result = _.chain(EntryCollection.extractEntries(raw))
            .sortBy('task')
            .sortBy('project')
            .value();

        assert.deepEqual(result, [
            { project: 'P0', task: 'T0', minutes: 300 },
            { project: 'P0', task: 'T1', minutes: 60 },
            { project: 'P1', task: 'T0', minutes: 90 }
        ]);

        assert.strictEqual(_.reduce(result, (acc: number, r: Entry) => acc + r.minutes, 0), 450, 'Expect a 7.5 hour day');
    });
}
