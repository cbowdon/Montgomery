/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import Chance = require('chance');
import config = require('../src/config');
import entry = require('../src/entry.model');

var chance = new Chance(),
    projects = chance.n(chance.string, 5),
    cfg = config.defaults();

var tests = {
    'From raw => valid entry': () => {
        var raw = {
            start: '1234',
            project: projects[1],
            task: chance.string()
        };
        var e = entry.fromRaw(cfg, raw);
        assert.ok(e);
    },
};

export = tests;
