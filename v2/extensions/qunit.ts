/// <reference path="../typings/tsd.d.ts" />

interface QUnitAssert {
    empty<T>(value: T[], message?: string): void;
    notEmpty<T>(value: T[], message?: string): void;
}

QUnit.assert.empty = function QUnit_assert_empty<T>(value: T[], message: string): void {
    QUnit.assert.push(value.length === 0, value, [], message);
};

QUnit.assert.notEmpty = function QUnit_assert_notEmpty<T>(value: T[], message: string): void {
    QUnit.assert.push(value.length > 0, value, ['not empty'], message);
};
