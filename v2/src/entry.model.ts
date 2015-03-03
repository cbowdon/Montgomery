/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');

export interface Entry {
    start: Moment;
    project: string;
    task: string;
    duration: tsm.Maybe<Duration>;
}

export interface RawEntry {
    start: string;
    project: string;
    task: string;
}

export function fromRaw(raw: RawEntry) : Entry {
    return {
        start: moment(raw.start, [ 'HHmm', 'HH:mm' ], true),
        project: raw.project,
        task: raw.task,
        duration: tsm.Maybe.nothing(),
    };
}
