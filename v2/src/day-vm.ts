///<reference path="../typings/tsd.d.ts" />
///<reference path="../node_modules/mithril/mithril.d.ts" />
import model = require("./model");

export enum DayState { Minimized, Open, Deleted }

export class DayViewModel {
    state: MithrilProperty<DayState>;
    entries: MithrilProperty<EntryViewModel[]>;
    constructor() {
        this.state = m.prop(DayState.Open);
        this.entries = m.prop([]);
    }
    hide() {
        if (this.state() !== DayState.Deleted) {
            this.state(DayState.Minimized);
        }
    }
    show() {
        if (this.state() !== DayState.Deleted) {
            this.state(DayState.Open);
        }
    }
    remove() {
        this.state(DayState.Deleted);
    }
}

export class EntryViewModel {
    start = new InputViewModel();
    project = new InputViewModel();
    task = new InputViewModel();
    duration = new InputViewModel();
}

export class InputViewModel {
    value: MithrilProperty<string> = m.prop("");
    errors: MithrilProperty<string[]> = m.prop([]);
}
