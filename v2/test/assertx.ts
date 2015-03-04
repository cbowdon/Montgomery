/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');

export function empty<T>(array: T[], message?: string) : void {
    assert.ok(array.length === 0, message);
}

export function notEmpty<T>(array: T[], message?: string) : void {
    assert.ok(array.length > 0, message);
}
