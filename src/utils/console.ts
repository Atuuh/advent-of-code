export const log = (...params: Parameters<typeof console.log>): void => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(params)
    }
}
