export function flatten<T>(arr: T[][]) : T[] {
    return arr.reduce((acc, it) => {
        return acc.concat(it);
    });
}
