/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import assertx = require('./assertx');
import chance = require('./chancex');
import Entry = require('../src/entry.view-model');

var projects = chance.n(chance.string, 5);

var tests = {
}
export = tests;
