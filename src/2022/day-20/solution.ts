import { sum } from '#utils/array/reducers'
import { inputToNumbers } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { mix } from '.'

const solve = parseAndSolve(2022, 20, inputToNumbers)

// Part One
solve((numbers) => {
    const mixed = mix(numbers)
    const zeroIndex = mixed.indexOf(0)
    return [1000, 2000, 3000]
        .map((i) => (zeroIndex + i) % mixed.length)
        .map((i) => mixed[i])
        .reduce(sum)
}, 'Part One:')

// Part Two
solve(() => 0, 'Part Two:')
