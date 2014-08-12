/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="dispatcher.ts" />

class Actions {

    private date = $('#date');

    constructor(private dispatcher: Dispatcher) {

        $('#updateEntries').click(evt => this.updateEntries());

        $(document).keyup(evt => {
            if (evt.key === 'Enter') {
                this.updateEntries();
            }
        });

        this.date.val(new Date().toISOString());
    }

    updateEntries() {
        var entries = $('#entry-container .entry-row'),
            data    = entries.map((i, e) => this.extractData($(e)));

        this.dispatcher.dispatch('entry', data);
    }

    private extractData(entry: JQuery) {
        return {
            date: this.date.val(),
            project: entry.find('input.project').val(),
            task: entry.find('input.task').val(),
            start: entry.find('input.start').val(),
        };
    }
}
