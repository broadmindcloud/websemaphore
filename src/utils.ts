import { Callback, DelayedPromiseType } from "./types";

export const DelayedPromise: <T>() => DelayedPromiseType<T> = <T>() => {
    const pcbs = {} as { resolve: Callback, reject: Callback };

    let p: DelayedPromiseType = new Promise((rs, rj) => {
        pcbs.resolve = rs;
        pcbs.reject = rj;
    }) as any;

    p.resolve = pcbs.resolve;
    p.reject = pcbs.reject;

    return p as DelayedPromiseType<T>;
}