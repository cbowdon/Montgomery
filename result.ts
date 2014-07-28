class Result<T> {

    isSuccess: boolean;

    constructor(public value: T,
                public errors: string[]) {
        this.isSuccess = !!value;
    }

    static success(val: any) {
        return new Result(val, []);
    }

    static fail<Y>(errs: string[]) {
        return new Result<Y>(null, errs);
    }
}
