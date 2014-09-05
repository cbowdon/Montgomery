/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../validator.ts" />

module Test {
    QUnit.module('Validator');

    QUnit.test('Validator happy path', assert => {
        var raw: RawEntry,
            result: Validated<RawEntry>;

        raw = {
            project: 'Some project',
            task: 'Some task',
            date: '2014-07-30',
            start: '2028'
        };

        result = new RawEntryValidator().validate(raw);

        assert.ok(result.isValid);

        assert.deepEqual(result.value, {
            project: raw.project,
            task: raw.task,
            date: '2014-07-30',
            start: '20:28'
        });
    });

    QUnit.test('Validator bad date', assert => {
        var raw: RawEntry,
            result: Validated<RawEntry>,
            validator = new RawEntryValidator();

        raw = {
            project: 'Some project',
            task: 'Some task',
            date: '2014',
            start: '2028'
        };

        result = validator.validate(raw);

        assert.ok(!result.isValid);

        assert.deepEqual(result.errors, ['Invalid date']);
    });

    QUnit.test('Validator bad time', assert => {
        var raw: RawEntry,
            result: Validated<RawEntry>,
            validator = new RawEntryValidator();

        raw = {
            project: 'Some project',
            task: 'Some task',
            date: '2014-07-30',
            start: '3028'
        };

        result = validator.validate(raw);

        assert.ok(!result.isValid);

        assert.deepEqual(result.errors, ['Invalid time']);
    });

}
