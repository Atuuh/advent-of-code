export const getIncrementalArray = (
    size: number,
    startNumber = 0
): number[] => {
    return new Array(size).fill(0).map((_, index) => index + startNumber)
}

export const repeat = <T extends unknown>(
    array: T[],
    repeats: number,
    maxLength: number | undefined = undefined
): T[] =>
    Array.from({ length: repeats }, () => array)
        .flat()
        .slice(0, maxLength)
