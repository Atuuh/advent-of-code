export const map =
    <T, U>(mapFn: (item: T) => U) =>
    (array: T[][]): U[][] =>
        array.map((column) => column.map((item) => mapFn(item)))

export const modify = <T>(
    grid: T[][],
    x: number,
    y: number,
    changeFn: (item: T) => T
) => [
    ...grid.slice(0, y),
    [
        ...grid[y].slice(0, x),
        (grid[y][x] = changeFn(grid[y][x])),
        ...grid[y].slice(x + 1),
    ],
    ...grid.slice(y + 1),
]

export const getNeighbours =
    <T>(array: T[][]) =>
    (x: number, y: number, type: NeighbourType) =>
        getNeighbourVectors(type)
            .map(([i, j]) => array?.[y + j]?.[x + i] ?? null)
            .filter((item): item is NonNullable<T> => item !== null)

const cardinalVectors = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
]

const diagonalVectors = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
]

type NeighbourType = 'cardinal' | 'diagonal' | 'both'

const getNeighbourVectors = (type: NeighbourType) =>
    type === 'cardinal'
        ? cardinalVectors
        : type === 'diagonal'
        ? diagonalVectors
        : cardinalVectors.concat(diagonalVectors)
