/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="store.ts" />

class ViewController {

    private templates = $('#templates');

    constructor(private store: Store) {

        this.addBlankRow(0);

        store.subscribe(evt => this.sync(evt));
    }

    private sync(evt: StoreUpdate) {
        var container = $('#entry-container');


        container.empty();

        _.each(evt.validated, (v, i) => {
            this.addBlankRow(i);
            this.fillRow(i, v.value);
            if (!v.isValid) {
                this.addErrors(i, v.errors);
            }
        });

        // put focus on first row with errors
        container.find('.entry-row.has-error input:first').focus();

        if (_.every(evt.validated, v => v.isValid)) {
            this.addBlankRow(evt.validated.length);
        }
    }

    private addBlankRow(id: number) {
        var entries = $('#entry-container'),
            newRow  = this.templates.find('#entry').clone();

        newRow.attr('id', 'entry-' + id);
        entries.append(newRow);
    }

    private fillRow(id: number, values: RawEntry) {
        var row = $('#entry-' + id);

        row.find('input.date').val(values['date']);
        row.find('input.project').val(values['project']);
        row.find('input.task').val(values['task']);
        row.find('input.start').val(values['start']);
        row.addClass('has-success');
    }

    private addErrors(id: number, messages: string[]) {
        var row = $('#entry-' + id),
            ul  = row.find('#errors');

        row.addClass('has-error');
        ul.empty();

        messages.forEach(m => ul.append('<li>' + m + '</li>'));
    }

    private clearErrors(id: number) {
        var row = $('#entry-' + id),
            ul  = row.find('#errors');

        row.removeClass('has-error');
        ul.empty();
    }
}
