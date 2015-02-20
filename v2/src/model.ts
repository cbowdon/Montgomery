/// <reference path="../typings/tsd.d.ts" />
export interface Entry {
    start: Moment;
    project: string;
    task: string;
    duration: Duration;
}

export interface Day {
    entries: Entry[];
    add(entry: Entry): void;
    del(entry: Entry): void;
}

export class Store {
    load(): Day[] { throw new Error("nyi"); }
    save(day: Day[]): void { throw new Error("nyi"); }
}
