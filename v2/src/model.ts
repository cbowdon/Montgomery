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

class Model {

    static STORAGE_KEY = 'Montgomery';

    constructor(
        // TODO get rid of config here we don't need it
        private cfg: config.Config,
        private storage: Storage) {
        this.load();
    }

    private load() : void {
        this.map = tsm.maybe<string>(this.storage.getItem(Model.STORAGE_KEY))
            .caseOf({
                nothing: () => Object.create(null),
                just: d => JSON.parse(d),
            });
    }

    private map: { [id: string]: day.Day } = Object.create(null);

    private set(d: day.Day) : day.Day {
        var key = d.date.format(this.cfg.format.date());
        this.map[key] = d;
        return d;
    }

    clear() : void {
        this.storage.clear();
        this.load();
    }

    days() : day.Day[] {
        return func.pairs(this.map)
            .map(p => p[1])
            .sort((d1, d2) => d1.date.isBefore(d2.date) ? -1 : 1);
    }

    newDay() : day.Day {
        var dates = Object.keys(this.map).sort().reverse(),
            latest = dates.length > 0 ?
                day.nextWorkingDay(this.map[dates[0]]) :
                moment();

        return this.set({
            date: latest,
            entries: [],
        });
    }

    save(d: day.Day) : tsm.Either<string[],day.Day> {

        // TODO should not accept adding new days here?
        // force VM through newDay?

        this.set(d);

        // TODO tokenize cfg.home before we get to Model
        if (day.hasHome(this.cfg, d)) {
            this.set({
                date: day.nextWorkingDay(d),
                entries: [],
            });
        }

        this.storage.setItem(Model.STORAGE_KEY, JSON.stringify(this.map));

        // currently no validation to do
        return tsm.Either.right(d);
    }
}

export = Model;
