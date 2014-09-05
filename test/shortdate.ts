/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../shortdate.ts" />
/// <reference path="../time.ts" />

module Test {
    QUnit.module('ShortDate');

    function checkParse(name: string, input: string, shouldParse: boolean, message?: string) {
        QUnit.test(name, assert => {
            var dateResult = ShortDate.parse(input),
                date: ShortDate;

            assert.strictEqual(dateResult.isSuccess, shouldParse, message || name);
        });
    }

    checkParse('Happy path', '2014-01-01', true);
    checkParse('Non-ISO month', '2014-1-01', false);
    checkParse('Non-ISO date', '2014-01-1', false);
    checkParse('Non-ISO month & date', '2014-1-1', false);
    checkParse('Non-ISO year', '14-01-01', false);
    checkParse('Non-ISO year & month', '14-1-01', false);
    checkParse('Non-ISO', '14-1-1', false);
    checkParse('Obviously wrong', 'Tasty peaches', false);

    function checkDateString(name: string, input: string, output: string, message?: string) {
        QUnit.test(name, assert => {
            var dateResult = ShortDate.parse(input),
                date: ShortDate;

            assert.ok(dateResult.isSuccess, message);

            date = dateResult.value;

            assert.strictEqual(date.toISOString(), output, message || name);
        });
    }

    checkDateString('Happy path', '2014-01-01', '2014-01-01');
    checkDateString('12th month (no off-by-one)', '2014-12-31', '2014-12-31');
    checkDateString('A long time ago', '1987-10-24', '1987-10-24');
}
