///<reference path="../node_modules/mithril/mithril.d.ts" />
import Day = require('./day.view-model');
import Entry = require('./entry.view-model');
import field = require('./field');
import val = require('./validation');

class Controller implements MithrilController {
    day: Day = new Day();
    constructor() {
        var factory = Entry.makeFactory([ 'Test', '1234' ]);
        this.day.entries([ factory({ start: '1234', project: 'Test' }) ]);
    }
}

export var controller = Controller;

export function view(ctrl: Controller) : MithrilVirtualElement {
    var header = [ m('div.date', ctrl.day.date()) ];
    var entries = ctrl.day.entries().map(e => viewEntry(ctrl, e));
    return m(`div#${ctrl.day.date()}.day`, header.concat(entries));
}

function viewEntry(ctrl: Controller, e: Entry) {
    var inputs = [
        input('#start[type=time]', e.fields.start),
        select('#project', e.fields.project),
        input('#task', e.fields.task)
    ];
    return m(`div.entry-${e.id()}`, inputs);
}

function input(css: string, field: field.Text) {
    return m('span', [
        m(`input${css}`, { onchange: m.withAttr('value', field.value) }),
        listErrors(field),
    ]);
}

function select(css: string, field: field.Select) {
    var options = field.options()
        .map(o => m('option', o));
    return m('span', [
        m(`select${css}`, options),
        listErrors(field)
    ]);
}

function listErrors(field: val.Validatable) {
    var errs = field.errors().map(e => m('li', e));
    return m('ul', errs);
}
