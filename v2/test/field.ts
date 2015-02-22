/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../extensions/qunit.ts" />
import field = require('../src/field');
import arbitrary = require('./arbitrary');

export = tests;
function tests() {
    QUnit.module('field.Text');
    QUnit.test('Any string => no errors', assert => {
        var text = new field.Text();
        text.value(arbitrary.string());
        text.validate();
        assert.empty(text.errors);
    });

    QUnit.module('field.Time');
    QUnit.test('Valid time(s) => formatted no errors', assert => {

    });
    QUnit.test('Invalid time(s) => errors', assert => {

    });

    QUnit.module('field.Select');
    QUnit.test('Any value => no errors', (assert: QUnitAssert) => {
        var text = new field.Select(['a', 'b', 'c']);
        text.value('a');
        text.validate();
        assert.empty(text.errors);
        return <any>0;
    });
    QUnit.test('No value => errors', assert => {
        var text = new field.Select(['a', 'b', 'c']);
        text.value('');
        text.validate();
        assert.notEmpty(text.errors);
    });
}
