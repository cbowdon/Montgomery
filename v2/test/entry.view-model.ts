/// <reference path="../typings/tsd.d.ts" />
import assert = require('assert');
import assertx = require('./assertx');
import chance = require('./chancex');
import Entry = require('../src/entry.view-model');

var projects = chance.n(chance.string, 5),
    entryFactory = Entry.makeFactory(projects);

var tests = {

    'Components all valid => no errors': () => {
        var entry = entryFactory({
            start: chance.time(),
            project: projects[0],
            task: chance.string()
        });
        assertx.empty(entry.errors());
    },

    'N invalid components => N errors': () => {
        var entries = [
            entryFactory({
                start: chance.time(),
                project: '',
                task: chance.string()
            }),
            entryFactory({
                start: '3536',
                project: '',
                task: chance.string()
            }),
            entryFactory({
                start: '',
                project: projects[0],
                task: chance.string()
            }),
        ];
        entries.forEach(e => assertx.notEmpty(e.errors()));
    },

    'Suppress errors true => no errors': () => {
        var v = entryFactory({
            start: chance.string(),
            project: projects[0],
            task: chance.string()
        });

        v.suppressErrors(false);
        v.suppressErrors(true);
        assertx.empty(v.errors());
    },

    'Suppress errors false => errors': () => {
        var v = entryFactory({
            start: chance.string(),
            project: projects[0],
            task: chance.string()
        });

        v.suppressErrors(true);
        v.suppressErrors(false);
        assertx.notEmpty(v.errors());
    },

    'Suppress errors on parent => components all suppressed': () => {
        var v = entryFactory({
            start: chance.time(),
            project: projects[0],
            task: chance.string()
        });

        v.suppressErrors(true);

        assert.ok(v.suppressErrors());
        assert.ok(v.start().suppressErrors());
        assert.ok(v.project().suppressErrors());
        assert.ok(v.task().suppressErrors());
    },
}
export = tests;
