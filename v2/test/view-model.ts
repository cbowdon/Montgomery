/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import ViewModel = require('../src/view-model');

var tests = {
    'Add day => adds day with one (blank) entry': () => {
        var vm = new ViewModel();
        vm.addDay();
        assert.strictEqual(vm.days().length, 1, 'One day');
        assert.strictEqual(vm.days()[0].entries().length, 1, 'One entry');
        assert.strictEqual(vm.days()[0].entries()[0].id(), 'blank');
    },
};

export = tests;
