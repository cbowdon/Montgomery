/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import moment = require('moment');
import config = require('../src/config');
import entry = require('../src/entry.model');
import EntryViewModel = require('../src/entry.view-model');

var tests = {
    'To raw entry => ISO 8601 times': () => {
        // Fixture setup
        var cfg = config.defaults(),
            date = moment('2013-09-09T00:00:00.000Z'),
            entry0 = {
                start: '2013-09-09T08:00:00.000Z',
                project: cfg.projects()[0],
                task: ''
            },
            entryVM = EntryViewModel.fromEntry(cfg, entry.fromRaw(entry0));

        // Exercise system
        var entry1 = entryVM.toRaw(date);

        // Verify
        assert.deepEqual(entry1, entry0);
    },
}
export = tests;
