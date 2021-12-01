import { sum } from '#utils/array/reducers'

type f = {
    previous: number | null
    result: boolean[]
}

export const countIncreasingNumbers = (values: number[]) =>
    values
        .reduce<f>(
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

type g = {
    previous: (number | null)[]
    result: boolean[]
}

export const countIncreasingNumbersInWindow = (values: number[]) =>
    values
        .reduce<g>(
            ({ previous, result }, current) => {
                if (previous.some((value) => value === null))
                    return {
                        previous: previous.concat(current).slice(-3),
                        result,
                    }

                const currentWindow = previous
                    .concat(current)
                    .slice(-3) as number[]

                return {
                    previous: currentWindow,
                    result: result.concat(
                        currentWindow.reduce(sum) >
                            (previous as number[]).reduce(sum)
                    ),
                }
            },
            { previous: [null, null, null], result: [] }
        )
        .result.filter((value) => value === true).length
