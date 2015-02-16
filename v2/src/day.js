var DayController = (function () {
    function DayController() {
    }
    return DayController;
})();
exports.controller = DayController;
exports.view = function (ctrl) {
    return m("div", [
        m("input#start"),
        m("input#project"),
        m("input#task")
    ]);
};
function viewEntry(index, entry) {
    return m("div", [
        m("input#start$(number)"),
        m("input#project$(number)"),
        m("input#task$(number)")
    ]);
}
//# sourceMappingURL=day.js.map