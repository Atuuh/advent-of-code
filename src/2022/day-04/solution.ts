import { parseAndSolve } from '#utils/solve'
import {
    getFullyContainingSection,
    getSectionOverlap,
    inputToNumberArray,
} from '.'

const solve = parseAndSolve(2022, 4, (input) =>
    input.split('\n').map(inputToNumberArray)
)

// Part One
solve(
    (input) =>
        input
            .map((line) => getFullyContainingSection(...line))
            .filter((array) => array.length > 0).length,
    'Part One:'
)

// Part Two
solve(
    (input) =>
        input
            .map((line) => getSectionOverlap(...line))
            .filter((array) => array.length).length,
    'Part Two:'
)
