/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');
import entry = require('./entry.model');
import day = require('./day.model');

var KEY = 'Montgomery';

class Model {

    constructor() {
        this.load();
    }

    // TODO replace array with ES6 map?
    days: MithrilProperty<day.Day[]> = m.prop([]);

    private load() : day.Day[] {
        return tsm.maybe(localStorage.getItem(KEY))
            .caseOf({
                nothing: () => this.days([]),
                just: d => this.days(JSON.parse(d))
            });
    }

    save(day: day.Day) : void {
        var existing = this.days()
            .filter(d => d.date.isSame(day.date));

        if (existing.length > 0) {
            existing[0].entries = day.entries;
        } else {
            this.days().push(day);
        }

        localStorage.setItem(KEY, JSON.stringify(this.days()));
    }
}

export = Model;
