/// <reference path="../typings/qunit/qunit.d.ts" />
/// <reference path="../src/store.ts" />
/// <reference path="../src/entry.ts" />

module Test {
    QUnit.module('Store');

    QUnit.test('Store publishes updates', assert => {
    var dispatcher  = new Dispatcher(),
        store       = new Store(dispatcher),
        rawEntry    = { project: 'Test', task: 'Does it?', start: '20:30', date: '2014-07-29' },
        didPublish = false;

        store.subscribe(evt => didPublish = !!evt.validated);

        dispatcher.dispatch('entry', rawEntry);

        assert.ok(didPublish, 'Expected update published');
    });

}
