import { sum } from '#utils/array/reducers'
import { inputToNumbers } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { mix } from '.'

const solve = parseAndSolve(2022, 20, inputToNumbers)

const decryptionKey = 811589153

// Part One
solve((numbers) => {
    const mixed = mix(1)(numbers)
    const zeroIndex = mixed.indexOf(0)
    return [1000, 2000, 3000]
        .map((i) => (zeroIndex + i) % mixed.length)
        .map((i) => mixed[i])
        .reduce(sum)
}, 'Part One:')

// Part Two
solve((numbers) => {
    const mixed = mix(10)(numbers.map((n) => n * decryptionKey))
    const zeroIndex = mixed.indexOf(0)
    return [1000, 2000, 3000]
        .map((i) => (zeroIndex + i) % mixed.length)
        .map((i) => mixed[i])
        .reduce(sum)
}, 'Part Two:')
