/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="dispatcher.ts" />

class Actions {

    private templates = $('#templates');

    constructor(private dispatcher: Dispatcher) {
        this.templates.find('#add').click(evt => this.addEntry(evt));
    }

    addEntry(evt) {
        var el = $(evt.target).parent('.entry-row');

        this.dispatcher.dispatch('entry', this.extractData(el));
    }

    private extractData(entry) {

        return {
            project: entry.find('#project').val(),
            task: entry.find('#task').val(),
            start: entry.find('#start').val(),
        };
    }
}
