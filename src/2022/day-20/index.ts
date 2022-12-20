export const mix = (array: number[]): number[] =>
    array.reduce(
        ({ array: newArray, previousIndex }, value) => {
            const index = newArray.indexOf(value, previousIndex)
            return {
                array: moveItemInList(newArray, index),
                previousIndex: index,
            }
        },
        { array, previousIndex: 0 }
    ).array

export const moveItemInList = (array: number[], index: number): number[] => {
    const value = array[index]
    const updated = [...array.slice(0, index), ...array.slice(index + 1)]
    updated.splice(getNewIndex(index, value, array.length), 0, value)
    return updated
}

const getNewIndex = (
    currentIndex: number,
    value: number,
    arrayLength: number
) => {
    const newIndex =
        (currentIndex + value + arrayLength - 1) % (arrayLength - 1)
    return newIndex === 0 ? arrayLength - 1 : newIndex
}
