/// <reference path="result.ts" />
/// <reference path="time.ts" />

interface Validator<T> {
    validate(item: T): Result<T>;
}

class RawEntryValidator implements Validator<RawEntry> {

    validate(raw: RawEntry) {
        var prop: string,
            errs: string[] = [],
            time: Result<Time>,
            date: Date;

        for (prop in raw) {
            if (raw.hasOwnProperty(prop)) {
                if (!raw[prop]) {
                    errs.push('Invalid ' + prop);
                }
            }
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
            return Result.fail<RawEntry>(errs);
        }

        return Result.success({
            project: raw.project,
            task: raw.task,
            start: time.value.toString(),
            date: date.toISOString()
        });
    }
}
