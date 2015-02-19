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
