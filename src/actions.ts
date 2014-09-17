/// <reference path="../typings/tsd.d.ts" />
/// <reference path="dispatcher.ts" />

function isEnter(evt: JQueryKeyEventObject) {
    return evt.keyCode === 13 &&
        !evt.shiftKey &&
        !evt.ctrlKey &&
        !evt.metaKey &&
        !evt.altKey;
}

class Actions {

    constructor(private dispatcher: Dispatcher) {

        $('#update-entries').click(evt => this.updateEntries());

        $('#entry-container').keyup(evt => {

            evt.stopPropagation();
            evt.preventDefault();

            if (isEnter(evt)) {
                this.updateEntries();
            }
        });

        $('#clear-tasks').click(evt => this.clearTasks());
    }

    private clearTasks() {
        localStorage.clear();
        location.reload(false);
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
