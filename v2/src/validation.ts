/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import tsm = require('tsmonad');
import moment = require('moment');

export interface Validatable {
    errors(): string[];
}

export type Validator = (str:string) => tsm.Either<string,string>;

export function isValidTime() : Validator {
    return s => {
        var formats = [ 'HHmm', 'HH:mm' ],
            time = moment(s, formats, true);
        return time.isValid() ?
            tsm.Either.right(s) :
            tsm.Either.left(`${s} is not a valid time`);
    }
}

export function isOneOf(options: string[]) : Validator {
    return s =>
        options.some(o => o === s) ?
            tsm.Either.right(s) :
            tsm.Either.left(`"${s}" is not one of the options`)
}

