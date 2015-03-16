/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import field = require('./field');
import entry = require('./entry.model');
import config = require('./config');

class EntryViewModel {

    constructor(private cfg: config.Config) {
    }

    start: MithrilProperty<field.Time>;
    project: MithrilProperty<field.Select>;
    task: MithrilProperty<field.Text>;
    duration: MithrilProperty<tsm.Maybe<Duration>>;
    showErrors: MithrilProperty<boolean>;

    id() {
        return this.start().value();
    }

    errors() : string[] {
        return this.start().errors()
            .concat(this.project().errors())
            .concat(this.task().errors());
    }

    toRaw(date: Moment) : entry.RawEntry {
        var time = moment(this.start().value(), this.cfg.format.time(), true),
            hr = time.hours(),
            min = time.minutes(),
            start = date.hours(hr).minutes(min);

        return {
            start: start.toISOString(),
            project: this.project().value(),
            task: this.task().value(),
        };
    }

    static blank(cfg: config.Config) : EntryViewModel {
        var entryVM = new EntryViewModel(cfg),
            formats = cfg.format.acceptableTimes();

        entryVM.start = m.prop(new field.Time(formats, ''));
        entryVM.project = m.prop(new field.Select(cfg.projects(), ''));
        entryVM.task = m.prop(new field.Text(''));
        entryVM.duration = m.prop(tsm.Maybe.nothing<Duration>());
        entryVM.showErrors = m.prop(false);

        return entryVM;
    }

    static fromEntry(cfg: config.Config, entry: entry.Entry) : EntryViewModel {
        var entryVM = new EntryViewModel(cfg),
            formats = cfg.format.acceptableTimes(),
            time = entry.start.format(cfg.format.time());

        entryVM.start = m.prop(new field.Time(formats, time));
        entryVM.project = m.prop(new field.Select(cfg.projects(), entry.project));
        entryVM.task = m.prop(new field.Text(entry.task));
        entryVM.duration = m.prop(entry.duration);
        entryVM.showErrors = m.prop(true);

        return entryVM;
    }
}

export = EntryViewModel;
