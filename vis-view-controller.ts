/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="typings/d3/d3.d.ts" />
/// <reference path="entry.ts" />

class VisViewController {

    private templates = $('#templates');

    constructor(entryCollection: EntryCollection) {
        entryCollection.subscribe(evt => this.update(evt.entries));
    }

    private update(entries: Entry[]) {
        var container   = $('#sum-container'),
            templ       = this.templates.find('#sum');

        container.empty();

        _.chain(entries)
            .sortBy(e => e.task)
            .sortBy(e => e.project)
            .sortBy(e => e.date.toMillis())
            .each((e, i) => {
                var newRow = templ.clone();

                newRow.attr('id', 'sum-' + i);
                newRow.find('.date').html(e.date.toISOString());
                newRow.find('.project').html(e.project);
                newRow.find('.task').html(e.task);
                newRow.find('.minutes').html(e.minutes.toString());

                container.append(newRow);
            });
    }
}
