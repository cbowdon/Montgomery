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

    constructor() {
        this.load();
    }

    private model = new Model(config.defaults(), localStorage);

    // TODO will need to re-save everything if config changed
    config = m.prop(config.defaults());

    days: MithrilProperty<DayViewModel[]> = m.prop([]);

    addDay() : void {
        this.days().push(DayViewModel.blank(this.config()));
    }

    clear() : void {
        this.model.clear();
        this.load();
    }

    save(dayVM: DayViewModel) : void {

        console.log('vm save');

        dayVM.entries().push(EntryViewModel.blank(this.config()));

        var raw = dayVM.toRaw();
        var dayModel = day.fromRaw(this.config(), dayVM.toRaw());
        this.model.save(dayModel);
        // TODO sync with model
        //this.load();
    }

    load() : DayViewModel[] {
         var vms = this.model.days()
            .map(d => DayViewModel.fromDay(this.config(), d));

        return this.days(vms);
    }
}

export = ViewModel;
