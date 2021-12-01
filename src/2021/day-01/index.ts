import { sum } from '#utils/array/reducers'

type accumulator = {
    previous: number | null
    result: boolean[]
}

export const countIncreasingNumbers = (values: number[]) =>
    values
        .reduce<accumulator>(
            ({ previous, result }, current) => {
                if (previous === null) return { previous: current, result }

                return {
                    previous: current,
                    result: result.concat([current > previous]),
                }
            },
            {
                previous: null,
                result: [],
            }
        )
        .result.filter((value) => value === true).length

type windowAccumulator = {
    previous: (number | null)[]
    result: boolean[]
}

const areNoneNull = <T>(array: (T | null)[]): array is T[] =>
    !array.some((value) => value === null)

export const countIncreasingNumbersInWindow = (values: number[]) =>
    values
        .reduce<windowAccumulator>(
            ({ previous, result }, current) => {
                if (!areNoneNull(previous))
                    return {
                        previous: previous.concat(current).slice(-3),
                        result,
                    }

                const currentWindow = previous.concat(current).slice(-3)

                return {
                    previous: currentWindow,
                    result: result.concat(
                        currentWindow.reduce(sum) > previous.reduce(sum)
                    ),
                }
            },
            { previous: [null, null, null], result: [] }
        )
        .result.filter((value) => value === true).length
