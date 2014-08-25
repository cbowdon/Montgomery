/// <reference path="actions.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="store.ts" />
/// <reference path="entry.ts" />
/// <reference path="view-controllers/user-input.ts" />
/// <reference path="view-controllers/sum-table.ts" />
/// <reference path="view-controllers/project-chart.ts" />

'use strict';

var dispatcher = new Dispatcher();
var actions = new Actions(dispatcher);
var store = new Store(dispatcher);
var ec = new EntryCollection(store);
var userInput = new ViewController.UserInput(store);
var projectChart = new ViewController.ProjectChart(ec);
var sumTable = new ViewController.SumTable(ec);

store.load();
