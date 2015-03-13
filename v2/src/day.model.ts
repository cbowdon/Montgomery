/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');
import tokens = require('./tokens');
import entry = require('./entry.model');
import list = require('./list');

export class Day {

    constructor(
        public date: Moment,
        public entries: entry.Entry[]) {
    }

    toJSON() : string {
        return JSON.stringify({
            date: this.date.toISOString(),
            entries: this.entries.map(JSON.stringify),
        });
    }

    toRaw() : RawDay {
        return {
            date: this.date.toISOString(),
            entries: this.entries.map(e => e.toRaw()),
        };
    }
}

export interface RawDay {
    date: string;
    entries: entry.RawEntry[];
}

export function fromRaw(raw: RawDay) : Day {
    var initialEntries = raw.entries
        .map(e => entry.fromRaw(e))
        .sort((e1, e2) => e1.start.isBefore(e2.start) ? -1 : 1);

    var entries = initialEntries.map((e, i) => {
        var next = i + 1 < initialEntries.length ?
            tsm.Maybe.just(initialEntries[i + 1]) :
            tsm.Maybe.nothing<entry.Entry>();

        var duration = next.fmap(x => difference(e.start, x.start));

        return new entry.Entry(
            e.start,
            e.project,
            e.task,
            duration);
    });

    return new Day(
        moment(raw.date),
        entries);
}

export function nextWorkingDay(datetime: string) : string {
    var dt = moment(datetime);
    // behavior on sat/sun not defined, currently just increments
    return dt.clone()
        .add(dt.isoWeekday() === 5 ? 3 : 1, 'days')
        .toISOString();
}

export function hasHome(day: Day) : boolean {
    var homes = day.entries
        .filter(e => e.project === tokens.home);
    return homes.length > 0;
}

function difference(m1: Moment, m2: Moment) : Duration {
    return moment.duration(m2.valueOf() - m1.valueOf());
}
