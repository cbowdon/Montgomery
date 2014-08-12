/// <reference path="time.ts" />

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
            time: Result<Time>,
            date: Date;

        if (!raw.project) {
            errs.push('Invalid project');
        }

        if (!raw.task) {
            errs.push('Invalid task');
        }

        time = Time.parse(raw.start);

        if (!time.isSuccess) {
            errs.push('Invalid time');
        }

        date = new Date(raw.date);

        if (!date) {
            errs.push('Invalid date');
        }

        if (errs.length > 0) {
            return Validated.invalid(raw, errs);
        }

        return Validated.valid({
            project: raw.project,
            task: raw.task,
            start: time.value.toString(),
            date: date.toISOString()
        });
    }
}
