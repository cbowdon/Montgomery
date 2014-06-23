interface Callback {
    (any): void;
}

class Dispatcher {
    register(Callback): number {
        throw new Error('not done');
    }
    dispatch(any): void {
        throw new Error('not done');
    }
}

var AppDispatcher = new Dispatcher();
