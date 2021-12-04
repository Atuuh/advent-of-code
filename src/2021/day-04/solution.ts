import { parseAndSolve } from '#utils/solve'
import { getFinalScore, getLastWinningScore } from '.'

const solve = parseAndSolve(2021, 4, (input) => input)

// Part One
solve(getFinalScore, 'Part One:')

// Part Two
solve(getLastWinningScore, 'Part Two:')
