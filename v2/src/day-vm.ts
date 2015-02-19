///<reference path="../typings/tsd.d.ts" />
///<reference path="../node_modules/mithril/mithril.d.ts" />

import model = require("./model");

const enum DayState { Minimized, Open }

export class DayViewModel {
    state: MithrilProperty<DayState>;
    entries: MithrilProperty<EntryViewModel[]>;
}

export class EntryViewModel {
    start: MithrilProperty<Moment>;
    project: MithrilProperty<string>;
    task: MithrilProperty<string>;
    end: MithrilProperty<Duration>;
}
