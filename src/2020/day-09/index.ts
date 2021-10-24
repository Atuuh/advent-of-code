import { max, min, sum } from '#utils/array/reducers'

const parseInput = (input: string) => input.split('\n').map(Number)

const doesListSumToValue = (list: number[], targetValue: number) =>
    list.some((value) =>
        list.some((innerValue) => {
            if (value === innerValue) return false
            return value + innerValue === targetValue
        })
    )

export const findFirstInvalidNumber = (input: string, preambleLength = 25) => {
    const numbers = parseInput(input)
    const firstWrong = numbers.find((value, index) => {
        if (index < preambleLength) return false
        const searchList = numbers.slice(
            Math.max(0, index - preambleLength),
            index
        )
        return !doesListSumToValue(searchList, value)
    })

    return firstWrong as number
}

const getComponentNumbers = (array: number[], targetNumber: number) => {
    for (let index = 0; index < array.length; index++) {
        const searchArray = array.slice(index)
        const gesgseg: number[] = []
        let innerIndex = 0
        do {
            gesgseg.push(searchArray[innerIndex])
            innerIndex += 1
        } while (gesgseg.reduce(sum) < targetNumber)
        if (gesgseg.reduce(sum) === targetNumber) {
            return gesgseg
        }
    }
    return []
}

export const crackEncryption = (input: string, preambleLength = 25) => {
    const wrongNumber = findFirstInvalidNumber(input, preambleLength)
    const numbers = parseInput(input)

    const resultNumbers = getComponentNumbers(numbers, wrongNumber)
    return resultNumbers.reduce(min) + resultNumbers.reduce(max)
}
