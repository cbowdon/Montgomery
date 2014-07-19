/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="store.ts" />

class ViewController {

    private templates = $('#templates');
    private hiddenAdd = this.templates.find('#add');

    constructor(private store: Store) {
        var lastRow = $('#entry-container').last();

        lastRow.find('button#add').click(_ => this.hiddenAdd.click());

        this.addBlankRow(0);

        store.addEventHandler(evt => this.sync(evt));
    }

    private sync(evt: StoreUpdate) {
        var entriesOnPage = $('.entry-row').length - 1; // minus template

        if (evt.newEntry.isSuccess) {
            this.clearErrors(entriesOnPage - 1);
            this.fillRow(entriesOnPage - 1, evt.newEntry.value);
            this.addBlankRow(entriesOnPage);
        } else {
            this.addErrors(entriesOnPage - 1, evt.newEntry.errors);
        }
    }

    private addBlankRow(id) {
        var entries = $('#entry-container'),
            newRow  = this.templates.find('#entry').clone();

        newRow.attr('id', 'entry-' + id);
        newRow.find('button#add').click(_ => this.hiddenAdd.click());
        entries.append(newRow);
    }

    private fillRow(id, values) {
        var row = $('#entry-' + id);

        row.find('#project').val(values['project']);
        row.find('#task').val(values['task']);
        row.find('#start').val(values['start']);
        row.find('button#add').hide();
        row.addClass('has-success');
    }

    private addErrors(id, messages) {
        var row = $('#entry-' + id),
            ul  = row.find('#errors');

        row.addClass('has-error');
        ul.empty();

        messages.forEach(m => ul.append('<li>' + m + '</li>'));
    }

    private clearErrors(id) {
        var row = $('#entry-' + id),
            ul  = row.find('#errors');

        row.removeClass('has-error');
        ul.empty();
    }
}
