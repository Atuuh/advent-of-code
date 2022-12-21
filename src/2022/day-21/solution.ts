import { parseAndSolve } from '#utils/solve'
import { getValue, parseInput } from '.'

const solve = parseAndSolve(2022, 21, parseInput)

// Part One
solve((root) => getValue(root), 'Part One:')

// Part Two
solve(() => 0, 'Part Two:')
