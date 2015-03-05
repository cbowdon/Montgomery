/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import field = require('./field');
import entry = require('./entry.model');
import config = require('./config');

class EntryViewModel {

    id: MithrilProperty<string>;
    start: MithrilProperty<field.Time>;
    project: MithrilProperty<field.Select>;
    task: MithrilProperty<field.Text>;
    duration: MithrilProperty<tsm.Maybe<Duration>>;

    toRaw() : entry.RawEntry {
        return {
            start: this.start().value(),
            project: this.project().value(),
            task: this.task().value(),
        };
    }

    static blank(cfg: config.Config) : EntryViewModel {
        var entryVM = new EntryViewModel();
        entryVM.id = m.prop('blank');
        entryVM.start = m.prop(new field.Time(''));
        entryVM.project = m.prop(new field.Select(cfg.projects(), ''));
        entryVM.task = m.prop(new field.Text(''));
        entryVM.duration = m.prop(tsm.Maybe.nothing<Duration>());
        return entryVM;
    }

    static fromEntry(config: config.Config, entry: entry.Entry) : EntryViewModel {
        var entryVM = new EntryViewModel(),
            time = entry.start.format(config.format.time());
        entryVM.id = m.prop(time);
        entryVM.start = m.prop(new field.Time(time));
        entryVM.project = m.prop(new field.Select(config.projects(), entry.project));
        entryVM.task = m.prop(new field.Text(entry.task));
        entryVM.duration = m.prop(entry.duration);
        return entryVM;
    }
}

export = EntryViewModel;
