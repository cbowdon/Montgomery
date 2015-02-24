/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />

import m = require('mithril');
import tsm = require('tsmonad');
import val = require('./validation');

export class Text implements val.Validatable {
   value = m.prop('');
   protected validators: val.Validator[];
   constructor(validators: val.Validator[] = []) {
        this.validators = validators;
   }
   errors() : string[] {
       var result = this.validators
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
    constructor(validators: val.Validator[] = []) {
        super(validators.concat([ val.isValidTime() ]));
    }
}

export class Select extends Text {
    constructor(options: string[], validators: val.Validator[] = []) {
        super(validators.concat(val.isOneOf(options)));
    }
}
