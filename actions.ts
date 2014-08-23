/// <reference path="typings/tsd.d.ts" />
/// <reference path="shortdate.ts" />
/// <reference path="dispatcher.ts" />

class Actions {

    constructor(private dispatcher: Dispatcher) {

        $('#updateEntries').click(evt => this.updateEntries());

        $(document).keyup(evt => {
            if (evt.key === 'Enter') {
                this.updateEntries();
            }
        });
    }

    private updateEntries() {
        var entries = $('#entry-container .entry-row'),
            data    = entries.map((i, e) => this.extractData($(e)));

        this.dispatcher.dispatch('entry', data);
    }

    private extractData(entry: JQuery) {
        return {
            date: entry.find('input.date').val(),
            project: entry.find('input.project').val(),
            task: entry.find('input.task').val(),
            start: entry.find('input.start').val(),
        };
    }
}
