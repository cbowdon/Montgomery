/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import val = require('./validation');
import Entry = require('./entry.view-model');
import list = require('./list');
import config = require('./config');

class Day implements val.Validatable {

    private day = moment();

    entries = m.prop([ new Entry(config.projects) ]);

    date() : string {
        return this.day.format(config.date_format);
    }

    errors() : string[] {
        var errs = this.entries()
            .map(e => e.errors());
        return list.flatten(errs);
    }
}

export = Day;
