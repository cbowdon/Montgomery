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

    'Save an invalid day => errors': () => {
        // at this stage there is nothing to validate
    },

    'Save valid model => add day': () => {
        var model = new Model(config.defaults(), storage.create());
        var dayModel = day.fromRaw(config.defaults(), {
            date: '2013-09-09',
            entries: [
                { start: '1115', project: projects[0], task: chance.string() },
                { start: '1200', project: projects[1], task: chance.string() },
                { start: '1250', project: projects[2], task: chance.string() },
                { start: '1425', project: projects[3], task: chance.string() },
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
        var model = new Model(config.defaults(), storage.create());
        var dayModel = day.fromRaw(config.defaults(), {
            date: '2013-09-09',
            entries: [
                { start: '12:34', project: projects[0], task: chance.string() },
                { start: '12:35', project: projects[1], task: chance.string() },
                { start: '12:36', project: projects[2], task: chance.string() },
                { start: '12:37', project: projects[3], task: chance.string() },
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
        var model = new Model(config.defaults(), storage.create()),
            dayModel = day.fromRaw(config.defaults(), {
                date: '2013-09-09',
                entries: [
                    { start: '1115', project: projects[0], task: chance.string() },
                    { start: '1200', project: projects[1], task: chance.string() },
                    { start: '1250', project: projects[2], task: chance.string() },
                    { start: '1425', project: projects[3], task: chance.string() },
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
        var model = new Model(config.defaults(), storage.create());
        var dm1 = day.fromRaw(config.defaults(), {
            date: '2013-09-09',
            entries: [
                { start: '1115', project: projects[0], task: chance.string() },
                { start: '1200', project: projects[1], task: chance.string() },
                { start: '1250', project: projects[2], task: chance.string() },
                { start: '1425', project: projects[3], task: chance.string() },
            ]
        });
        var dm2 = day.fromRaw(config.defaults(), {
            date: '2013-09-09',
            entries: [
                { start: '1115', project: projects[0], task: chance.string() },
                { start: '1200', project: projects[1], task: chance.string() },
                { start: '1250', project: projects[2], task: chance.string() },
                { start: '1400', project: projects[3], task: chance.string() },
                { start: '1450', project: projects[4], task: chance.string() },
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
        var model = new Model(config.defaults(), storage.create());
        var dm = day.fromRaw(config.defaults(), {
            date: '2013-09-09', // a Monday
            entries: [
                { start: '0800', project: projects[0], task: chance.string() },
                { start: '1230', project: config.defaults().lunch(), task: chance.string() },
                { start: '1300', project: projects[1], task: chance.string() },
                { start: '1600', project: config.defaults().home(), task: chance.string() },
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
        var model = new Model(config.defaults(), storage.create());
        var dm = day.fromRaw(config.defaults(), {
            date: '2013-09-09',
            entries: [
                { start: '0800', project: projects[0], task: chance.string() },
                { start: '1600', project: config.defaults().home(), task: chance.string() },
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
        var model = new Model(config.defaults(), storage.create());
        var dm = day.fromRaw(config.defaults(), {
            date: '2015-09-09',
            entries: [
                { start: '0800', project: projects[0], task: chance.string() },
                { start: '1600', project: config.defaults().home(), task: chance.string() },
            ]
        });
        model.save(dm);

        model.clear();
        assert.ok(model.days().length === 0);
    },

    'Load from storage => success': () => {
        var model = new Model(config.defaults(), storage.create());
        var dm = day.fromRaw(config.defaults(), {
            date: '2015-09-09',
            entries: [
                { start: '0800', project: projects[0], task: chance.string() },
                { start: '0900', project: projects[1], task: chance.string() },
            ]
        });
        model.save(dm);

        var result = model.days();
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].entries.length, 2);
        assert.ok(moment('08:00', 'HH:mm', true)
            .isSame(result[0].entries[0].start), 'Same time (e0)');
        assert.ok(moment('09:00', 'HH:mm', true)
            .isSame(result[0].entries[1].start), 'Same time (e1)');
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
