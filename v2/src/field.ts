/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import moment = require('moment');

export class Field {
    value: MithrilProperty<string>;
    constructor(value: string) {
        this.value = m.prop(value);
    }
    errors() : string[] {
        return [];
    }
}

export class Text extends Field {
   constructor(text: string) {
       super(text);
   }
}

export class Time extends Text {
    constructor(private formats: string[], time: string) {
        super(time);
    }
    errors() : string[] {
        var time = moment(this.value(), this.formats, true);
        return time.isValid() ? [] : [ `"${this.value()}" is not a valid time` ];
    }
}

export class Select extends Field {
    options: MithrilProperty<string[]>;
    constructor(options: string[], selection: string) {
        super(selection);
        this.options = m.prop(options);
    }
    errors() : string[] {
        var isOption = this.options().some(o => o === this.value());
        return isOption ? [] : [ `"${this.value()}" is not a valid option` ];
    }
}
