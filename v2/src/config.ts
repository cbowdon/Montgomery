/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');

export interface Config {
    lunch: MithrilProperty<string>;
    home: MithrilProperty<string>;
    format: {
        date: MithrilProperty<string>;
        time: MithrilProperty<string>;
    };
    projects: MithrilProperty<string[]>;
}

export function defaults() : Config {
    return {
        lunch: m.prop('Lunch'),
        home: m.prop('Home'),
        format: {
            date: m.prop('YYYY-MM-DD'),
            time: m.prop('HH:mm'),
        },
        projects: m.prop([ 'Apples', 'Bananas', 'Cherries' ]),
    };
}
