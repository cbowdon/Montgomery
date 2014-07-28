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
        var newRowIx  = $('.entry-row').length - 2,
            newRow    = $('#entry-' + newRowIx),
            data      = this.extractData(newRow);


        console.log(newRow);
        console.log(data);

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
