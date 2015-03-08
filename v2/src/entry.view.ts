/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import EntryViewModel = require('./entry.view-model');
import field = require('./field');

function view(entry: EntryViewModel) : MithrilVirtualElement {
    var attrs = { onchange: (e:Event) => entry.showErrors(true) },
        children = [
            input('.start', entry.start()),
            select('.project', entry.project()),
            input('.task', entry.task()),
            entry.showErrors() ? list(entry.errors(), '.errors') : '',
        ];

    return m(`div#${entry.id()}.entry`, attrs, children);
}

function input(css: string, field: field.Text) : MithrilVirtualElement {
    return m(`input${css}`, {
        value: field.value(),
        onchange: m.withAttr('value', field.value),
    });
}

function select(css: string, field: field.Select) : MithrilVirtualElement {
    var options = [''].concat(field.options())
        .map(o => m('option', o));
    return m(`select${css}`,
        { value: field.value, onchange: m.withAttr('value', field.value) },
        options);
}

function list(items: string[], css = '') {
    return m(`ul${css}`, items.map(i => m('li', i)));
}

export = view;
