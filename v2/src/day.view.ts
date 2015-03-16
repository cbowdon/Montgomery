/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import ViewModel = require('./view-model');
import DayViewModel = require('./day.view-model');
import viewEntry = require('./entry.view');
import html = require('./html');

class DayController {

    constructor(private vm: ViewModel) {
    }

    save(day: DayViewModel) : void {
        console.log('save');
        this.vm.save(day);
    }
}

export var controller = DayController;

export function view(ctrl: DayController, day: DayViewModel) : MithrilVirtualElement {
    var children = [
        m('div#date', day.date()),
        day.entries().map(viewEntry),
        html.button('+entry', e => {
            day.entries().map(entry => entry.showErrors(true));
            ctrl.save(day);
        }),
    ];

    return m(`div#day-${ day.date() }.day`, { key: day.date() }, children);
}
