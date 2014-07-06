interface Callback {
    (any): void;
}

class Dispatcher {

    // TODO not super happy about this Dictionary<magic string, any action>
    // doesn't seem to be taking advantage of static types at all
    // (and even less happy with the giant switch statement approach in the Flux demo)
    private events: { [name: string] : Callback[] } = {};

    register(name, callback) {
        if (!this.events[name]) {
            this.events[name] = [callback];
        } else {
            this.events[name].push(callback);
        }
    }

    dispatch(name, payload): void {
        if (this.events[name]) {
            this.events[name].forEach(cb => cb(payload));
        }
    }
}
