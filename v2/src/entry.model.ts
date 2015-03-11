/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import moment = require('moment');
import tsm = require('tsmonad');

export class Entry {

    constructor(
        public start: Moment,
        public project: string,
        public task: string,
        public duration: tsm.Maybe<Duration>) {
    }

    toJSON() : string {
        return JSON.stringify({
            start: this.start.toISOString(),
            project: this.project,
            task: this.task
        });
    }
}

export interface RawEntry {
    start: string;
    project: string;
    task: string;
}

export function fromRaw(raw: RawEntry) : Entry {
    return new Entry(
        moment(raw.start),
        raw.project,
        raw.task,
        tsm.Maybe.nothing());
}
