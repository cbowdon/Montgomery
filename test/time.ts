/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../time.ts" />

module Test {

    QUnit.test('Parse string: HH:mm', assert => {
        var time = Time.parse('23:45');
        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 23, 'hour');
    });

    QUnit.test('Parse string: HHmm', assert => {
        var time = Time.parse('2345');
        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 23, 'hour');
    });

    QUnit.test('Parse string: H:mm', assert => {
        var time = Time.parse('9:45');
        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 9, 'hour');
    });

    QUnit.test('Parse string: Hmm', assert => {
        var time = Time.parse('945');
        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 9, 'hour');
    });

    QUnit.test('Midnight', assert => {
        var time = Time.parse('0000');
        assert.strictEqual(time.minute, 0, 'minute');
        assert.strictEqual(time.hour, 0, 'hour');

        assert.throws(() => Time.parse('2400'));
    });

    QUnit.test('Parse string: time out of range', assert => {
        assert.throws(() => Time.parse('24:45'), 'past midnight');
        assert.throws(() => Time.parse('20:65'), 'past the hour');
    });

    QUnit.test('To string', assert => {
        var time = Time.parse('9:45');
        assert.strictEqual(time.toString(), '09:45');

        time = Time.parse('23:45');
        assert.strictEqual(time.toString(), '23:45');
    });
}
