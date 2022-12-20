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
        findPath(canClimbTo)(grid, findStartingPosition(grid), (node) => {
            const target = findTargetPosition(grid)
            return target.x === node.x && target.y === node.y
        }).length - 1,
    'Part One:'
)

// Part Two
solve(
    (grid) =>
        findPath((to, from) => canClimbTo(from, to))(
            grid,
            findTargetPosition(grid),
            (node) => ['a', 'S'].includes(grid[node.x][node.y])
        ).length - 1,
    'Part Two:'
)
