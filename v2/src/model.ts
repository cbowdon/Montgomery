/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');

class Model {

    private _days: Dictionary<Day> = {};

    days() : Dictionary<Day> {
        return this._days;
    }

    update(raw: RawDay) : tsm.Either<string[], Day> {
        var day = tsm.Either.right(buildDay(raw));
        day.fmap(d => this._days[d.date.format()] = d);
        return day;
    }
}

var model = new Model();
export = model;

interface Dictionary<T> { [id: string]: T }

interface RawEntry {
    start: string;
    project: string;
    task: string;
}

interface RawDay {
    date: string;
    entries: RawEntry[];
}

interface Entry {
    start: Moment;
    project: string;
    task: string;
    duration: tsm.Maybe<Duration>;
}

interface Day {
    date: Moment;
    entries: Entry[];
}

class Store {
    load(): MithrilPromise<Day[]> { throw new Error("nyi"); }
    save(day: Day[]): void { throw new Error("nyi"); }
}

function buildEntry(raw: RawEntry) : Entry {
    return {
        start: moment(raw.start, [ 'HHmm', 'HH:mm' ], true),
        project: raw.project,
        task: raw.task,
        duration: tsm.Maybe.nothing(),
    };
}

function difference(m1: Moment, m2: Moment) : Duration {
    return moment.duration(m2.valueOf() - m1.valueOf());
}

function buildDay(raw: RawDay) : Day {
    var initialEntries = raw.entries
        .map(buildEntry)
        .sort((e1, e2) => e1.start.isBefore(e2.start) ? -1 : 1);

    var entries = initialEntries.map((e, i) => {
        var next = i + 1 < initialEntries.length ?
            tsm.Maybe.just(initialEntries[i + 1]) :
            tsm.Maybe.nothing<Entry>();

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
