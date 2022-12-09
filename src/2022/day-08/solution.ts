import { map } from '#utils/array/2d'
import { max } from '#utils/array/reducers'
import { parseAndSolve } from '#utils/solve'
import { getScenicScore, getVisibleTrees } from '.'

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
solve((grid) => {
    const mapped = map((item, x, y) => getScenicScore(grid, y, x))(grid)
    return mapped.flat().reduce(max)
}, 'Part Two:')
