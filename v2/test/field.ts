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
            time.validate();
            assert.empty(time.errors, t);
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
            time.validate();
            assert.notEmpty(time.errors, t);
        });
    });

    QUnit.module('field.Select');
    QUnit.test('Any value => no errors', (assert: QUnitAssert) => {
        var text = new field.Select(['a', 'b', 'c']);
        text.value('a');
        text.validate();
        assert.empty(text.errors);
    });
    QUnit.test('No value => errors', assert => {
        var text = new field.Select(['a', 'b', 'c']);
        text.value('');
        text.validate();
        assert.notEmpty(text.errors);
    });
}
