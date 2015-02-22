///<reference path="../node_modules/mithril/mithril.d.ts" />
import vm = require("./day-vm");

class DayController {
    vm = new vm.DayViewModel();
    blank = new vm.EntryViewModel();
    add = (entry: vm.EntryViewModel) => {
        // validate
        this.vm.entries().push(entry);
        this.blank = new vm.EntryViewModel();
    };
}

/// Responsible for entries in a single day
export var controller = DayController;

export var view = function(ctrl: DayController) : MithrilVirtualElement {
    var entries = ctrl.vm.entries().map(viewEntry);
    return m("div.day", entries.concat(viewBlankEntry(ctrl)));
};

function viewEntry(entry: vm.EntryViewModel, index: number) : MithrilVirtualElement {
    return m("div.entry", [
        input(`#start-${index}`, entry.start),
        input(`#project-${index}`, entry.project),
        input(`#task-${index}`, entry.task),
        m(`div#duration-${index}`, { value: entry.duration.value() }),
    ]);
}

function viewBlankEntry(ctrl: DayController) {
    var entry = ctrl.blank;
    return m("div.entry", [
        input("#start-blank[type=date]", entry.start),
        input("#project-blank", entry.project),
        input("#task-blank", entry.task),
        m("input#add-blank[type=button]", { value: "+", onclick: (e:Event) => ctrl.add(entry) }),
    ]);
}

function input(selector: string, vm: vm.InputViewModel) : MithrilVirtualElement {
    return m(`input${selector}`, {
        value: vm.value(),
        onchange: m.withAttr("value", vm.value),
    });
}
