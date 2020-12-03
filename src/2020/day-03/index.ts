import { product } from '#utils/array/reducers'
import { input } from './input'

export const countTreesOnSlope = (
    map: string,
    right: number,
    down: number
): number => {
    const rows = map.split('\n')

    const positions = rows.map((row, index) => {
        if (index % down !== 0) return ''

        return row.charAt(((index * right) / down) % row.length)
    })

    return positions.filter((item) => item === '#').length
}

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
