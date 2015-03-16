/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import field = require('./field');

export function input(css: string, field: field.Text) : MithrilVirtualElement {
    return m(`input${css}`, {
        value: field.value(),
        onchange: m.withAttr('value', field.value),
    });
}

export function select(css: string, field: field.Select) : MithrilVirtualElement {
    var options = [''].concat(field.options()).map(o => m('option', o)),
        attrs = {
            value: field.value(),
            onchange: m.withAttr('value', field.value),
        };

    return m(`select${css}`, attrs, options);
}

export function list(items: string[], css = '') {
    return m(`ul${css}`, items.map(i => m('li', i)));
}

export function button(label: string, func: (e:Event) => any) {
    return m('input[type=button]', { value: label, onclick: func });
}
