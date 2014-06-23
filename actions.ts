/// <reference path="dispatcher.ts" />

module Actions {
    export function addEntry() {
        AppDispatcher.dispatch('whoa');
        throw new Error('not yet ready');
    }
}
