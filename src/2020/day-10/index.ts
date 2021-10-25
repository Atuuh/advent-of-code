import { getIncrementalArray } from '#utils/array/generation'
import { max, sum } from '#utils/array/reducers'
import { memoise } from '#utils/function/function'

const getAdapters = (input: string) => {
    const mappedInput = input.split('\n').map((value) => Number.parseInt(value))

    return [...mappedInput, 0, mappedInput.reduce(max) + 3].sort(
        (a, b) => a - b
    )
}

export const getJoltageDifferences = (input: string) => {
    const differences = getAdapters(input).map((value, index, array) => {
        if (index === 0) return 0
        return value - array[index - 1]
    })

    return {
        1: differences.filter((value) => value === 1).length,
        2: differences.filter((value) => value === 2).length,
        3: differences.filter((value) => value === 3).length,
    }
}

export const getDistinctPathsToEnd = (input: string): number => {
    const adapters = getAdapters(input)

    const pathsToEnd = memoise((index: number): number => {
        if (index === adapters.length - 1) {
            return 1
        }

        return getIncrementalArray(
            Math.min(adapters.length - 1, index + 3),
            index + 1
        )
            .filter((j) => adapters[j] - adapters[index] <= 3)
            .map((value) => pathsToEnd(value))
            .reduce(sum)
    })
    // const memoised = memoise(pathsToEnd)
    return pathsToEnd(0)
}
