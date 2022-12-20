import { inputTo2DArray } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { canClimbTo, findPath, Vector2 } from '.'

const solve = parseAndSolve(2022, 12, inputTo2DArray)

const findPosition =
    (char: string) =>
    (grid: string[][]): Vector2 => {
        const x = grid.findIndex((row) => row.includes(char))
        const y = grid[x].findIndex((value) => value === char)
        return { x, y }
    }
const findStartingPosition = findPosition('S')
const findTargetPosition = findPosition('E')

// Part One
solve(
    (grid) =>
        findPath(canClimbTo)(
            grid,
            findStartingPosition(grid),
            findTargetPosition(grid)
        ).length - 1,
    'Part One:'
)

// Part Two
solve(() => 0, 'Part Two:')
