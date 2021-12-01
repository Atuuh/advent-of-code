import { sum } from '#utils/array/reducers'

export const countIncreasingNumbersInWindow = (
    values: number[],
    windowSize: number
) =>
    values
        .slice(windowSize)
        .reduce(increasingNumbersInWindow(windowSize), {
            previousWindow: values.slice(0, windowSize),
            result: [],
        })
        .result.filter((value) => value === true).length

type windowAccumulator = {
    previousWindow: number[]
    result: boolean[]
}

const increasingNumbersInWindow =
    (windowSize: number) =>
    (
        { previousWindow, result }: windowAccumulator,
        currentValue: number
    ): windowAccumulator => {
        const currentWindow = previousWindow
            .concat(currentValue)
            .slice(-windowSize)

        return {
            previousWindow: currentWindow,
            result: result.concat(
                currentWindow.reduce(sum) > previousWindow.reduce(sum)
            ),
        }
    }
