import { repeat } from '#utils/function/function'

export const mix =
    (amount: number) =>
    (array: number[]): number[] => {
        const indexed = array.map<[number, number]>((item, index) => [
            item,
            index,
        ])

        const reduceFn = (arr: [number, number][]) =>
            arr.reduce((newArray, _, targetIndex) => {
                const foundIndex = newArray.findIndex(
                    (i) => i[1] === targetIndex
                )
                return moveItemInList(
                    newArray,
                    foundIndex,
                    getNewIndex(
                        foundIndex,
                        newArray[foundIndex][0],
                        array.length
                    )
                )
            }, arr)

        return repeat(amount)(reduceFn)(indexed).map((i) => i[0])
    }

export const moveItemInList = <T>(
    array: T[],
    index: number,
    newIndex: number
): T[] => {
    const value = array[index]
    const updated = [...array.slice(0, index), ...array.slice(index + 1)]
    updated.splice(newIndex, 0, value)
    return updated
}

export const getNewIndex = (
    currentIndex: number,
    value: number,
    arrayLength: number
) => {
    const newIndex =
        (currentIndex + value + arrayLength - 1) % (arrayLength - 1)
    return newIndex === 0 ? arrayLength - 1 : newIndex
}
