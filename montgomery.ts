/// <reference path="actions.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="store.ts" />
/// <reference path="entry.ts" />
/// <reference path="view-controller.ts" />
/// <reference path="vis-view-controller.ts" />

'use strict';

var dispatcher = new Dispatcher();
var actions = new Actions(dispatcher);
var store = new Store(dispatcher);
var entries = new EntryCollection(store);
var viewController = new ViewController(store);
var visViewController = new VisViewController(entries);

store.load();
