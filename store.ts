/// <reference path="dispatcher.ts" />

interface EventEmitter {
    addEventListener(Callback) : void;
}

class Store implements EventEmitter {
    addEventListener(cb) {
        throw new Error('nada');
    }
}
