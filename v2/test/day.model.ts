/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import moment = require('moment');
import Chance = require('chance');
import config = require('../src/config');
import tokens = require('../src/tokens');
import entry = require('../src/entry.model');
import day = require('../src/day.model');

var chance = new Chance(),
    projects = chance.n(chance.string, 5),
    cfg = config.defaults();

var tests = {

    'Raw day to JSON round trip => no data loss': () => {
        var raw0: day.RawDay = {
                date: '2013-09-09T00:00:00.000Z',
                entries: [{
                    start: '2013-09-09T12:34:00.000Z',
                    project: projects[1],
                    task: chance.string()
                }]
            },
            str = JSON.stringify(raw0),
            raw1 = JSON.parse(str);

        console.log(str);
        console.log(raw0);
        console.log(raw1);
        assert.deepEqual(raw1, raw0);
    },

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

    'To JSON => populated correctly': () => {
        var rawDay: day.RawDay = {
                date: '2013-09-09T00:00:00.000Z',
                entries: [],
            };

        assert.strictEqual(day.fromRaw(rawDay).toJSON(),
            `{"date":"${rawDay.date}","entries":[]}`);
    },

    'Round trip => no data loss': () => {
        var rawEntry = {
                start: '2013-09-09T12:34:00.000Z',
                project: projects[1],
                task: chance.string()
            },
            rawDay = {
                date: '2013-09-09T00:00:00.000Z',
                entries: [ rawEntry ],
            },
            original = day.fromRaw(rawDay),
            forwards = original.toJSON(),
            backwards = day.fromRaw(JSON.parse(forwards));

        assert.strictEqual(backwards.date.toISOString(), original.date.toISOString());
        assert.strictEqual(backwards.entries.length, original.entries.length);
    },

    'Has Home => true': () => {
        var raw = {
            date: '2013-09-09T00:00:00.000Z',
            entries: [{
                start: '2013-09-09T12:34:00.000Z',
                project: tokens.home,
                task: chance.string()
            }]
        };
        var d = day.fromRaw(raw);
        assert.ok(day.hasHome(d));
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
        assert.ok(!day.hasHome(d));
    },

    'Next working day is same week => correct day': () => {
        // 9th Sept 2013 was a Monday
        var expected = '2013-09-10T00:00:00.000Z',
            d0 = '2013-09-09T00:00:00.000Z';
        assert.strictEqual(day.nextWorkingDay(d0), expected);
    },

    'Next working day is next week => correct day': () => {
        var expected = '2013-09-09T00:00:00.000Z',
            d0 = '2013-09-06T00:00:00.000Z';
        assert.strictEqual(day.nextWorkingDay(d0), expected);
    },
};

export = tests;
