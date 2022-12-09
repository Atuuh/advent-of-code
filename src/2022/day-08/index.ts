import { map } from '#utils/array/2d'
import { product } from '#utils/array/reducers'
import { transpose } from '#utils/array/transformations'

export const getVisibleTrees = (grid: number[][]): boolean[][] => {
    const projections = [
        getVisibleTreesFrom(grid, 'left'),
        getVisibleTreesFrom(grid, 'right'),
        getVisibleTreesFrom(grid, 'down'),
        getVisibleTreesFrom(grid, 'up'),
    ]
    return map((item, x, y) =>
        projections.some((projection) => projection[y][x])
    )(projections[0])
}

export const getScenicScore = (
    grid: number[][],
    y: number,
    x: number
): number => {
    const view = getView(grid, y, x)
    const kept = view.map((v) =>
        v
            .reduce(
                ({ keptItems, lowest }, item) => ({
                    keptItems: [...keptItems, lowest >= 0 ? item : null],
                    lowest: item >= lowest ? -1 : item < lowest ? item : lowest,
                }),
                { keptItems: [], lowest: grid[y][x] } as {
                    keptItems: (null | number)[]
                    lowest: number
                }
            )
            .keptItems.filter((item): item is number => item !== null)
    )
    return kept.map((line) => line.length).reduce(product)
}

const getView = (grid: number[][], y: number, x: number): number[][] => {
    const row = [grid[y].slice(0, x).reverse(), grid[y].slice(x + 1)]
    const transposed = transpose(grid)
    const col = [
        transposed[x].slice(0, y).reverse(),
        transposed[x].slice(y + 1),
    ]
    return [...row, ...col]
}

type Direction = 'left' | 'right' | 'up' | 'down'
export const getVisibleTreesFrom = (
    grid: number[][],
    direction: Direction
): boolean[][] => {
    const projection = getProjection(grid, direction)
    const visibleTrees = projection.map((line) =>
        line
            .reduce(keepIncreasing, { keptItems: [], highest: -1 } as {
                keptItems: (number | null)[]
                highest: number
            })
            .keptItems.map((item) => item !== null)
    )
    return getReverseProjection(visibleTrees, direction)
}

const keepIncreasing = <T>(
    { keptItems, highest }: { keptItems: (T | null)[]; highest: T },
    item: T
) => {
    const isNewHighest = item > highest
    return {
        keptItems: [...keptItems, isNewHighest ? item : null],
        highest: isNewHighest ? item : highest,
    }
}

const getProjection = <T>(array: T[][], direction: Direction) => {
    switch (direction) {
        case 'left':
            return array
        case 'right':
            return array.map((line) => [...line].reverse())
        case 'up':
            return transpose(array)
        case 'down':
            return transpose(array).map((line) => [...line].reverse())
    }
}

export const getReverseProjection = <T>(array: T[][], direction: Direction) => {
    switch (direction) {
        case 'left':
            return array
        case 'right':
            return array.map((line) => [...line].reverse())
        case 'up':
            return transpose(array)
        case 'down':
            return transpose(array.map((line) => [...line].reverse()))
    }
}
