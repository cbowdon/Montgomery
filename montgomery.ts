/// <reference path="actions.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="store.ts" />
/// <reference path="view-controller.ts" />

var dispatcher = new Dispatcher();
var actions = new Actions(dispatcher);
var store = new Store(dispatcher);
var viewController = new ViewController(store);
