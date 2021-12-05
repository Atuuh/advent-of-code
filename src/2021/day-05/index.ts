// find vector intersections

import { getIncrementalArray, repeat } from '#utils/array/generation'
import { zip } from '#utils/array/transformations'

type Grid = number[][]
export type Point = [x: number, y: number]
export type Line = [a: Point, b: Point]

export const countOverlapPoints = (grid: Grid): number =>
    grid.flat().filter((value) => value >= 2).length

export const addLinesToGrid = (gridWidth: number, lines: Line[]) => {
    const grid = new Array(gridWidth)
        .fill([])
        .map(() => new Array(gridWidth).fill(0))
    return lines.reduce(addLineToGrid, grid)
}

const addLineToGrid = (grid: Grid, line: Line): Grid => {
    const points = getAllLinePoints(line)
    const updatedGrid = points.reduce(addPointToGrid, grid)
    return updatedGrid
}

// const addPointToGrid = (grid: Grid, [x, y]: Point): Grid => {
//     grid[x][y] += 1
//     return grid
// }

const addPointToGrid = (grid: Grid, [x, y]: Point): Grid => [
    ...grid.slice(0, x),
    [...grid[x].slice(0, y), grid[x][y] + 1, ...grid[x].slice(y + 1)],
    ...grid.slice(x + 1),
]

const getAllLinePoints = ([[x1, y1], [x2, y2]]: Line): Point[] => {
    let xs =
        x2 > x1 ? numbersFrom(x1, x2 + 1) : numbersFrom(x2, x1 + 1).reverse()
    let ys =
        y2 > y1 ? numbersFrom(y1, y2 + 1) : numbersFrom(y2, y1 + 1).reverse()
    if (x1 === x2) {
        xs = new Array(ys.length).fill(x1)
    } else if (y1 === y2) {
        ys = new Array(xs.length).fill(y1)
    }
    return zip(xs, ys)
}

const numbersFrom = (a: number, b: number) =>
    [...Array(b - a).keys()].map((k) => k + a)
