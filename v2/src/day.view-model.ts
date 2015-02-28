/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import val = require('./validation');
import Entry = require('./entry.view-model');
import list = require('./list');
import func = require('./func');
import config = require('./config');

class Day extends val.Validatable {

    private day = moment();

    constructor() {
        super();
        console.log('day ctor');
    }

    entries() : Entry[] {
        return func.pairs(this.components())
            .filter(pair => pair[1] instanceof Entry)
            .map(pair => <Entry>pair[1]);
    }

    date() : string {
        return this.day.format(config.date_format);
    }

    errors() : string[] {
        throw new Error('nyi');
    }
}

export = Day;
