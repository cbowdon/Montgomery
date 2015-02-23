/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />

import m = require('mithril');
import tsm = require('tsmonad');
import moment = require('moment');

type Validator = (str:string) => tsm.Either<string,string>;

function isValidTime() : Validator {
    return s => {
        var formats = [ 'HHmm', 'HH:mm' ],
            time = moment(s, formats, true);
        return time.isValid() ?
            tsm.Either.right(s) :
            tsm.Either.left(`${s} is not a valid time`);
    }
}

function isOneOf(options: string[]) : Validator {
    return s =>
        options.some(o => o === s) ?
            tsm.Either.right(s) :
            tsm.Either.left(`"${s}" is not one of the options`)
}

export class Text {
   value = m.prop('');
   errors: string[] = [];
   protected validators: Validator[];
   constructor(validators: Validator[] = []) {
        this.validators = validators;
   }
   validate() : void {
       this.errors = this.validators
        .reduce((acc, v) => {
            v(this.value())
                .caseOf({
                    left: e => acc.push(e),
                    right: s => 0
                });
            return acc;
        }, []);
   }
}

export class Time extends Text {
    constructor(validators: Validator[] = []) {
        super(validators.concat([ isValidTime() ]));
    }
}

export class Select extends Text {
    constructor(options: string[], validators: Validator[] = []) {
        super(validators.concat(isOneOf(options)));
    }
}
