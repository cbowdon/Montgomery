/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');

export class Field {
    value: MithrilProperty<string>;
    constructor(value: string) {
        this.value = m.prop(value);
    }
}

export class Text extends Field {
   constructor(text: string) {
       super(text);
   }
}

export class Time extends Text {
    constructor(time: string) {
        super(time);
    }
}

export class Select extends Field {
    options: MithrilProperty<string[]>;
    constructor(options: string[], selection: string) {
        super(selection);
        this.options = m.prop([''].concat(options));
    }
}
