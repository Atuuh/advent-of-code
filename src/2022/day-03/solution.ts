import { sum } from '#utils/array/reducers'
import { chunk } from '#utils/array/transformations'
import { inputToArray } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { findBadge, findItemInBothCompartments, getPriority } from '.'

const solve = parseAndSolve(2022, 3, inputToArray)

// Part One
solve(
    (input) =>
        input.map(findItemInBothCompartments).map(getPriority).reduce(sum),
    'Part One:'
)

// Part Two
solve(
    (input) =>
        (chunk(input, 3) as [string, string, string][])
            .map(findBadge)
            .map(getPriority)
            .reduce(sum),
    'Part Two:'
)
