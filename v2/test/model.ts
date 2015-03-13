/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import Chance = require('chance');
import moment = require('moment');
import tsm = require('tsmonad');
import Model = require('../src/model');
import day = require('../src/day.model');
import config = require('../src/config');
import storage = require('./mock-storage');

var chance = new Chance(),
    projects = chance.n(chance.string, 5);

var tests = {

    'Add day (first) => date is today': () => {
        var model = new Model(storage.create());

        var d = model.newDay();

        assert.strictEqual(model.days().length, 1);
        assert.deepEqual(d, model.days()[0]);
        assert.ok(moment().isSame(d.date, 'day'));
    },

    'Add day (not first) => date is next working day': () => {
        var model = new Model(storage.create());

        var d0 = model.newDay();
        var d1 = model.newDay();

        assert.strictEqual(model.days().length, 2);
        assert.ok(d0.date.isBefore(d1.date));
        // precise next working day calculation tested elsewhere
    },

    'Save an invalid day => errors': () => {
        // at this stage there is nothing to validate
    },

    'Save valid model => add day': () => {
        var model = new Model(storage.create());
        var dayModel = day.fromRaw({
            date: '2013-09-09T00:00:00.000Z',
            entries: [
                { start: '2013-09-09T11:15:00.000Z', project: projects[0], task: chance.string() },
                { start: '2013-09-09T12:00:00.000Z', project: projects[1], task: chance.string() },
                { start: '2013-09-09T12:50:00.000Z', project: projects[2], task: chance.string() },
                { start: '2013-09-09T14:25:00.000Z', project: projects[3], task: chance.string() },
            ]
        });
        model.save(dayModel)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    assert.strictEqual(Object.keys(model.days()).length, 1);
                }
            });
    },

    'Save valid model => populated day': () => {
        var model = new Model(storage.create());
        var dayModel = day.fromRaw({
            date: '2013-09-09T00:00:00.000Z',
            entries: [
                { start: '2013-09-09T12:34:00.000Z', project: projects[0], task: chance.string() },
                { start: '2013-09-09T12:35:00.000Z', project: projects[1], task: chance.string() },
                { start: '2013-09-09T12:36:00.000Z', project: projects[2], task: chance.string() },
                { start: '2013-09-09T12:37:00.000Z', project: projects[3], task: chance.string() },
            ]
        });
        model.save(dayModel)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    assert.ok(moment(dayModel.date).isSame(d.date));
                    assert.strictEqual(dayModel.entries.length, Object.keys(d.entries).length);
                }
            });
    },

    'Save valid model => durations calculated': () => {
        var model = new Model(storage.create()),
            dayModel = day.fromRaw({
                date: '2013-09-09T00:00:00.000Z',
                entries: [
                    { start: '2013-09-09T11:15:00.000Z', project: projects[0], task: chance.string() },
                    { start: '2013-09-09T12:00:00.000Z', project: projects[1], task: chance.string() },
                    { start: '2013-09-09T12:50:00.000Z', project: projects[2], task: chance.string() },
                    { start: '2013-09-09T14:25:00.000Z', project: projects[3], task: chance.string() },
                ]
            });
        var result = model.save(dayModel);
        result.caseOf({
            left: e => assert.fail(e.join(' ')),
            right: d => {
                var durations = d.entries.map(e => e.duration);
                assert.strictEqual(45, getDuration(durations[0]));
                assert.strictEqual(50, getDuration(durations[1]));
                assert.strictEqual(95, getDuration(durations[2]));
                assert.strictEqual(0, getDuration(durations[3]));
            }
        });
    },

    'Save valid model with new entry => update day': () => {
        var model = new Model(storage.create());
        var dm1 = day.fromRaw({
            date: '2013-09-09T00:00:00.000Z',
            entries: [
                { start: '2013-09-09T11:15:00.000Z', project: projects[0], task: chance.string() },
                { start: '2013-09-09T12:00:00.000Z', project: projects[1], task: chance.string() },
                { start: '2013-09-09T12:50:00.000Z', project: projects[2], task: chance.string() },
                { start: '2013-09-09T14:25:00.000Z', project: projects[3], task: chance.string() },
            ]
        });
        var dm2 = day.fromRaw({
            date: '2013-09-09T00:00:00.000Z',
            entries: [
                { start: '2013-09-09T11:15:00.000Z', project: projects[0], task: chance.string() },
                { start: '2013-09-09T12:00:00.000Z', project: projects[1], task: chance.string() },
                { start: '2013-09-09T12:50:00.000Z', project: projects[2], task: chance.string() },
                { start: '2013-09-09T14:00:00.000Z', project: projects[3], task: chance.string() },
                { start: '2013-09-09T14:50:00.000Z', project: projects[4], task: chance.string() },
            ]
        });
        model.save(dm1); // first result tested elsewhere
        model.save(dm2)
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

    'Save valid model with lunch and home => new day': () => {
        var model = new Model(storage.create());
        var dm = day.fromRaw({
            date: '2013-09-09T00:00:00.000Z', // a Monday
            entries: [
                { start: '2013-09-09T08:00:00.000Z', project: projects[0], task: chance.string() },
                { start: '2013-09-09T12:30:00.000Z', project: config.defaults().lunch(), task: chance.string() },
                { start: '2013-09-09T13:00:00.000Z', project: projects[1], task: chance.string() },
                { start: '2013-09-09T16:00:00.000Z', project: config.defaults().home(), task: chance.string() },
            ]
        });
        model.save(dm)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    assert.strictEqual(Object.keys(model.days()).length, 2);
                    assert.strictEqual(model.days()[1].entries.length, 0);
                }
            });
    },

    'Save valid model block day with home => new day': () => {
        var model = new Model(storage.create());
        var dm = day.fromRaw({
            date: '2013-09-09T00:00:00.000Z',
            entries: [
                { start: '2013-09-09T08:00:00.000Z', project: projects[0], task: chance.string() },
                { start: '2013-09-09T16:00:00.000Z', project: config.defaults().home(), task: chance.string() },
            ]
        });
        model.save(dm)
            .caseOf({
                left: e => assert.fail(e),
                right: d => {
                    assert.strictEqual(Object.keys(model.days()).length, 2);
                    assert.strictEqual(model.days()[1].entries.length, 0);
                }
            });
    },

    'Clear storage => success': () => {
        var model = new Model(storage.create());
        var dm = day.fromRaw({
            date: '2013-09-09T00:00:00.000Z',
            entries: [
                { start: '2013-09-09T08:00:00.000Z', project: projects[0], task: chance.string() },
                { start: '2013-09-09T16:00:00.000Z', project: config.defaults().home(), task: chance.string() },
            ]
        });
        model.save(dm);

        model.clear();
        assert.ok(model.days().length === 0);
    },

    'Load from storage => populated models': () => {
        // Fixture setup
        var store = storage.create(),
            dm = day.fromRaw({
                date: '2013-09-09T00:00:00.000Z',
                entries: [
                    { start: '2013-09-09T08:00:00.000Z', project: projects[0], task: chance.string() },
                    { start: '2013-09-09T09:00:00.000Z', project: projects[1], task: chance.string() },
                ]
            }),
            model = new Model(store);

        // Exercise system
        model.save(dm);
        var result = model.days();

        // Verify
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].date.toISOString(), dm.date.toISOString());
        assert.strictEqual(result[0].entries.length, 2);
        assert.strictEqual(result[0].entries[0].start.toISOString(), '2013-09-09T08:00:00.000Z');
        assert.strictEqual(result[0].entries[1].start.toISOString(), '2013-09-09T09:00:00.000Z');
    },

};

function getDuration(dur: tsm.Maybe<Duration>) : number {
    return dur.caseOf({
        nothing: () => 0,
        just: d => 60 * d.hours() + d.minutes()
    });
}

function isJust<T>(maybe: tsm.Maybe<T>) : boolean {
    return maybe.caseOf({
        nothing: () => false,
        just: t => true
    });
}

export = tests;
