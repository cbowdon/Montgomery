/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');
import entry = require('./entry.model');
import day = require('./day.model');
import func = require('./func');
import DataMap = require('./data-map');

type Dictionary = { [id: string]: day.Day };

class Model {

    private dm: DataMap<day.RawDay>;

    constructor(storage: Storage) {
        this.dm = new DataMap<day.RawDay>(storage);
    }

    newDay() : day.Day {
        var date = this.dm.size() > 0 ?
                day.nextWorkingDay(latest(this.dm.keys())) :
                moment().toISOString(),
            raw: day.RawDay = {
                date: date,
                entries: []
            };
        this.dm.insert(date, raw);
        return day.fromRaw(raw);
    }

    clear() : void {
        this.dm.clear();
    }

    days() : day.Day[] {
        return this.dm.elems()
            .map(day.fromRaw)
            .sort((d1, d2) => d1.date.isBefore(d2.date) ? -1 : 1);
    }

    save(d: day.Day) : tsm.Either<string[], day.Day> {

        this.dm.insert(d.date.toISOString(), d.toRaw());

        if (day.hasHome(d)) {
            this.newDay();
        }

        return tsm.Either.right(d);
    }
}

function latest(dates: string[]) : string {
    return dates.sort().reverse()[0];
}

export = Model;
