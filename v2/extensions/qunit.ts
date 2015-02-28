/// <reference path="../typings/tsd.d.ts" />

interface QUnitAssert {
    empty<T>(value: T[], message?: string): void;
    notEmpty<T>(value: T[], message?: string): void;
    every<T>(value: T[], pred: (t:T) => boolean, message?: string): void;
}

QUnit.assert.empty = function QUnit_assert_empty<T>(value: T[], message: string): void {
    QUnit.assert.push(value.length === 0, value, [], message);
};

QUnit.assert.notEmpty = function QUnit_assert_notEmpty<T>(value: T[], message: string): void {
    QUnit.assert.push(value.length > 0, value, 'A non-empty array', message);
};

QUnit.assert.every = function QUnit_assert_every<T>(value: T[], pred: (t:T) => boolean, message?: string): void {
    QUnit.assert.push(value.every(pred), value, 'All true', message);
};
