/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import val = require('./validation');
import Entry = require('./entry.view-model');
import list = require('./list');

class Day implements val.Validatable {
    entries: MithrilProperty<Entry[]> = m.prop([]);
    date = m.prop(moment().format('YYYY-MM-DD'));
    errors() : string[] {
        var errs = this.entries()
            .map(e => e.errors());
        return list.flatten(errs);
    }
}

export = Day;
