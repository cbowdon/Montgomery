/// <reference path="../node_modules/mithril/mithril.d.ts" />
import tsm = require('tsmonad');
import model = require('./model');
import Day = require('./day.view-model');
import Entry = require('./entry.view-model');

class ViewModel {
    private _days: Day[] = [];

    days() : Day[] {
        return this._days;
    }

    init() : void {
        console.log('init vm');
        this._days = [ new Day([]) ];
    }

    update(day: Day) : void {
        model.update(toDayModel(day));
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
