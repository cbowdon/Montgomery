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

    constructor(cfg: config.Config, storage: Storage) {
        this.cfg = m.prop(cfg);
        this.model = new Model(storage);
        this.load();
    }

    private model: Model;

    cfg: MithrilProperty<config.Config>;

    days: MithrilProperty<DayViewModel[]> = m.prop([]);

    addDay() : void {
        console.log('vm add');
        var newDay = this.model.newDay(),
            dayVM = DayViewModel.fromDay(this.cfg(), newDay);
        this.days().push(dayVM);
    }

    clear() : void {
        this.model.clear();
        this.load();
    }

    save(dayVM: DayViewModel) : void {

        console.log('vm save');

        if (dayVM.entries().length > 0 &&
            dayVM.errors().some(x => true)) {
            //dayVM.listErrors(true);
            return;
        }

        var raw = dayVM.toRaw();
        var dayModel = day.fromRaw(dayVM.toRaw());
        this.model.save(dayModel);

        dayVM.entries().push(EntryViewModel.blank(this.cfg()));
    }

    load() : DayViewModel[] {
         var vms = this.model.days()
            .map(d => DayViewModel.fromDay(this.cfg(), d));

        return this.days(vms);
    }
}

export = ViewModel;
