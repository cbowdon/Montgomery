/// <reference path="../typings/tsd.d.ts" />
import func = require('../src/func');

export = tests;
function tests() {
    QUnit.module('func');

    QUnit.test('all', assert => {
        var combined = func.all(
            (n:number) => n + 1,
            (n:number) => n + 2,
            (n:number) => n + 3,
            (n:number) => n + 4
        );
        assert.propEqual(combined(4), [5,6,7,8]);
    });

    QUnit.test('pairs', assert => {
        var obj: { [id: string]: number } = { a: 0, b: 1, c: 2 };
        assert.propEqual(func.pairs<number>(obj), [['a', 0], ['b', 1], ['c', 2]]);
    });
}
