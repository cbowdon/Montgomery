/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import Chance = require('chance');
import entry = require('../src/entry.model');
import day = require('../src/day.model');

var chance = new Chance(),
    projects = chance.n(chance.string, 5);

var tests = {
    'From raw => valid day': () => {
        var raw = {
            date: '2013-09-09',
            entries: [{
                start: '1234',
                project: projects[1],
                task: chance.string()
            }]
        };
        var d = day.fromRaw(raw);
        assert.ok(d);
    },
    'Has Home => true': () => {
        var raw = {
            date: '2013-09-09',
            entries: [{
                start: '1234',
                project: 'Home',
                task: chance.string()
            }]
        };
        var d = day.fromRaw(raw);
        assert.ok(day.hasHome(d));
    },
    'Has no Home => false': () => {
        var raw = {
            date: '2013-09-09',
            entries: [{
                start: '1234',
                project: projects[1],
                task: chance.string()
            }]
        };
        var d = day.fromRaw(raw);
        assert.ok(!day.hasHome(d));
    }
};

export = tests;
