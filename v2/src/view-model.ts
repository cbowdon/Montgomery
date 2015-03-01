import Day = require('./day.view-model');

var _days: Day[] = [];

export function days() : Day[] {
    return _days;
}

export function init() : void {
    // TODO this is temp test data
    console.log('init vm');
    _days = [ new Day([]) ];
}
