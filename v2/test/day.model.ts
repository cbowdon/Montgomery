/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import moment = require('moment');
import Chance = require('chance');
import config = require('../src/config');
import entry = require('../src/entry.model');
import day = require('../src/day.model');

var chance = new Chance(),
    projects = chance.n(chance.string, 5),
    cfg = config.defaults();

var tests = {
    'From raw => valid day': () => {
        var raw = {
            date: '2013-09-09T00:00:00.000Z',
            entries: [{
                start: '2013-09-09T12:34:00.000Z',
                project: projects[1],
                task: chance.string()
            }]
        };
        var d = day.fromRaw(raw);
        assert.ok(d);
    },
    'Has Home => true': () => {
        var raw = {
            date: '2013-09-09T00:00:00.000Z',
            entries: [{
                start: '2013-09-09T12:34:00.000Z',
                project: 'Home',
                task: chance.string()
            }]
        };
        var d = day.fromRaw(raw);
        assert.ok(day.hasHome(cfg, d));
    },
    'Has no Home => false': () => {
        var raw = {
            date: '2013-09-09T00:00:00.000Z',
            entries: [{
                start: '2013-09-09T12:34:00.000Z',
                project: projects[1],
                task: chance.string()
            }]
        };
        var d = day.fromRaw(raw);
        assert.ok(!day.hasHome(cfg, d));
    },
    'Next working day is same week => correct day': () => {
        // 9th Sept 2013 was a Monday
        var expected = moment('2013-09-10T00:00:00.000Z'),
            d0 = day.fromRaw({ date: '2013-09-09T00:00:00.000Z', entries: [] });
        assert.ok(day.nextWorkingDay(d0).isSame(expected));
    },
    'Next working day is next week => correct day': () => {
        var expected = moment('2013-09-09T00:00:00.000Z'),
            d0 = day.fromRaw({ date: '2013-09-06T00:00:00.000Z', entries: [] });
        assert.ok(day.nextWorkingDay(d0).isSame(expected));
    },
};

export = tests;
