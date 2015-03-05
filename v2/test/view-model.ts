/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import ViewModel = require('../src/view-model');

var tests = {
    'New view model days => day with single blank entry': () => {
        var vm = new ViewModel(),
            days = vm.days(),
            entries = days[0].entries();
        assert.strictEqual(days.length, 1, 'Single day');
        assert.strictEqual(entries.length, 1, 'Single entry');
        assert.deepEqual(entries[0].toRaw(), {
            start: '',
            project: '',
            task: '',
        }, 'Entry is blank');
    }
};

export = tests;
