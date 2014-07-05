/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="store.ts" />

class ViewController {

    // The point of this is to decouple ViewController from Actions
    private hiddenAddBtn = $('#hidden-add');

    constructor(private store: Store) {
        var lastIx  = store.entries.length,
            lastRow = $('#entry-' + lastIx);

        lastRow.find('button#add').click(_ => this.hiddenAddBtn.click());

        store.addEventHandler(evt => this.addNewEntryRow(evt));
    }

    addNewEntryRow(storeUpdate) {
        var newIx   = storeUpdate.entries.length,
            lastIx  = newIx - 1,
            lastRow = $('#entry-' + lastIx),
            newRow;

        // clone old row
        newRow = lastRow.clone().attr('id', 'entry-' + newIx);

        // deactivate old button
        lastRow.find('button#add').hide().off('click');

        // hook up new button
        newRow.find('button#add').click(_ => this.hiddenAddBtn.click());
    }
}

var AppViewController = new ViewController(AppStore);
