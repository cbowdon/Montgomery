/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');
import entry = require('./entry.model');
import list = require('./list');

type EntryDictionary = list.Dictionary<entry.Entry>;

export interface Day {
    date: Moment;
    entries: entry.Entry[];
}

export interface RawDay {
    date: string;
    entries: entry.RawEntry[];
}

export function fromRaw(raw: RawDay) : Day {
    var initialEntries = raw.entries
        .map(entry.fromRaw)
        .sort((e1, e2) => e1.start.isBefore(e2.start) ? -1 : 1);

    var entries = initialEntries.map((e, i) => {
        var next = i + 1 < initialEntries.length ?
            tsm.Maybe.just(initialEntries[i + 1]) :
            tsm.Maybe.nothing<entry.Entry>();

        var duration = next.fmap(x => difference(e.start, x.start));

        return {
            start: e.start,
            project: e.project,
            task: e.task,
            duration: duration,
        };
    });

    return {
        date: moment(raw.date, config.date_format, true),
        entries: entries,
    };
}

export function hasHome(day: Day) : boolean {
    throw new Error('sfagsdgs');
}

function difference(m1: Moment, m2: Moment) : Duration {
    return moment.duration(m2.valueOf() - m1.valueOf());
}
