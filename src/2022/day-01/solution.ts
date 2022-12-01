import { parseAndSolve } from '#utils/solve'
import { getTop, inputToCalorieCount } from '.'

const solve = parseAndSolve(2022, 1, inputToCalorieCount)

// Part One
solve((counts) => getTop(counts, 1), 'Part One:')

// Part Two
solve((counts) => getTop(counts, 3), 'Part Two:')
