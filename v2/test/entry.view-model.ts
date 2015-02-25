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
        var entry = new Entry(projects);
        entry.fields.start.value(chance.time());
        entry.fields.project.value(projects[0]);
        entry.fields.task.value(chance.string());
        assert.empty(entry.errors());
    });
    QUnit.test('N invalid components => N errors', assert => {
        assert.expect(3);
        [ // add scope for each test case
            () => {
                var entry = new Entry(projects);
                entry.fields.start.value(chance.time());
                entry.fields.project.value('');
                entry.fields.task.value(chance.string());
                return entry.errors();
            },
            () => {
                var entry = new Entry(projects);
                entry.fields.start.value('3536');
                entry.fields.project.value('');
                entry.fields.task.value(chance.string());
                return entry.errors();
            },
            () => {
                var entry = new Entry(projects);
                entry.fields.start.value('');
                entry.fields.project.value(projects[0]);
                entry.fields.task.value(chance.string());
                return entry.errors();
            }
        ].forEach(testCase => assert.notEmpty(testCase()));
    });
}
