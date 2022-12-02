import { sum } from '#utils/array/reducers'
import { parseAndSolve } from '#utils/solve'
import { getCorrectScoreForRound, getIncorrectScoreForRound } from '.'

const solve = parseAndSolve(
    2022,
    2,
    (input) =>
        input.split('\n').map((line) => line.split(' ')) as [string, string][]
)

// Part One
solve((input) => input.map(getIncorrectScoreForRound).reduce(sum), 'Part One:')

// Part Two
solve((input) => input.map(getCorrectScoreForRound).reduce(sum), 'Part Two:')
