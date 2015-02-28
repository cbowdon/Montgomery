export function all<T,U>(...funs: ((t:T) => U)[]) : ((t:T) => U[]) {
    return x => funs.map(f => f(x));
}

export function pairs<T>(o: { [id: string]: T }) : [string, T][] {
    var toPair = (s:string) : [ string, T ] => [s, o[s]];
    return Object.keys(o).map(toPair);
}
