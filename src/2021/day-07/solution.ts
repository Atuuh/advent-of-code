import { parseAndSolve } from '#utils/solve'
import { getCheapestAlignment } from '.'

const solve = parseAndSolve(2021, 7, (input) => input.split(',').map(Number))

// Part One
solve(getCheapestAlignment, 'Part One:')

// Part Two
solve(() => 0, 'Part Two:')
