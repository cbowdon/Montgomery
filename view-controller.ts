/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="store.ts" />

class ViewController {

    private templates = $('#templates');
    private hiddenAdd = this.templates.find('#add');

    constructor(private store: Store) {
        var lastRow = $('#entry-' + store.rawEntries.length);

        lastRow.find('button#add').click(_ => this.hiddenAdd.click());

        store.addEventHandler(evt => this.addNewEntryRow(evt.store));
    }

    addNewEntryRow(store) {
        var entryContainer = $('#entry-container'),
            lastRow = entryContainer.last(),
            newRow  = this.templates.find('#entry').clone();

        newRow.attr('id', 'entry-' + store.rawEntries.length);

        newRow.find('button#add').click(_ => this.hiddenAdd.click());

        if (lastRow) {
            lastRow.find('button#add').hide().off('click');
        }

        entryContainer.append(newRow);
    }
}
