/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="store.ts" />

class ViewController {

    private templates = $('#templates');
    private hiddenAdd = this.templates.find('#entry button.add');

    constructor(private store: Store) {
        var lastRow = $('#entry-container').last();

        lastRow.find('button.add').click(_ => this.hiddenAdd.click());

        this.addBlankRow(0);

        store.addEventHandler(evt => this.sync(evt));
    }

    private sync(evt: StoreUpdate) {
        var entriesOnPage = $('#entry-container .entry-row').length;

        var i = 0;
        _.each(evt.validated, v => {
            if (v.isSuccess) {
                this.clearErrors(i);
                this.fillRow(i, v.value);
                console.log({ entriesOnPage: entriesOnPage, i: i });
                if (i === entriesOnPage - 1) {
                    this.addBlankRow(entriesOnPage);
                }
            } else {
                this.addErrors(i, v.errors);
            }
            i += 1;
        });
    }

    private addBlankRow(id: number) {
        var entries = $('#entry-container'),
            newRow  = this.templates.find('#entry').clone();

        newRow.attr('id', 'entry-' + id);
        newRow.find('button.add').click(_ => this.hiddenAdd.click());
        entries.append(newRow);
    }

    private fillRow(id: number, values: RawEntry) {
        var row = $('#entry-' + id);

        row.find('input.project').val(values['project']);
        row.find('input.task').val(values['task']);
        row.find('input.start').val(values['start']);
        row.find('button.add').hide();
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
