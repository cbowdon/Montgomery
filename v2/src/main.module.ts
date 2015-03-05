/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import ViewModel = require('./view-model');
import config = require('./config');
import DayViewModel = require('./day.view-model');
import EntryViewModel = require('./entry.view-model');
import viewEntry = require('./entry.view');

class Controller {

    // controller only gets constructed once
    // so vm is effectively singleton
    vm = new ViewModel();

    config() : config.Config {
        return this.vm.config();
    }

    days() : DayViewModel[] {
        return this.vm.days();
    }

    save(day: DayViewModel) : void {
        this.vm.save(day);
    }
}

export var controller = Controller;

export function view(ctrl: Controller) : MithrilVirtualElement {
    console.log('view');
    return m('div#montgomery', [
        m('div#inputs', ctrl.days().map(d => viewDay(ctrl, d))),
        m('div#table', viewTable(ctrl.days())),
        m('div#chart', viewChart(ctrl.days())),
        m('div#config', viewConfig(ctrl, ctrl.config())),
    ]);
}

// these will be shipped out into their own files when implemented
function viewDay(ctrl: Controller, day: DayViewModel) : MithrilVirtualElement {
    console.log('view day');
    return m(`div#day-${ day.date() }`, [
        m('div#date', day.date()),
        day.entries().map(viewEntry),
        m('input[type=button]',
            { value: '+',
            onclick: (e:Event) => ctrl.save(day)
        }),
    ]);
}

function viewTable(days: DayViewModel[]) : MithrilVirtualElement {
    return m('div', 'todo - table');
}
function viewChart(days: DayViewModel[]) : MithrilVirtualElement {
    return m('div', 'todo - chart');
}
function viewConfig(ctrl: Controller, config: config.Config) : MithrilVirtualElement {
    return m('div', 'todo - config');
}
