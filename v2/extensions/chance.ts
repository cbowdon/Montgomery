/// <reference path="../typings/chance/chance.d.ts" />

declare module Chance {
    interface Chance {
        time(): string;
    }
}

function mixinChanceTime() {
    chance.mixin({
        'time': () => {
            var hr = chance.hour({ twentyfour: true }),
                mn = chance.minute();
            return `${chance.pad(hr, 2)}:${mn}`;
        }
    });
}
