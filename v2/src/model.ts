/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');
import entry = require('./entry.model');
import day = require('./day.model');
import list = require('./list');

type DayDictionary = list.Dictionary<day.Day>;

class Model {

    private _days: DayDictionary = {};

    days() : DayDictionary {
        return this._days;
    }

    update(raw: day.RawDay) : tsm.Either<string[], day.Day> {
        var updatedDay = tsm.Either.right(day.fromRaw(raw));
        updatedDay.fmap(d => {
            var key = d.date.format(config.date_format);
            this._days[key] = d;
            // if d has a home entry
                // add a new day
        });
        return updatedDay;
    }
}

export = Model;
