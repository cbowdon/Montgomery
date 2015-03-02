/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import val = require('./validation');
import Entry = require('./entry.view-model');
import list = require('./list');
import func = require('./func');
import config = require('./config');

var BLANK = 'BLANK';

class Day extends val.Validatable {

    private day = moment();

    date = m.prop(moment().format(config.date_format));
    // TODO
    value = m.prop('');

    constructor(entries: Entry[]) {
        super();
        this.components({
            BLANK: new Entry(config.projects, true)
        });
        entries.forEach(e => this.components()[e.start().value()] = e);
    }

    blank() : Entry {
        return <Entry>this.components()[BLANK];
    }

    entries() : Entry[] {
        return func.pairs(this.components())
            .filter(pair => pair[0] !== BLANK && pair[1] instanceof Entry)
            .map(pair => <Entry>pair[1]);
    }

    errors() : string[] {
        return [];
    }
}

export = Day;
