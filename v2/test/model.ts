/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/chance/chance.d.ts" />
import assert = require('assert');
import Chance = require('chance');
import moment = require('moment');
import tsm = require('tsmonad');
import model = require('../src/model');

var chance = new Chance(),
    projects = chance.n(chance.string, 5);

var tests = {
    'Valid view model => populated day': () => {
        var raw = {
            date: '2013-09-09',
            entries: [
                { start: '12:34', project: projects[0], task: chance.string() },
                { start: '12:35', project: projects[1], task: chance.string() },
                { start: '12:36', project: projects[2], task: chance.string() },
                { start: '12:37', project: projects[3], task: chance.string() },
            ]
        };
        model.update(raw)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    assert.ok(moment(raw.date).isSame(d.date));
                    assert.strictEqual(raw.entries.length, Object.keys(d.entries).length);
                }
            });
    },
    'Valid view model => durations calculated': () => {
        var raw = {
            date: '2013-09-09',
            entries: [
                { start: '1115', project: projects[0], task: chance.string() },
                { start: '1200', project: projects[1], task: chance.string() },
                { start: '1250', project: projects[2], task: chance.string() },
                { start: '1425', project: projects[3], task: chance.string() },
            ]
        };
        model.update(raw)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    var durations = d.entries.map(e => e.duration);
                    assert.strictEqual(45, getDuration(durations[0]));
                    assert.strictEqual(50, getDuration(durations[1]));
                    assert.strictEqual(95, getDuration(durations[2]));
                    assert.strictEqual(0, getDuration(durations[3]));
                }
            });
    },
    'Valid view model => add day': () => {
        var raw = {
            date: '2013-09-09',
            entries: [
                { start: '1115', project: projects[0], task: chance.string() },
                { start: '1200', project: projects[1], task: chance.string() },
                { start: '1250', project: projects[2], task: chance.string() },
                { start: '1425', project: projects[3], task: chance.string() },
            ]
        };
        model.update(raw)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    assert.strictEqual(Object.keys(model.days()).length, 1);
                }
            });
    },
    'Valid view model => update day': () => {
        var raw1 = {
            date: '2013-09-09',
            entries: [
                { start: '1115', project: projects[0], task: chance.string() },
                { start: '1200', project: projects[1], task: chance.string() },
                { start: '1250', project: projects[2], task: chance.string() },
                { start: '1425', project: projects[3], task: chance.string() },
            ]
        };
        var raw2 = {
            date: '2013-09-09',
            entries: [
                { start: '1115', project: projects[0], task: chance.string() },
                { start: '1200', project: projects[1], task: chance.string() },
                { start: '1250', project: projects[2], task: chance.string() },
                { start: '1400', project: projects[3], task: chance.string() },
                { start: '1450', project: projects[4], task: chance.string() },
            ]
        };
        model.update(raw1);
        model.update(raw2)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    assert.strictEqual(Object.keys(model.days()).length, 1);
                    assert.strictEqual(d.entries.length, 5);
                    assert.strictEqual(70, getDuration(d.entries[2].duration));
                    assert.strictEqual(50, getDuration(d.entries[3].duration));
                }
            });
    },
};

function getDuration(dur: tsm.Maybe<Duration>) : number {
    return dur.caseOf({
        nothing: () => 0,
        just: d => 60 * d.hours() + d.minutes()
    });
}

export = tests;