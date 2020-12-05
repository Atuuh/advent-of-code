import { product } from '#utils/array/reducers'
import { countTreesOnSlope } from '.'
import { input } from './input'

const partOne = () => {
    return countTreesOnSlope(input, 3, 1)
}

const partTwo = () => {
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ] as const

    return slopes
        .map((slope) => countTreesOnSlope(input, slope[0], slope[1]))
        .reduce(product)
}

console.log('Part One', partOne())
console.log('Part Two', partTwo())
