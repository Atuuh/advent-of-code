type f = {
    previous: number | null
    result: boolean[]
}

export const countIncreasingNumbers = (values: number[]) => {
    return values
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
}

export const countIncreasingNumbersInWindow = (values: number[]) => 0
