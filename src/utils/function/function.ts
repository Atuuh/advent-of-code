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
