/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import EntryViewModel = require('./entry.view-model');
import field = require('./field');

function view(entry: EntryViewModel) : MithrilVirtualElement {
    return m(`div#${entry.id()}.entry`, [
        input('.start', entry.start()),
        select('.project', entry.project()),
        input('.task', entry.task())
    ]);
}

function input(css: string, field: field.Text) : MithrilVirtualElement {
    return m(`input${css}`, {
        value: field.value(),
        onchange: m.withAttr('value', field.value),
    });
}

function select(css: string, field: field.Select) : MithrilVirtualElement {
    var options = field.options().map(o => m('option', o));
    return m(`select${css}`, options, {
        value: field.value,
        onchange: m.withAttr('value', field.value),
    });
}

export = view;
