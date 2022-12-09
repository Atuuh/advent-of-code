import { parseAndSolve } from '#utils/solve'
import { getVisibleTrees } from '.'

const inputTo2DArray =
    <T>(mapFn: (value: string) => T = (value: any) => value) =>
    (seperator: string) =>
    (input: string) =>
        input.split('\n').map((line) => line.split(seperator).map(mapFn))

const solve = parseAndSolve(2022, 8, inputTo2DArray(Number)(''))

// Part One
solve(
    (grid) =>
        getVisibleTrees(grid)
            .flat()
            .filter((value) => value === true).length,
    'Part One:'
)

// Part Two
solve(() => 0, 'Part Two:')
