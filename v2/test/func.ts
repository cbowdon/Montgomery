/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import func = require('../src/func');

var tests = {

    'all': () => {
        var combined = func.all(
            (n:number) => n + 1,
            (n:number) => n + 2,
            (n:number) => n + 3,
            (n:number) => n + 4
        );
        assert.deepEqual(combined(4), [5,6,7,8]);
    },

    'pairs': () => {
        var obj: { [id: string]: number } = { a: 0, b: 1, c: 2 };
        assert.deepEqual(func.pairs<number>(obj), [['a', 0], ['b', 1], ['c', 2]]);
    },
};

export = tests;
