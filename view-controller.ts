/// <reference path="typings/jquery/jquery.d.ts" />

class ViewController {

    constructor() {
        // TODO addNewEntryRow should actually be trigged by store publish
        // and the button click should push to store
        $('div.current-row > button#add').click(el => this.addNewEntryRow(el));
    }

    addNewEntryRow(evt: Event) {
        var $row, rowId, $clone;

        $row = $(evt.target).parent('.row-container.current-row');
        rowId = $row.attr('id');

        $clone = $row.clone().attr('id', rowId + 'x');

        $clone.insertAfter($row);

        $row.find('button#add').hide().off('click');
        $row.removeClass('current-row');
        $clone.find('button#add').click(el => this.addNewEntryRow(el));
    }

    updateSum() {
        throw new Error('nein');
    }
}

var AppViewController = new ViewController();
