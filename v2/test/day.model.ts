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
            date: '2013-09-09',
            entries: [{
                start: '1234',
                project: projects[1],
                task: chance.string()
            }]
        };
        var d = day.fromRaw(cfg, raw);
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
        var d = day.fromRaw(cfg, raw);
        assert.ok(day.hasHome(cfg, d));
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
        var d = day.fromRaw(cfg, raw);
        assert.ok(!day.hasHome(cfg, d));
    },
    'Next working day is same week => correct day': () => {
        // 9th Sept 2013 was a Monday
        var d0 = day.fromRaw(cfg, { date: '2013-09-09', entries: [] });
        assert.ok(day.nextWorkingDay(d0).isSame(moment('2013-09-10', 'YYYY-MM-DD', true)));
    },
    'Next working day is next week => correct day': () => {
        var d0 = day.fromRaw(cfg, { date: '2013-09-06', entries: [] });
        assert.ok(day.nextWorkingDay(d0).isSame(moment('2013-09-09', 'YYYY-MM-DD', true)));
    },
};

export = tests;
