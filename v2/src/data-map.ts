/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../node_modules/tsmonad/dist/tsmonad.d.ts" />
import tsm = require('tsmonad');
import day = require('./day.model');

// Storage with fluent API that emulates immutable functional map
// but actually backed by same local-storage instance
export class DataMap<T> {

    constructor(private storage: Storage) {
    }

    clear() : void {
        this.storage.clear();
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
        return tsm.maybe(this.storage.getItem(key))
            .fmap(JSON.parse);
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

    reduce<U>(fun: (a: U, k: string, v: T) => U, seed: U) : U {
        return this.keys()
            .reduce(
                (acc, key) => fun(acc, key, JSON.parse(this.storage.getItem(key))),
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
}
