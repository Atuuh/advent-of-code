import { sum } from '#utils/array/reducers'

type windowAccumulator = {
    previous: (number | null)[]
    result: boolean[]
}

const areNoneNull = <T>(array: (T | null)[]): array is T[] =>
    !array.some((value) => value === null)

export const countIncreasingNumbersInWindow = (
    values: number[],
    windowSize: number
) =>
    values
        .reduce<windowAccumulator>(
            ({ previous, result }, current) => {
                if (!areNoneNull(previous))
                    return {
                        previous: previous.concat(current).slice(-windowSize),
                        result,
                    }

                const currentWindow = previous
                    .concat(current)
                    .slice(-windowSize)

                return {
                    previous: currentWindow,
                    result: result.concat(
                        currentWindow.reduce(sum) > previous.reduce(sum)
                    ),
                }
            },
            { previous: new Array(windowSize).fill(null), result: [] }
        )
        .result.filter((value) => value === true).length
