/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import EntryViewModel = require('./entry.view-model');
import day = require('./day.model');
import config = require('./config');

class DayViewModel {

    constructor(private cfg: config.Config) {
    }

    date: MithrilProperty<string>;
    entries: MithrilProperty<EntryViewModel[]>;

    toRaw() : day.RawDay {
        var date = moment(this.date(), this.cfg.format.date(), true);
        return {
            date: date.toISOString(),
            entries: this.entries().map(e => e.toRaw(date)),
        };
    }

    errors() : string[] {
        return this.entries()
            .reduce((acc, e) => {
                return acc.concat(e.errors());
            }, []);
    }

    static fromDay(cfg: config.Config, day: day.Day) {
        var dayVM = new DayViewModel(cfg),
            date = day.date.format(cfg.format.date()),
            entries = day.entries.map(e => EntryViewModel.fromEntry(cfg, e));

        if (entries.length === 0) {
            entries.push(EntryViewModel.blank(cfg));
        }

        dayVM.date = m.prop(date);
        dayVM.entries = m.prop(entries);
        return dayVM;
    }
}

export = DayViewModel;
