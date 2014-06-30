/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../store.ts" />

module Test {

    var project = new Project('Montgomery'),
        task = 'Unit testing',
        start = new Date('2014-06-26T21:00'),
        end = new Date('2014-06-26T21:15'),
        entry   = new Entry(project, task, start, end);

    QUnit.test('Entry minutes calculation', function (assert) {
        assert.ok(entry.minutes === 15, 'Expected 15 minutes');
    });

    QUnit.test('Store publishes updates', assert => {
    var store = new Store(),
        didPublish = false;

        store.addEventHandler(evt => didPublish = !!evt.store);

        store.addEntry(entry);

        assert.ok(didPublish, 'Expected update published');
    });

}
