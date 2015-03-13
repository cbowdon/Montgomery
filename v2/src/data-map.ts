/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import tsm = require('tsmonad');
import day = require('./day.model');

// Storage with fluent API that emulates immutable functional map
// but actually backed by same local-storage instance.
// Will work seamlessly with any data that can be serialized with
// JSON.stringify and deserialized transparently with JSON.parse.
class DataMap<T> {

    constructor(private storage: Storage) {
    }

    clear() : void {
        this.storage.clear();
    }

    size() : number {
        return this.storage.length;
    }

    empty<U>() : DataMap<U> {
        // Future issue: this risks key collisions
        // because same backing store
        // can mitigate this with unique key scrambler,
        // implementation of which must be:
        // * unique even in high speed loops (milliseconds not ok)
        // * efficient in scrambling/unscrambling for map/reduce ops
        return new DataMap<U>(this.storage);
    }

    insert(key: string, value: T) : DataMap<T> {
        this.storage.setItem(key, JSON.stringify(value));
        return this;
    }

    remove(key: string) : DataMap<T> {
        this.storage.removeItem(key);
        return this;
    }

    lookup(key: string) : tsm.Maybe<T> {
        return tsm.maybe(this.unsafeGet(key));
    }

    keys() : string[] {
        // Future optimization: maintain keys in-memory
        var result: string[] = [],
            idx: number;
        for (idx = 0; idx < this.storage.length; idx += 1) {
            result.push(this.storage.key(idx));
        }
        return result;
    }

    elems() : T[] {
        var result: T[] = [],
            idx: number,
            key: string;
        for (idx = 0; idx < this.storage.length; idx += 1) {
            key = this.storage.key(idx);
            result.push(this.unsafeGet(key));
        }
        return result;
    }

    reduce<U>(fun: (a: U, k: string, v: T) => U, seed: U) : U {
        return this.keys()
            .reduce(
                (acc, key) => fun(acc, key, this.unsafeGet(key)),
                seed);
    }

    map<U>(fun: (k: string, v: T) => U) : DataMap<U> {
        return this.reduce(
            (dm, key, value) => dm.insert(key, fun(key, value)),
            this.empty<U>());
    }

    filter(fun: (k: string, v: T) => boolean) : DataMap<T> {
        return this.reduce(
            (dm, key, value) => fun(key, value) ? dm.insert(key, value) : dm,
            this.empty<T>());
    }

    // May return null
    private unsafeGet(key: string) : T {
        return JSON.parse(this.storage.getItem(key));
    }
}

export = DataMap;
