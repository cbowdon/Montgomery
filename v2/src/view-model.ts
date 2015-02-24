/// <reference path="../node_modules/mithril/mithril.d.ts" />
import m = require('mithril');
import field = require('./field');
import val = require('./validation');

export class Day {
    entries: Entry[];
    validate() : void {
        throw new Error('nyi');
    }
}

export class Entry implements val.Validatable {
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
        return Object.keys(this.fields)
            .reduce((acc, k) => {
                var errs = this.fields[k].errors();
                return acc.concat(errs);
            }, []);
    }
}
