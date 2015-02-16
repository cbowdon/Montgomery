///<reference path="../node_modules/mithril/mithril.d.ts" />
import vm = require("./day-vm");

class DayController {
    vm: vm.DayViewModel;
}

export var controller = DayController;

export var view = function(ctrl: DayController) : MithrilVirtualElement {
    return m("div", [
        m("input#start"),
        m("input#project"),
        m("input#task")
    ]);
};

function viewEntry(index: number, entry: vm.EntryViewModel) : MithrilVirtualElement {
    return m("div", [
        m(`input#start$(number)`),
        m(`input#project$(number)`),
        m(`input#task$(number)`)
    ]);
}
