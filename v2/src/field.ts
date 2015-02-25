/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />

import m = require('mithril');
import tsm = require('tsmonad');
import val = require('./validation');

export class Text implements val.Validatable {
   value = m.prop('');
   protected criteria: val.Criterion<string>[];
   constructor(criteria: val.Criterion<string>[] = []) {
        this.criteria = criteria;
   }
   errors() : string[] {
       var result = this.criteria
            .reduce((acc, v) => {
                v(this.value())
                    .caseOf({
                        left: e => acc.push(e),
                        right: s => 0
                    });
                return acc;
            }, []);
        return result;
   }
}

export class Time extends Text {
    constructor(criteria: val.Criterion<string>[] = []) {
        super(criteria.concat([ val.isValidTime() ]));
    }
}

export class Select extends Text {
    constructor(options: string[], criteria: val.Criterion<string>[] = []) {
        super(criteria.concat(val.isOneOf(options)));
    }
}
