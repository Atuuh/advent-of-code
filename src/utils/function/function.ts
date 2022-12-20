export const memoise = <
    ResultFn extends (this: any, ...newArgs: any[]) => ReturnType<ResultFn>
>(
    resultFn: ResultFn
): ResultFn => {
    const cache = new Map<string, ReturnType<ResultFn>>()

    const memoised = (...newArgs: unknown[]): ReturnType<ResultFn> => {
        const stringArgs = JSON.stringify(newArgs)

        let result
        if (cache.has(stringArgs)) {
            result = cache.get(stringArgs) as ReturnType<ResultFn>
        } else {
            result = resultFn(...newArgs)
            cache.set(stringArgs, result)
        }

        return result
    }

    return memoised as ResultFn
}

export const flip =
    <A, B, C>(fn: (a: A) => (b: B) => C) =>
    (b: B) =>
    (a: A) =>
        fn(a)(b)

export const repeat =
    (amount: number) =>
    <A>(fn: (a: A) => A) =>
    (startingValue: A) =>
        new Array(amount).fill(null).reduce<A>((acc) => fn(acc), startingValue)
