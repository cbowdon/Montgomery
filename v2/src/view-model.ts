/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import Model = require('./model');
import DayViewModel = require('./day.view-model');
import EntryViewModel = require('./entry.view-model');
import day = require('./day.model');
import entry = require('./entry.model');
import config = require('./config');

class ViewModel {
    private model = new Model();

    // TODO will need to re-save everything if config changed
    config = m.prop(config.defaults());

    days = m.prop(new Array<DayViewModel>()); // { get; private set; }

    blank = m.prop(DayViewModel.blank(this.config()));

    private load() : DayViewModel[] {
        var dayVms = this.model.days()
            .map(d => DayViewModel.fromDay(this.config(), d))
            .concat([ this.blank() ]);
        return this.days(dayVms);
    }

    save(dayVM: DayViewModel) : void {
        // validate view model
        // convert to model
        // validate model (call save)
        // if success then reload else set errors
        var raw = dayVM.toRaw();
        console.log(raw);
        var dayModel = day.fromRaw(this.config(), dayVM.toRaw());
        console.log(dayModel);
        this.model.save(dayModel);
        this.load();
    }

    constructor() {
        this.load();
    }
}

export = ViewModel;
