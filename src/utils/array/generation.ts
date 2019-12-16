export const getIncrementalArray = (
    size: number,
    startNumber: number = 0
): number[] => {
    return new Array(size).fill(0).map((_, index) => index + startNumber);
};

export const repeat = (
    array: any[],
    repeats: number,
    maxLength: number | undefined = undefined
) =>
    Array.from({ length: repeats }, () => array)
        .flat()
        .slice(0, maxLength);
