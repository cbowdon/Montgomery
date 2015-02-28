/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import val = require('./validation');

export class Field extends val.Validatable {
    value = m.prop('');
    constructor() {
        super();
    }
}

export class Text extends Field {
   constructor(criteria: val.Criterion[] = []) {
       super();
       this.criteria(criteria);
   }
}

export class Time extends Text {
    constructor(criteria: val.Criterion[] = []) {
        super(criteria.concat([ val.isValidTime() ]));
    }
}

export class Select extends Field {
    options: MithrilProperty<string[]>;
    constructor(options: string[], criteria: val.Criterion[] = []) {
        super();
        this.criteria([ val.isOneOf(options) ]);
        this.options = m.prop(options);
    }
}
