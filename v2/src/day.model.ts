/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');
import entry = require('./entry.model');
import list = require('./list');

export interface Day {
    date: Moment;
    entries: entry.Entry[];
}

export interface RawDay {
    date: string;
    entries: entry.RawEntry[];
}

export function fromRaw(config: config.Config, raw: RawDay) : Day {
    var initialEntries = raw.entries
        .map(e => entry.fromRaw(config, e))
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
        date: moment(raw.date, config.format.date(), true),
        entries: entries,
    };
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
