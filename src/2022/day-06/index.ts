export const getFirstMarkerIndex =
    (windowSize: number) =>
    (input: string): number =>
        windowSize +
        input
            .split('')
            .findIndex(
                (_, index, array) =>
                    !hasDuplicates(array.slice(index, index + windowSize))
            )

const hasDuplicates = <T>(array: T[]): boolean =>
    new Set(array).size !== array.length
