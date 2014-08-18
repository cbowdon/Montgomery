/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../store.ts" />
/// <reference path="../entry.ts" />

module Test {

    var project = new Project('Montgomery'),
        task    = 'Unit testing',
        start   = new Date('2014-06-26T08:00'),
        end     = new Date('2014-06-26T09:15'),
        entry   = new Entry(project, task, start, end);

    QUnit.test('Entry minutes calculation', assert => {
        assert.ok(entry.minutes() === 75, 'Expected 75 minutes but was ' + entry.minutes);
    });

    QUnit.test('Store publishes updates', assert => {
    var dispatcher  = new Dispatcher(),
        store       = new Store(dispatcher),
        rawEntry    = { project: 'Test', task: 'Does it?', start: '20:30', date: '2014-07-29' },
        didPublish = false;

        store.addEventHandler(evt => didPublish = !!evt.validated);

        dispatcher.dispatch('entry', rawEntry);

        assert.ok(didPublish, 'Expected update published');
    });

}
