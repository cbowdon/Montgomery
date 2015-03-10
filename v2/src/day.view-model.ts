/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import EntryViewModel = require('./entry.view-model');
import day = require('./day.model');
import config = require('./config');

class DayViewModel {

    date: MithrilProperty<string>;
    entries: MithrilProperty<EntryViewModel[]>;

    toRaw() : day.RawDay {
        return {
            date: this.date(),
            entries: this.entries().map(e => e.toRaw())
        };
    }

    errors() : string[] {
        return this.entries()
            .reduce((acc, e) => {
                return acc.concat(e.errors());
            }, []);
    }

    static blank(cfg: config.Config) : DayViewModel {
        var dayVM = new DayViewModel(),
            date = moment().format(cfg.format.date()),
            entries = [ EntryViewModel.blank(cfg) ];

        dayVM.date = m.prop(date);
        dayVM.entries = m.prop(entries);
        return dayVM;
    }

    static fromDay(cfg: config.Config, day: day.Day) {
        var dayVM = new DayViewModel(),
            date = day.date.format(cfg.format.date()),
            entries = day.entries.map(e => EntryViewModel.fromEntry(cfg, e));

        dayVM.date = m.prop(date);
        dayVM.entries = m.prop(entries);
        return dayVM;
    }
}

export = DayViewModel;
