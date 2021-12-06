import { parseAndSolve } from '#utils/solve'
import { modelLifecycle } from '.'

const solve = parseAndSolve(2021, 6, (input) => input.split(',').map(Number))

// Part One
solve((fish) => modelLifecycle(80, fish), 'Part One:')

// Part Two
// solve((fish) => modelLifecycle(256, fish), 'Part Two:')
