/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../entry.ts" />

module ViewController {
    
    function displayHours(minutes: number) {
        var hrs = (minutes / 60.0).toString(),
            ptIdx = hrs.indexOf('.');
            
        // sub-minute rounding errors are tolerable
        return ptIdx === -1 ? hrs : hrs.substring(0, ptIdx + 3);
    }

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
                .sortBy(e => e.date.format(PREFERRED_DATE_FORMAT))
                .each((e, i) => {
                    var newRow = templ.clone();

                    newRow.attr('id', 'sum-' + i);
                    newRow.find('.date').html(e.date.format(PREFERRED_DATE_FORMAT));
                    newRow.find('.project').html(e.project);
                    newRow.find('.task').html(e.task);
                    newRow.find('.hours').html(displayHours(e.minutes));

                    container.append(newRow);
                });
        }
    }
}
