/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../store.ts" />

QUnit.test('Minutes calculation', function (assert) {
    var project = new Project('Montgomery'),
        entry   = new Entry(new Date(), project, 'Unit testing', new Date('2014-06-26T21:00'), new Date('2014-06-26T21:15'));
    assert.ok(entry.minutes === 15, 'Expected 15 minutes');
});
