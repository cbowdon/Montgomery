/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/chance/chance.d.ts" />
/// <reference path="../extensions/qunit.ts" />
/// <reference path="../extensions/chance.ts" />
import Day = require('../src/day.view-model');

export = tests;
function tests() {
    // TODO
    QUnit.module('day.view-model');
    QUnit.test('Valid day => no errors', assert => {
    });
    QUnit.test('Block day => no errors', assert => {
    });
    QUnit.test('No lunch => expect error', assert => {
    });
    QUnit.test('No home => expect error', assert => {
    });
    QUnit.test('Less than expected => expect warning', assert => {
    });
    QUnit.test('More than expected => expect warning', assert => {
    });
}
