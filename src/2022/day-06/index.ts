export const getFirstMarkerIndex =
    (windowSize: number) =>
    (input: string): number =>
    1 +
    input.split('').reduce((foundIndex, value, i, array) => {
        if (i < windowSize) {
            return foundIndex
        }
        if (foundIndex >= 0) {
            return foundIndex
        }
        const window = array.slice(i - (windowSize - 1), i + 1)
        if (!hasDuplicates(window)) {
            return i
        }
        return foundIndex
    }, -1)

const hasDuplicates = <T>(array: T[]): boolean =>
    new Set(array).size !== array.length
