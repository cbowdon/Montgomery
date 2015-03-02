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
                    assert.strictEqual(35, getDuration(durations[2]));
                    assert.strictEqual(0, getDuration(durations[3]));
                }
            });
    },
};

function getDuration(dur: tsm.Maybe<Duration>) : number {
    return dur.caseOf({
        nothing: () => 0,
        just: d => d.minutes()
    });
}

export = tests;
