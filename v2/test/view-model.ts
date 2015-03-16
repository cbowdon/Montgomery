/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import moment = require('moment');
import config = require('../src/config');
import storage = require('./mock-storage');
import ViewModel = require('../src/view-model');
import DayViewModel = require('../src/day.view-model');
import EntryViewModel = require('../src/entry.view-model');

var tests = {

    'Add day => adds day with one (blank) entry': () => {
        // Fixture setup
        var cfg = config.defaults(),
            today = moment().format(cfg.format.date()),
            vm = new ViewModel(cfg, storage.create());

        // Exercise system
        vm.addDay();

        // Verify
        assert.strictEqual(vm.days().length, 1);
        assert.strictEqual(vm.days()[0].date(), today);
        assert.strictEqual(vm.days()[0].entries().length, 1);
        assert.strictEqual(vm.days()[0].entries()[0].id(), '');
    },

    'Save day with errors => not saved, no new entry': () => {
        // Fixture setup
        var cfg = config.defaults(),
            vm = new ViewModel(config.defaults(), storage.create()),
            day0: DayViewModel,
            entry0: EntryViewModel;

        vm.addDay();
        day0 = vm.days()[0];
        entry0 = day0.entries()[0];

        entry0.start().value('abcd');
        entry0.project().value(cfg.projects()[0]);

        // Exercise system
        vm.save(day0);

        // Verify
        assert.strictEqual(day0.entries().length, 1);
    },

    'Save valid day => saved, new entry added': () => {
        // Fixture setup
        var cfg = config.defaults(),
            vm = new ViewModel(config.defaults(), storage.create()),
            day0: DayViewModel,
            entry0: EntryViewModel;

        vm.addDay();
        day0 = vm.days()[0];
        entry0 = day0.entries()[0];

        entry0.start().value('0800');
        entry0.project().value(cfg.projects()[0]);

        // Exercise system
        vm.save(day0);

        // Verify
        assert.strictEqual(day0.entries().length, 2);
    },
};

export = tests;
