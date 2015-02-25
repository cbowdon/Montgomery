///<reference path="../node_modules/mithril/mithril.d.ts" />
import vm = require('./view-model');
import Day = require('./day.view-model');
import Entry = require('./entry.view-model');
import field = require('./field');
import val = require('./validation');
import list = require('./list');

class Controller implements MithrilController {
    constructor() {
        vm.init();
    }
    update() : void {
        // passes vm.days to model.update
        throw new Error('nyi');
    }
}

export var controller = Controller;

export function view(ctrl: Controller) : MithrilVirtualElement {
    return m('div', vm.days().map(d => viewDay(ctrl, d)));
}

function viewDay(ctrl: Controller, day: Day) : MithrilVirtualElement {
    var header = [ m('div.date', day.date()) ];
    var entries = day.entries().map(e => viewEntry(ctrl, e));
    var submit = [ button(ctrl) ];
    return m(`div#${day.date()}.day`, list.flatten([ header, entries, submit ]));
}

function viewEntry(ctrl: Controller, e: Entry) : MithrilVirtualElement {
    var inputs = [
        input('#start[type=time]', e.fields.start),
        select('#project', e.fields.project),
        input('#task', e.fields.task)
    ];
    return m(`div.entry-${e.id()}`, inputs);
}

function input(css: string, field: field.Text) : MithrilVirtualElement {
    return m('span', [
        m(`input${css}`, { onchange: m.withAttr('value', field.value) }),
        listErrors(field),
    ]);
}

function select(css: string, field: field.Select) : MithrilVirtualElement {
    var options = [''].concat(field.options())
        .map(o => m('option', o));
    return m('span', [
        m(`select${css}`, { onchange: m.withAttr('value', field.value) }, options),
        listErrors(field)
    ]);
}

function listErrors(field: val.Validatable) : MithrilVirtualElement {
    var errs = field.errors().map(e => m('li', e));
    return m('ul', errs);
}

function button(ctrl: Controller) : MithrilVirtualElement {
    return m('input[type=button]', {
        value: '+',
        onclick: ctrl.update
    });
}
