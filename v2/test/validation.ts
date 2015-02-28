/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/chance/chance.d.ts" />
/// <reference path="../extensions/qunit.ts" />
import Chance = require('chance');
import val = require('../src/validation');
import Entry = require('../src/entry.view-model');
import func = require('../src/func');

export = tests;
function tests() {
    var chance = new Chance(),
        projects = chance.n(chance.string, 5),
        factory = Entry.makeFactory(projects);


    QUnit.module('validation.Validatable');
    QUnit.test('No errors in components => no errors', assert => {

    });

    QUnit.test('Errors in components => aggregate errors', assert => {

    });

    QUnit.test('Suppress errors on parent => components all suppressed', assert => {
        var v: val.Validatable = new Entry([]);
        var c = v.components();

        v.suppressErrors(true);
        assert.every(func.pairs(c), x => x[1].suppressErrors());
    });
}
