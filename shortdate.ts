/// <reference path="result.ts" />

class ShortDate {

    public year: number;
    public month: number;
    public day: number;

    constructor (date: Date = new Date()) {
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
    }

    toMillis() {
        return new Date(this.year, this.month, this.day).getTime();
    }

    toISOString() {
        var y: string,
            m: string,
            d: string;

        // low-priority TODO: catch stupid edge cases
        y = this.year > 99 ? this.year.toString() : '20' + this.year;
        m = this.month > 9 ? this.month.toString() : '0' + this.month;
        d = this.day > 9 ? this.day.toString() : '0' + this.day;

        return y + '-' + m + '-' + d;
    }

    static parse(str: string) {
        var d = new Date(str);

        return d && d.getFullYear() && d.getMonth && d.getDate() ?
            Result.success(new ShortDate(d)) :
            Result.fail<ShortDate>([ 'Could not parse date: ' + str ]);
    }

}
