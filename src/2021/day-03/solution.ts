import { inputToArray } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { getLifeSupportRating, getPowerConsumption } from '.'

const solve = parseAndSolve(2021, 3, inputToArray)

// Part One
solve(getPowerConsumption, 'Part One:')

// Part Two
solve(getLifeSupportRating, 'Part Two:')
