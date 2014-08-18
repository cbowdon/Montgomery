/// <reference path="result.ts" />

class Time {

    static parse(str: string) : Result<Time> {
        var regex = /^([0-9]|[0-1][0-9]|2[0-3]):?([0-5][0-9])$/,
            match = regex.exec(str),
            hour: number,
            minute: number;

        if (match) {
            hour = parseInt(match[1], 10);
            minute = parseInt(match[2], 10);
            return Result.success(new Time(hour, minute));
        }
        return Result.fail<Time>(['Cannot parse time: ' + str]);
    }

    constructor(public hour: number, public minute: number) {}

    toMillis() {
        return this.hour * 3600 * 1000 + this.minute * 60 * 1000;
    }

    toISOString() {
        var hourStr = (this.hour < 10 ? '0' : '') + this.hour,
            minuteStr = (this.minute < 10 ? '0' : '') + this.minute;

        return hourStr + ':' + minuteStr;
    }
}
