/// <reference path="../node_modules/mithril/mithril.d.ts" />
import tsm = require('tsmonad');
import Model = require('./model');
import Day = require('./day.view-model');
import Entry = require('./entry.view-model');
import entry = require('./entry.model');
import day = require('./day.model');
import func = require('./func');
import config = require('./config');

class ViewModel {
    private model = new Model();
    private entryFactory = Entry.makeFactory(config.projects);

    days() : Day[] {
        return func.pairs(this.model.days())
            .map(pair => pair[1])
            .map(d => {
                var raw = day.toRaw(d);
                return new Day(raw.date, raw.entries.map(this.entryFactory));
            });
    }

    init() : void {
        console.log('init vm');
    }

    update(day: Day) : void {
        this.model.update(toDayModel(day));
    }
}

var vm = new ViewModel();
export = vm;

function toEntryModel(entry: Entry) {
    return {
        start: entry.start().value(),
        project: entry.project().value(),
        task: entry.task().value(),
    };
}

function toDayModel(day: Day) {
    return {
        date: day.date(),
        entries: day.entries()
                    .concat(day.blank())
                    .map(toEntryModel)
    };
}
