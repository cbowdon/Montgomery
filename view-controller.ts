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
        var container = $('#entry-container'), i = 0;

        container.empty();

        _.each(evt.validated, v => {
            this.addBlankRow(i);
            if (v.isSuccess) {
                this.fillRow(i, v.value);
            } else {
                this.addErrors(i, v.errors);
            }
            i += 1;
        });

        if (_.every(evt.validated, v => v.isSuccess)) {
            this.addBlankRow(i);
        }
    }

    private addBlankRow(id: number) {
        var entries = $('#entry-container'),
            newRow  = this.templates.find('#entry').clone();

        newRow.attr('id', 'entry-' + id);
        // TODO don't need hidden add no more, single update button
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
