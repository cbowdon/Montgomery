/// <reference path="../typings/tsd.d.ts" />

VALID_TIME_FORMATS = [ 'HH:mm', 'HHmm', 'hh:mm a' ];
VALID_DATE_FORMATS = [ 'YYYY-MM-DD' ];

PREFERRED_TIME_FORMAT = 'HH:mm';
PREFERRED_DATE_FORMAT = 'YYYY-MM-DD';

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

        time = moment(raw.start, VALID_TIME_FORMATS, true);

        if (!time.isValid()) {
            errs.push('Invalid time');
        }

        date = moment(raw.date, VALID_DATE_FORMATS, true);

        if (!date.isValid()) {
            errs.push('Invalid date');
        }

        if (errs.length > 0) {
            return Validated.invalid(raw, errs);
        }

        return Validated.valid({
            project: raw.project,
            task: raw.task,
            start: time.format(PREFERRED_TIME_FORMAT),
            date: date.format(PREFERRED_DATE_FORMAT)
        });
    }
}
