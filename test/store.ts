/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../store.ts" />

module Test {

    var project = new Project('Montgomery'),
        task    = 'Unit testing',
        start   = new Date('2014-06-26T21:00'),
        end     = new Date('2014-06-26T21:15'),
        entry   = new Entry(project, task, start, end);

    QUnit.test('Entry minutes calculation', function (assert) {
        assert.ok(entry.minutes === 15, 'Expected 15 minutes');
    });

    QUnit.test('Store publishes updates', assert => {
    var dispatcher  = new Dispatcher(),
        store       = new Store(dispatcher),
        rawEntry    = { project: 'Test', task: 'Does it?', start: '20:30' },
        didPublish = false;

        store.addEventHandler(evt => didPublish = !!evt.store);

        dispatcher.dispatch('entry', rawEntry);

        assert.ok(didPublish, 'Expected update published');
    });

}
