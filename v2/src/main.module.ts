/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import ViewModel = require('./view-model');
import config = require('./config');
import html = require('./html');
import DayViewModel = require('./day.view-model');
import EntryViewModel = require('./entry.view-model');
import viewEntry = require('./entry.view');
import day = require('./day.view');

class Controller {

    // controller only gets constructed once
    // so vm is effectively singleton
    vm = new ViewModel(config.defaults(), localStorage);

    dayCtrl = new day.controller(this.vm);

    config() : config.Config {
        return this.vm.config();
    }

    days() : DayViewModel[] {
        return this.vm.days();
    }

    addDay() : void {
        this.vm.addDay();
    }

    clear() : void {
        console.log('clear');
        this.vm.clear();
    }
}

export var controller = Controller;

export function view(ctrl: Controller) : MithrilVirtualElement {
    console.log('view');
    return m('div#montgomery', [
        m('div#inputs', [
            ctrl.days().map(d => day.view(ctrl.dayCtrl, d)),
            html.button('+day', e => ctrl.addDay()),
        ]),
        m('div#table', viewTable(ctrl.days())),
        m('div#chart', viewChart(ctrl.days())),
        m('div#config', viewConfig(ctrl, ctrl.config())),
        html.button('clear all', e => ctrl.clear()),
    ]);
}

// these will be shipped into their own files/modules when implemented
function viewTable(days: DayViewModel[]) : MithrilVirtualElement {
    return m('div', 'todo - table');
}
function viewChart(days: DayViewModel[]) : MithrilVirtualElement {
    return m('div', 'todo - chart');
}
function viewConfig(ctrl: Controller, config: config.Config) : MithrilVirtualElement {
    return m('div', 'todo - config');
}
