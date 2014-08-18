/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../time.ts" />

module Test {

    QUnit.test('Parse string: HH:mm', assert => {
        var timeResult = Time.parse('23:45'),
            time: Time;

        assert.ok(timeResult.isSuccess);

        time = timeResult.value;

        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 23, 'hour');
    });

    QUnit.test('Parse string: HHmm', assert => {
        var timeResult = Time.parse('2345'),
            time: Time;

        assert.ok(timeResult.isSuccess);

        time = timeResult.value;

        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 23, 'hour');
    });

    QUnit.test('Parse string: H:mm', assert => {
        var timeResult = Time.parse('9:45'),
            time: Time;

        assert.ok(timeResult.isSuccess);

        time = timeResult.value;
        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 9, 'hour');
    });

    QUnit.test('Parse string: Hmm', assert => {
        var timeResult = Time.parse('945'),
            time: Time;

        assert.ok(timeResult.isSuccess);

        time = timeResult.value;

        assert.strictEqual(time.minute, 45, 'minute');
        assert.strictEqual(time.hour, 9, 'hour');
    });

    QUnit.test('Midnight', assert => {
        var timeResult = Time.parse('0000'),
            time: Time;

        assert.ok(timeResult.isSuccess);

        time = timeResult.value;

        assert.strictEqual(time.minute, 0, 'minute');
        assert.strictEqual(time.hour, 0, 'hour');

        assert.ok(!Time.parse('2400').isSuccess, '2400');
    });

    QUnit.test('Parse string: time out of range', assert => {
        assert.ok(!Time.parse('24:45').isSuccess, 'past midnight');
        assert.ok(!Time.parse('20:65').isSuccess, 'past the hour');
    });

    QUnit.test('To ISO string', assert => {
        function checkTimeString(input: string, output: string, message?: string) {
            var timeResult = Time.parse(input),
                time: Time;

            assert.ok(timeResult.isSuccess, message);

            time = timeResult.value;

            assert.strictEqual(time.toISOString(), output, message);
        }
        checkTimeString('9:45', '09:45');
        checkTimeString('945', '09:45');
        checkTimeString('0945', '09:45');
        checkTimeString('23:45', '23:45');
        checkTimeString('1200', '12:00');
    });

    QUnit.test('Millis', assert => {
        assert.strictEqual(new Time(0, 1).toMillis(), 60000);
        assert.strictEqual(new Time(1, 0).toMillis(), 3600000);
    });
}
