import { parseAndSolve } from '#utils/solve'
import { getFirstMarkerIndex } from '.'

const solve = parseAndSolve(2022, 6, (input) => input)

// Part One
solve(getFirstMarkerIndex(4), 'Part One:')

// Part Two
solve(getFirstMarkerIndex(14), 'Part Two:')
