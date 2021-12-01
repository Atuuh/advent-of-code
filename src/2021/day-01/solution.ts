import { inputToNumbers } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { countIncreasingNumbersInWindow } from '.'

const solve = parseAndSolve(2021, 1, inputToNumbers)

// Part One
solve((input) => countIncreasingNumbersInWindow(input, 1), 'Part One:')

// Part Two
solve((input) => countIncreasingNumbersInWindow(input, 3), 'Part Two:')
