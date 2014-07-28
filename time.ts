class Time {

    static parse(str: string) : Time {
        var regex = /^([0-9]|[0-1][0-9]|2[0-3]):?([0-5][0-9])$/,
            match = regex.exec(str),
            hour: number,
            minute: number;

        if (match) {
            hour = parseInt(match[1], 10);
            minute = parseInt(match[2], 10);
            return new Time(hour, minute);
        }
        throw new TypeError('Cannot parse time: ' + str);
    }

    constructor(public hour: number, public minute: number) {}

    toString() {
        return (this.hour < 10 ? '0' : '') + this.hour + ':' + this.minute;
    }
}
