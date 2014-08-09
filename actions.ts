/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="dispatcher.ts" />

class Actions {

    private templates = $('#templates');
    private date = $('#date');

    constructor(private dispatcher: Dispatcher) {
        this.templates.find('#entry button.add').click(evt => this.addEntry(evt));
        this.date.val(new Date().toISOString());
    }

    addEntry(evt: Event) {
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
