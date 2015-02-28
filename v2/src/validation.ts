/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');
import tsm = require('tsmonad');
import func = require('./func');

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
        if (bool) {
            this.suppression = bool;
            func.pairs(this.components())
                .forEach(pair => pair[1].suppressErrors(bool));
        }
        return this.suppression;
    }

    errors() : string[] {

        if (this.suppressErrors()) {
           return [];
        }

        var subResults = func.pairs(this.components())
            .map(e => e[1].errors())
            .reduce((acc, i) => acc.concat(i), []);

        var result = this.criteria()
            .reduce<string[]>((acc, crit) => {
                var errs = crit(this.value())
                    .caseOf({
                        just: (e:string) => [e],
                        nothing: () => []
                    });
                return acc.concat(errs);
            }, []);

        return result.concat(subResults);
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
