/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import field = require('./field');
import val = require('./validation');
import list = require('./list');

class Entry extends val.Validatable {

    constructor(projects: string[], suppressErrors = false) {
        super();
        this.components({
            start: new field.Time(),
            project: new field.Select(projects),
            task: new field.Text(),
        });
        this.suppressErrors(suppressErrors);
    }

    // convenient accessors
    start = () => <field.Time>this.components()['start'];
    project = () => <field.Select>this.components()['project'];
    task = () => <field.Text>this.components()['task'];

    static makeFactory(projects: string[]) {
        return (data: {
            start: string;
            project: string;
            task?: string;
        }) => {
            var entry = new Entry(projects);
            entry.components()['start'].value(data.start);
            entry.components()['project'].value(data.project);
            entry.components()['task'].value(data.task);
            return entry;
        }
    }
}

export = Entry;
