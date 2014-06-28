/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../store.ts" />

QUnit.test('Entry minutes calculation', function (assert) {
var project = new Project('Montgomery'),
    task = 'Unit testing',
    start = new Date('2014-06-26T21:00'),
    end = new Date('2014-06-26T21:15'),
    entry   = new Entry(project, task, start, end);

    assert.ok(entry.minutes === 15, 'Expected 15 minutes');
});
