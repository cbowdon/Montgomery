/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../entry.ts" />

module ViewController {

    export class SumTable {

        private templates = $('#templates');

        constructor(ec: EntryCollection) {
            ec.subscribe(e => this.update(e.entries));
        }

        private update(entries: Entry[]) {
            var container   = $('#sum-container'),
                templ       = this.templates.find('#sum');

            container.empty();

            if (entries.length === 0) {
                return;
            }

            _.chain(entries)
                .sortBy(e => e.task)
                .sortBy(e => e.project)
                .sortBy(e => e.date.milliseconds())
                .each((e, i) => {
                    var newRow = templ.clone();

                    newRow.attr('id', 'sum-' + i);
                    newRow.find('.date').html(e.date.format('YYYY-MM-DD'));
                    newRow.find('.project').html(e.project);
                    newRow.find('.task').html(e.task);
                    newRow.find('.minutes').html(e.minutes.toString());

                    container.append(newRow);
                });
        }
    }
}
