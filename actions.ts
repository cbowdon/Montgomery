/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="dispatcher.ts" />

class Actions {

    private templates = $('#templates');

    constructor(private dispatcher: Dispatcher) {
        this.templates.find('#add').click(evt => this.addEntry(evt));
    }

    addEntry(evt) {
        var newRowIx  = $('.entry-row').length - 2,
            newRow    = $('#entry-' + newRowIx),
            data      = this.extractData(newRow);


        console.log(newRow);
        console.log(data);

        this.dispatcher.dispatch('entry', data);
    }

    private extractData(entry) {

        return {
            project: entry.find('#project').val(),
            task: entry.find('#task').val(),
            start: entry.find('#start').val(),
        };
    }
}
