import { parseAndSolve } from '#utils/solve'
import { getHumanValue, getValue, parseInput } from '.'

const solve = parseAndSolve(2022, 21, parseInput)

// Part One
solve((root) => getValue(root), 'Part One:')

// Part Two
solve((root) => getHumanValue(root), 'Part Two:')
