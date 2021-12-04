import { parseAndSolve } from '#utils/solve'
import { getFinalScore } from '.'

const solve = parseAndSolve(2021, 4, (input) => input)

// Part One
solve(getFinalScore, 'Part One:')

// Part Two
solve(() => 0, 'Part Two:')
