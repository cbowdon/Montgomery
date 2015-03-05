/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import config = require('./config');
import entry = require('./entry.model');
import day = require('./day.model');

class Model {

    days = m.prop(new Array<day.Day>());

    private load() : day.Day[] {
        // get from local storage
        return this.days();
    }

    save(day: day.Day) : void {
        for (var d in this.days()) {
            if (d.date.isSame(day.date)) {
                d.entries = day.entries;
                return;
            }
        }
        this.days().push(day);
    }

}

export = Model;
