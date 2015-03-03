/// <reference path="../typings/tsd.d.ts" />
import Chance = require('chance');

interface ChanceExtensions extends Chance.Chance {
    time(): string;
}

var chance = <ChanceExtensions>new Chance();

chance.mixin({
    'time': () => {
        var hr = chance.hour({ twentyfour: true }),
            mn = chance.minute();
        return `${chance.pad(hr, 2)}:${chance.pad(mn, 2)}`;
    }
});

export = chance;
