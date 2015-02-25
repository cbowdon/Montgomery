/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import field = require('./field');
import val = require('./validation');
import list = require('./list');

class Entry implements val.Validatable {
    id = m.prop(0);
    fields: {
        [id: string]: val.Validatable;
        start: field.Time;
        project: field.Select;
        task: field.Text;
    };
    constructor(projects: string[]) {
        this.fields = {
            start: new field.Time(),
            project: new field.Select(projects),
            task: new field.Text(),
        };
    }
    errors() : string[] {
        var errs = Object.keys(this.fields)
            .map(k => this.fields[k].errors())
        return list.flatten(errs);
    }

    static makeFactory(projects: string[]) {
        return (data: {
            start: string;
            project: string;
            task?: string;
        }) => {
            var entry = new Entry(projects);
            entry.fields.start.value(data.start);
            entry.fields.project.value(data.project);
            entry.fields.task.value(data.task);
            return entry;
        }
    }
}

export = Entry;
