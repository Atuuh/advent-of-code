export const isInRange = (
    target: number,
    min: number,
    max: number,
    { inclusiveStart = true, inclusiveEnd = true } = {}
): boolean => {
    return (
        (target > min && target < max) ||
        (inclusiveStart && target === min) ||
        (inclusiveEnd && target === max)
    );
};
