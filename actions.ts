/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="dispatcher.ts" />

class Actions {

    private hiddenAddBtn = $('#hidden-add');

    constructor(private dispatcher: Dispatcher) {
        this.hiddenAddBtn.click(evt => this.addEntry(evt));
    }

    addEntry(evt) {
        var el = $(evt.target)
              .parent('.entry-container')
              .find('.row-container')
              .last();

        this.dispatcher.dispatch('entry', this.extractData(el));
    }

    private extractData(entry) {

        return {
            project: entry.find('#project').val(),
            task: entry.find('#task').val(),
            start: entry.find('#start').val(),
            end: entry.find('#end').val(),
        };
    }
}
