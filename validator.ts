/// <reference path="typings/tsd.d.ts" />

class Validated<T> {

    public isValid: boolean;

    constructor(public value: T,
                public errors?: string[]) {
        this.isValid = !errors;
    }

    static valid<T>(val: T) {
        return new Validated(val);
    }

    static invalid<T>(val: T, errs: string[]) {
        return new Validated(val, errs);
    }
}

interface Validator<T> {
    validate(item: T): Validated<T>;
}

class RawEntryValidator implements Validator<RawEntry> {

    validate(raw: RawEntry) {
        var prop: string,
            errs: string[] = [],
            time: Moment,
            date: Moment;

        if (!raw.project) {
            errs.push('Invalid project');
        }

        time = moment(raw.start, [ 'HH:mm', 'HHmm', 'hh:mm a' ], true);

        if (!time.isValid()) {
            errs.push('Invalid time');
        }

        date = moment(raw.date, 'YYYY-MM-DD', true);

        if (!date.isValid()) {
            errs.push('Invalid date');
        }

        if (errs.length > 0) {
            return Validated.invalid(raw, errs);
        }

        return Validated.valid({
            project: raw.project,
            task: raw.task,
            start: time.format('HH:mm'),
            date: date.format('YYYY-MM-DD')
        });
    }
}
