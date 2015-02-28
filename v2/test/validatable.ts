/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/chance/chance.d.ts" />
/// <reference path="../extensions/qunit.ts" />
import Chance = require('chance');
import val = require('../src/validation');
import field = require('../src/field');
import func = require('../src/func');

export = tests;
function tests() {
    var chance = new Chance();

    QUnit.module('validation.Validatable');

    QUnit.test('No errors in components => no errors', assert => {
        var v: val.Validatable = new field.Field();

    });

    QUnit.test('Errors in components => aggregate errors', assert => {

    });

    QUnit.test('Suppress errors on parent => components all suppressed', assert => {
        var v: val.Validatable = new field.Field();
        var c = v.components();

        v.suppressErrors(true);
        assert.every(func.pairs(c), x => x[1].suppressErrors());
    });
}
