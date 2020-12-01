import { product } from '#utils/array/reducers'
import { input } from './input'

const getInput = (): number[] => input.split('\n').map(Number)

export const findNumbersTotalling = (
    inputArray: number[],
    count: number,
    totalNumber: number
): number[] => {
    if (count < 2) throw new Error('Count must be 2 or greater')

    const filteredArray = inputArray.filter((value, _, arr) => {
        const targetNumber = totalNumber - value

        if (count > 2) {
            const otherNumbers = findNumbersTotalling(
                inputArray,
                count - 1,
                targetNumber
            )

            return otherNumbers.length > 0
        } else {
            return arr.includes(targetNumber)
        }
    })

    return filteredArray
}

console.log(
    'Part One:',
    findNumbersTotalling(getInput(), 2, 2020).reduce(product)
)

console.log(
    'Part Two:',
    findNumbersTotalling(getInput(), 3, 2020).reduce(product)
)
