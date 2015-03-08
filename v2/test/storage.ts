/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import Chance = require('chance');
import storage = require('./mock-storage');

var chance = new Chance();

// tests the mock...
var tests = {
    'Add and retrieve single item => success': () => {
        var key = chance.string(),
            value = chance.guid(),
            sut = storage.create();

        sut[key] = value;

        assert.strictEqual(sut[key], value);
    },
    'Add and retrieve item with getter/setter => success': () => {
        var key = chance.string(),
            value = chance.guid(),
            sut = storage.create();

        sut.setItem(key, value);

        assert.strictEqual(sut.getItem(key), value);
    },
    'Add multiple items => correct length': () => {
        var n = chance.integer({ min: 2, max: 20 }),
            i = 0,
            sut = storage.create();


        for (; i < n; i += 1) {
            sut[chance.string()] = chance.guid();
        }

        assert.strictEqual(sut.length, n);
    },
    'Clear items => gone': () => {
        var key = chance.string(),
            value = chance.guid(),
            sut = storage.create();

        sut[key] = value;

        sut.clear();

        assert.strictEqual(sut.length, 0);
        // non-strict equal because undefined also acceptable
        assert.equal(sut[key], null);
    },
}

export = tests;
