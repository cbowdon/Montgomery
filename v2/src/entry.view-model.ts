/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import field = require('./field');
import entry = require('./entry.model');
import config = require('./config');
import tokens = require('./tokens');

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
            start = date.hours(hr).minutes(min),
            proj = this.tokenize(this.project().value());

        return {
            start: start.toISOString(),
            project: proj,
            task: this.task().value(),
        };
    }

    private tokenize(value: string) : string {
        if (value === this.cfg.home()) {
            return tokens.home;
        }
        if (value === this.cfg.lunch()) {
            return tokens.lunch;
        }
        return value;
    }

    private detokenize(value: string) : string {
        if (value === tokens.home) {
            return this.cfg.home();
        }
        if (value === tokens.lunch) {
            return this.cfg.lunch();
        }
        return value;
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
            time = entry.start.format(cfg.format.time()),
            proj = entryVM.detokenize(entry.project);

        entryVM.start = m.prop(new field.Time(formats, time));
        entryVM.project = m.prop(new field.Select(cfg.projects(), proj));
        entryVM.task = m.prop(new field.Text(entry.task));
        entryVM.duration = m.prop(entry.duration);
        entryVM.showErrors = m.prop(true);

        return entryVM;
    }
}

export = EntryViewModel;
