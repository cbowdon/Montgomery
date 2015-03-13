/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import Chance = require('chance');
import config = require('../src/config');
import entry = require('../src/entry.model');

var chance = new Chance(),
    projects = chance.n(chance.string, 5),
    cfg = config.defaults();

var tests = {

    'Raw entry to JSON round trip => no data loss': () => {
        var raw0 = {
                start: '2013-09-09T12:34:00.000Z',
                project: projects[1],
                task: chance.string()
            },
            str = JSON.stringify(raw0),
            raw1 = JSON.parse(str);

        assert.deepEqual(raw1, raw0);
    },

    'From raw => valid entry': () => {
        var raw = {
            start: '2013-09-09T12:34:00.000Z',
            project: projects[1],
            task: chance.string()
        };
        var e = entry.fromRaw(raw);
        assert.ok(e);
    },

    'To JSON => serialized correctly': () => {
        var raw = {
                start: '2013-09-09T12:34:00.000Z',
                project: projects[1],
                task: chance.string()
            },
            e = entry.fromRaw(raw);

        assert.strictEqual(e.toJSON(),
            `{"start":"${raw.start}","project":"${raw.project}","task":"${raw.task}"}`);
    },

    'Round trip => no data loss': () => {
        var original = entry.fromRaw({
                start: '2013-09-09T12:34:00.000Z',
                project: projects[1],
                task: chance.string()
            }),
            forwards = original.toJSON(),
            backwards = entry.fromRaw(JSON.parse(forwards));

        assert.strictEqual(backwards.start.toISOString(), original.start.toISOString());
        assert.strictEqual(backwards.project, original.project);
        assert.strictEqual(backwards.task, original.task);
    },
};

export = tests;
