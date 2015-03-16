/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import EntryViewModel = require('./entry.view-model');
import html = require('./html');

function view(entry: EntryViewModel) : MithrilVirtualElement {
    var children = [
            html.input('.start', entry.start()),
            html.select('.project', entry.project()),
            html.input('.task', entry.task()),
            entry.duration().caseOf({
                just: d => d.toString(),
                nothing: () => 'in progress'
            }),
            entry.showErrors() ? html.list(entry.errors(), '.errors') : '',
        ];

    return m(`div#${entry.id()}.entry`, { key: entry.id() }, children);
}

export = view;
