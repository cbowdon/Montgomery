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
        entry.start.value(chance.time());
        entry.project.value(projects[0]);
        entry.task.value(chance.string());
        entry.validate();
        assert.empty(entry.errors);
    });
    QUnit.test('N invalid components => N errors', assert => {
        assert.expect(3);
        [ // add scope for each test case
            () => {
                var entry = new vm.Entry(projects);
                entry.start.value(chance.time());
                entry.project.value('');
                entry.task.value(chance.string());
                return entry;
            },
            () => {
                var entry = new vm.Entry(projects);
                entry.start.value('3536');
                entry.project.value('');
                entry.task.value(chance.string());
                return entry;
            },
            () => {
                var entry = new vm.Entry(projects);
                entry.start.value('');
                entry.project.value(projects[0]);
                entry.task.value(chance.string());
                return entry;
            }
        ].forEach(testCase => {
            var entry = testCase();
            entry.validate();
            assert.notEmpty(entry.errors);
        });
    });
}
