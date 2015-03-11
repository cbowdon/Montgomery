/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');
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

export function nextWorkingDay(day: Day) : Moment {
    var weekday = day.date.isoWeekday();
    // behavior on sat/sun not defined, currently just increments
    return day.date.clone().add(weekday === 5 ? 3 : 1, 'days');
}

export function hasHome(config: config.Config, day: Day) : boolean {
    var homes = day.entries
        .filter(e => e.project === config.home());
    return homes.length > 0;
}

function difference(m1: Moment, m2: Moment) : Duration {
    return moment.duration(m2.valueOf() - m1.valueOf());
}
