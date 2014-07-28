/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../time.ts" />

module Test {

    QUnit.test('Parse string: HH:mm', assert => {
        var time = Time.parse('23:45');
        assert.strictEqual(time.minute, 45);
        assert.strictEqual(time.hour, 23);
    });

    QUnit.test('Parse string: HHmm', assert => {
        var time = Time.parse('2345');
        assert.strictEqual(time.minute, 45);
        assert.strictEqual(time.hour, 23);
    });

    QUnit.test('Parse string: H:mm', assert => {
        var time = Time.parse('9:45');
        assert.strictEqual(time.minute, 45);
        assert.strictEqual(time.hour, 9);
    });

    QUnit.test('Parse string: Hmm', assert => {
        var time = Time.parse('945');
        assert.strictEqual(time.minute, 45);
        assert.strictEqual(time.hour, 9);
    });

    QUnit.test('Parse string: time out of range', assert => {
        assert.throws(() => Time.parse('24:45'));
    });
}
