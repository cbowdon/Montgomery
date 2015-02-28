/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/chance/chance.d.ts" />
/// <reference path="../extensions/qunit.ts" />
/// <reference path="../extensions/chance.ts" />
import Chance = require('chance');
import Entry = require('../src/entry.view-model');

export = tests;
function tests() {
    var chance = new Chance(),
        projects = chance.n(chance.string, 5),
        entryFactory = Entry.makeFactory(projects);

    mixinChanceTime();

    QUnit.module('entry.view-model');

    QUnit.test('Components all valid => no errors', assert => {
        var entry = entryFactory({
            start: chance.time(),
            project: projects[0],
            task: chance.string()
        });
        assert.empty(entry.errors());
    });

    QUnit.test('N invalid components => N errors', assert => {
        assert.expect(3);
        var entries = [
            entryFactory({
                start: chance.time(),
                project: '',
                task: chance.string()
            }),
            entryFactory({
                start: '3536',
                project: '',
                task: chance.string()
            }),
            entryFactory({
                start: '',
                project: projects[0],
                task: chance.string()
            }),
        ];
        entries.forEach(e => assert.notEmpty(e.errors()));
    });

    QUnit.test('Suppress errors on parent => components all suppressed', assert => {
        var v = entryFactory({
            start: chance.time(),
            project: projects[0],
            task: chance.string()
        });

        v.suppressErrors(true);

        assert.ok(v.suppressErrors());
        assert.ok(v.start().suppressErrors());
        assert.ok(v.project().suppressErrors());
        assert.ok(v.task().suppressErrors());
    });
}
