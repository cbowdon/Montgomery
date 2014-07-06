/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="store.ts" />

class ViewController {

    private templates = $('#templates');
    private hiddenAdd = this.templates.find('#add');

    constructor(private store: Store) {
        var lastRow = $('#entry-' + store.rawEntries.length);

        lastRow.find('button#add').click(_ => this.hiddenAdd.click());

        store.addEventHandler(evt => this.addNewEntryRow(evt.store.entries.length));
    }

    addNewEntryRow(id, values=null) {
        var entryContainer = $('#entry-container'),
            lastRow = entryContainer.last(),
            newRow  = this.templates.find('#entry').clone();

        newRow.attr('id', 'entry-' + id);

        newRow.find('button#add').click(_ => this.hiddenAdd.click());

        if (values) {
            newRow.find('#project').val(values['project']);
            newRow.find('#task').val(values['task']);
            newRow.find('#start').val(values['start']);
        }

        if (lastRow) {
            lastRow.find('button#add').hide().off('click');
        }

        entryContainer.append(newRow);
    }
}
