/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../entry.ts" />

module Test {

    QUnit.test('Extract entries - single day', assert => {
        var raw = [
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '09:00' },
            { project: 'P0', task: 'T1', date: '2014-08-18', start: '10:15' },
            // repeat proj/task here
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '11:15' },
            // immediate repeat proj/task here
            { project: 'P1', task: 'T0', date: '2014-08-18', start: '12:15' },
            { project: 'P1', task: 'T0', date: '2014-08-18', start: '13:15' },
            { project: 'Lunch', date: '2014-08-18', start: '13:30' },
            { project: 'P0', task: 'T0', date: '2014-08-18', start: '14:15' },
            { project: 'Home', date: '2014-08-18', start: '17:00' },
        ];

        assert.deepEqual(EntryCollection.extractEntries(raw), {
            P0: { T0: 360, T1: 60 },
            P1: { T0: 90 }
        });
    });
}
