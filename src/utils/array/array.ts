export const sumArray = (array: number[]) =>
    array.reduce((sum, value) => sum + value, 0);

export const getIncrementalArray = (
    size: number,
    startNumber: number = 0
): number[] => {
    return new Array(size).fill(0).map((_, index) => index + startNumber);
};
