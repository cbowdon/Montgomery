/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');

interface ComponentDictionary {
    [id: string]: Validatable;
}

export class Validatable {

    // abstract
    value: <T>(val?: T) => T;

    components = m.prop<ComponentDictionary>({});
    criteria = m.prop([]);

    private suppression = false;
    suppressErrors = (bool?: boolean) : boolean => {
        this.suppression = bool;
        //this.components().forEach(c => c.suppressErrors(bool));
        return this.suppression;
    }

    errors() : string[] {
       if (this.suppressErrors()) {
           return [];
       }
       var result = this.criteria()
            .reduce((acc, v) => {
                v(this.value())
                    .caseOf({
                        just: (e:string) => acc.push(e),
                        nothing: () => 0
                    });
                return acc;
            }, []);
        return result;
    }
}

export interface Criterion {
    (t: any): tsm.Maybe<string>;
}

export function isValidTime() : Criterion {
    return s => {
        var formats = [ 'HHmm', 'HH:mm' ],
            time = moment(s, formats, true);
        return time.isValid() ?
            tsm.Maybe.nothing() :
            tsm.Maybe.just(`${s} is not a valid time`);
    }
}

export function isOneOf(options: string[]) : Criterion {
    return s =>
        options.some(o => o === s) ?
            tsm.Maybe.nothing() :
            tsm.Maybe.just(`"${s}" is not one of the options`)
}
