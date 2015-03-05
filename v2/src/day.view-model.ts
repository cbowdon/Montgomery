/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
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

    static blank(cfg: config.Config) : DayViewModel {
        var dayVM = new DayViewModel();
        dayVM.date = m.prop('');
        dayVM.entries = m.prop([ EntryViewModel.blank(cfg) ]);
        return dayVM;
    }

    static fromDay(cfg: config.Config, day: day.Day) {
        var dayVM = new DayViewModel();
        dayVM.date = m.prop(day.date.format(cfg.format.time()));
        dayVM.entries = m.prop(day.entries.map(e => EntryViewModel.fromEntry(cfg, e)));
        return dayVM;
    }
}

export = DayViewModel;
