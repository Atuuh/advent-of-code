export const findNumbersTotalling = (
    inputArray: number[],
    count: number,
    totalNumber: number
): number[] | null => {
    if (count < 2) throw new Error('Count must be 2 or greater')

    for (const value of inputArray) {
        const targetNumber = totalNumber - value

        if (count > 2) {
            const otherNumbers = findNumbersTotalling(
                inputArray,
                count - 1,
                targetNumber
            )

            if (otherNumbers) {
                return [value, ...otherNumbers]
            }
        } else if (inputArray.includes(targetNumber)) {
            return [value, targetNumber]
        }
    }

    return null
}
