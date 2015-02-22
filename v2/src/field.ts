/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />

import m = require('mithril');
import tsm = require('tsmonad');

type Validator = (str:string) => tsm.Either<string,string>;

function isRightLength() : Validator {
    return s =>
        s.length === 3 || s.length === 2 ?
            tsm.Either.right(s) :
            tsm.Either.left(`${s} is not in the right format (Hmm or HHmm)`);
}

function isValidTime() : Validator {
    return s => {
        var min = s.substring(-2),
            hr = s.length === 3 ? s.substring(1) : s.substring(2),
            h = parseInt(hr),
            m = parseInt(min);
        return h >= 0 && h < 24 && m >= 0 && m < 60 ?
            tsm.Either.right(s) :
            tsm.Either.left(`${s} is not a valid time`);
    }
}

function isOneOf(options: string[]) : Validator {
    return s =>
        options.some(o => o === s) ?
            tsm.Either.right(s) :
            tsm.Either.left(`${s} is not one of the options`)
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
        super(validators.concat([isRightLength(), isValidTime()]));
    }
}

export class Select extends Text {
    constructor(options: string[], validators: Validator[] = []) {
        super(validators.concat(isOneOf(options)));
    }
}
