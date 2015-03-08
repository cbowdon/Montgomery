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

    // TODO will need to re-save everything if config changed
    constructor(cfg: config.Config, storage: Storage) {
        this.storage = storage;
        this.config = m.prop(cfg);
        this.model = new Model(cfg, storage);
        this.load();
    }

    private storage: Storage;
    private model: Model;

    config: MithrilProperty<config.Config>;

    days: MithrilProperty<DayViewModel[]> = m.prop([]);

    addDay() : void {
        console.log('vm add');
        var newDay = this.model.newDay(),
            newDayVM = DayViewModel.fromDay(this.config(), newDay);
        this.days().push(newDayVM);
        this.save(newDayVM);
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
