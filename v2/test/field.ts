/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/chance/chance.d.ts" />
/// <reference path="../extensions/qunit.ts" />
import Chance = require('chance');
import field = require('../src/field');

export = tests;
function tests() {
    var chance = new Chance();

    QUnit.module('field.Text');
    QUnit.test('Any string => no errors', assert => {
        var text = new field.Text();
        text.value(chance.string());
        assert.empty(text.errors());
    });

    QUnit.module('field.Time');
    QUnit.test('Valid time(s) => no errors', assert => {
        var validTimes = [
            '0000',
            '0123',
            '0000',
            '1234',
            '2359',
        ];
        assert.expect(validTimes.length);
        validTimes.forEach(t => {
            var time = new field.Time();
            time.value(t);
            assert.empty(time.errors(), t);
        });
    });
    QUnit.test('Invalid time(s) => errors', assert => {
        var invalidTimes = [
            '11111',
            '111',
            '9999',
            '1260',
            '2459'
        ];
        assert.expect(invalidTimes.length);
        invalidTimes.forEach(t => {
            var time = new field.Time();
            time.value(t);
            assert.notEmpty(time.errors(), t);
        });
    });

    QUnit.module('field.Select');
    QUnit.test('Any value => no errors', (assert: QUnitAssert) => {
        var text = new field.Select(['a', 'b', 'c']);
        text.value('a');
        assert.empty(text.errors());
    });
    QUnit.test('No value => errors', assert => {
        var text = new field.Select(['a', 'b', 'c']);
        text.value('');
        assert.notEmpty(text.errors());
    });
}
