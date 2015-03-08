/// <reference path="../typings/tsd.d.ts" />
import assert = require('./assertx');
import chance = require('./chancex');
import field = require('../src/field');
import config = require('../src/config');

var formats = config.defaults().format.acceptableTimes();

var tests = {
    // TODO

    'Any string => no errors': () => {
        var text = new field.Text(chance.string());
        //assert.empty(text.errors());
    },

    'Valid time(s) => no errors': () => {
        var validTimes = [
            '0000',
            '0123',
            '0000',
            '1234',
            '2359',
        ];
        validTimes.forEach(t => {
            var time = new field.Time(formats, t);
            assert.empty(time.errors(), t);
        });
    },

    'Invalid time(s) => errors': () => {
        var invalidTimes = [
            '11111',
            '111',
            '9999',
            '1260',
            '2459'
        ];
        invalidTimes.forEach(t => {
            var time = new field.Time(formats, t);
            assert.notEmpty(time.errors(), t);
        });
    },

    'Any value => no errors': () => {
        var text = new field.Select(['a', 'b', 'c'], 'a');
        assert.empty(text.errors());
    },

    'No value => errors': () => {
        var text = new field.Select(['a', 'b', 'c'], 'a');
        text.value('');
        assert.notEmpty(text.errors());
    },
};

export = tests;
