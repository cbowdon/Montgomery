/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import field = require('field');

export class Day {
    entries: Entry[];
    validate() : void {
        throw new Error('nyi');
    }
}

export class Entry {
    start = new field.Time();
    project: field.Select;
    task = new field.Text();
    errors: string[] = [];
    constructor(projects: string[]) {
        this.project = new field.Select(projects);
    }
    validate() : void {
        throw new Error('nyi');
    }
}
