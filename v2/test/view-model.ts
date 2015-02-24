/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/chance/chance.d.ts" />
/// <reference path="../extensions/qunit.ts" />
/// <reference path="../extensions/chance.ts" />
import Chance = require('chance');
import vm = require('../src/view-model');

export = tests;
function tests() {
    var chance = new Chance(),
        projects = chance.n(chance.string, 5);

    mixinChanceTime();

    QUnit.module('view-model.Entry');
    QUnit.test('Components all valid => no errors', assert => {
        var entry = new vm.Entry(projects);
        entry.fields.start.value(chance.time());
        entry.fields.project.value(projects[0]);
        entry.fields.task.value(chance.string());
        assert.empty(entry.errors());
    });
    QUnit.test('N invalid components => N errors', assert => {
        assert.expect(3);
        [ // add scope for each test case
            () => {
                var entry = new vm.Entry(projects);
                entry.fields.start.value(chance.time());
                entry.fields.project.value('');
                entry.fields.task.value(chance.string());
                return entry.errors();
            },
            () => {
                var entry = new vm.Entry(projects);
                entry.fields.start.value('3536');
                entry.fields.project.value('');
                entry.fields.task.value(chance.string());
                return entry.errors();
            },
            () => {
                var entry = new vm.Entry(projects);
                entry.fields.start.value('');
                entry.fields.project.value(projects[0]);
                entry.fields.task.value(chance.string());
                return entry.errors();
            }
        ].forEach(testCase => assert.notEmpty(testCase()));
    });
}
