/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import config = require('../src/config');
import day = require('../src/day.model');
import DayViewModel = require('../src/day.view-model');

var tests = {

    'To raw day => ISO 8601 dates': () => {
        // Fixture setup
        var cfg = config.defaults(),
            raw0: day.RawDay = {
                date: '2013-09-09T00:00:00.000Z',
                entries: [],
            },
            dayVM = DayViewModel.fromDay(cfg, day.fromRaw(raw0));

        // Exercise system
        var raw1 = dayVM.toRaw();

        // Verify
        assert.deepEqual(raw1, raw0);
    },

    'To raw day => entries populated': () => {
        // Fixture setup
        var cfg = config.defaults(),
            entries0 = [
                { start: '2013-09-09T08:00:00.000Z', project: cfg.projects()[0], task: '' },
                { start: '2013-09-09T09:00:00.000Z', project: cfg.projects()[1], task: '' },
            ],
            dm = day.fromRaw({
                date: '2013-09-09T00:00:00.000Z',
                entries: entries0,
            }),
            dayVM = DayViewModel.fromDay(cfg, dm);

        // Exercise system
        var entries1 = dayVM.toRaw().entries;

        // Verify
        assert.strictEqual(entries1.length, entries0.length);
        assert.deepEqual(entries1, entries0);
    },

    // TODO
    'Valid day => no errors': () => {
        //assert.fail();
    },
    'Block day => no errors': () => {
        //assert.fail();
    },
    'No lunch => expect error': () => {
        //assert.fail();
    },
    'No home => expect error': () => {
        //assert.fail();
    },
    'Less than expected => expect warning': () => {
        //assert.fail();
    },
    'More than expected => expect warning': () => {
        //assert.fail();
    },
};
export = tests;
