/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('../src/config');
import tokens = require('../src/tokens');
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

    'To raw entry => home correctly tokenized': () => {
        // Fixture setup
        var cfg = config.defaults(),
            date = moment('2013-09-09T00:00:00.000Z'),
            entryVM: EntryViewModel,
            raw: entry.RawEntry;

        cfg.home('回家');

        entryVM = EntryViewModel.blank(cfg);

        entryVM.start().value('2013-09-09T08:00:00.000Z');
        entryVM.project().value(cfg.home());

        // Exercise system
        raw = entryVM.toRaw(date);

        // Verify
        assert.strictEqual(raw.project, tokens.home);
    },

    'From entry => home correctly detokenized': () => {
        // Fixture setup
        var cfg = config.defaults(),
            date = moment('2013-09-09T00:00:00.000Z'),
            entryM: entry.Entry,
            entryVM: EntryViewModel;

        cfg.home('回家');

        entryM = new entry.Entry(date, tokens.home, '', tsm.Maybe.nothing());

        // Exercise system
        entryVM = EntryViewModel.fromEntry(cfg, entryM);

        // Verify
        assert.strictEqual(entryVM.project().value(), cfg.home());
    },
}
export = tests;
