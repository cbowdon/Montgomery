/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import Chance = require('chance');
import entry = require('../src/entry.model');

var chance = new Chance(),
    projects = chance.n(chance.string, 5);

var tests = {
    'From raw => valid entry': () => {
        var raw = {
            start: '1234',
            project: projects[1],
            task: chance.string()
        };
        var e = entry.fromRaw(raw);
        assert.ok(e);
    },
    'To raw => raw entry': () => {
        var raw = {
            start: '12:34',
            project: projects[1],
            task: chance.string()
        };
        var e = entry.fromRaw(raw);
        var r = entry.toRaw(e);
        assert.deepEqual(r, raw);
    },
};

export = tests;
