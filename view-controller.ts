/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="store.ts" />

class ViewController {

    private templates = $('#templates');
    private hiddenAdd = this.templates.find('#add');

    constructor(private store: Store) {
        var lastRow = $('#entry-' + store.rawEntries.length);

        lastRow.find('button#add').click(_ => this.hiddenAdd.click());

        store.addEventHandler(evt => this.syncWithStore(evt.store));
    }

    syncWithStore(store: Store) {
        var entriesOnPage = $('.entry-row').length - 1; // minus template
        store.rawEntries.forEach((val, id) => {
            if (entriesOnPage <= id) {
                this.addRow(id, val);
            }
        });
        this.addRow(store.rawEntries.length);
    }

    addRow(id, values=null) {
        var entryContainer = $('#entry-container'),
            lastRow = entryContainer.last(),
            newRow  = this.templates.find('#entry').clone();

        if (lastRow) {
            lastRow.find('button#add').hide().off('click');
        }

        newRow.attr('id', 'entry-' + id);

        if (values) {
            newRow.find('#project').val(values['project']);
            newRow.find('#task').val(values['task']);
            newRow.find('#start').val(values['start']);
            newRow.find('button#add').hide();
        } else {
            newRow.find('button#add').click(_ => this.hiddenAdd.click());
        }

        entryContainer.append(newRow);
    }
}
