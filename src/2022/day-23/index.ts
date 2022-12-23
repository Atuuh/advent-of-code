import { rotate } from '#utils/array/transformations'

type Direction = 'N' | 'E' | 'S' | 'W'

const Moves: Record<Direction, Vector2> = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
}

const directionOrder: Direction[] = ['N', 'S', 'W', 'E']
const getRoundDirections = (
    roundNumber: number
): [Direction, Direction, Direction, Direction] =>
    rotate(directionOrder, roundNumber, 'left') as [
        Direction,
        Direction,
        Direction,
        Direction
    ]

export type Vector2 = [x: number, y: number]
type Elves = Vector2[]

const move = ([x1, y1]: Vector2, direction: Direction): Vector2 => {
    const [x2, y2] = Moves[direction]
    return [x1 + x2, y1 + y2]
}

const processRoundHalf =
    (roundNumber: number) =>
    (
        proposedMoves: Vector2[],
        elf: Vector2,
        index: number,
        elves: Elves
    ): Vector2[] => {
        const neighbourChecks = getNeighbours(elf, elves)
        const directions = getRoundDirections(roundNumber)
        if (Object.values(neighbourChecks).every((c) => c === false)) {
            return [...proposedMoves, elf]
        }

        if (!neighbourChecks[directions[0]]) {
            return [...proposedMoves, move(elf, directions[0])]
        }

        if (!neighbourChecks[directions[1]]) {
            return [...proposedMoves, move(elf, directions[1])]
        }

        if (!neighbourChecks[directions[2]]) {
            return [...proposedMoves, move(elf, directions[2])]
        }

        if (!neighbourChecks[directions[3]]) {
            return [...proposedMoves, move(elf, directions[3])]
        }

        throw new Error("Shouldn't reach here")
    }
const indexed = <T>(value: T, index: number): [index: number, value: T] => [
    index,
    value,
]

const deleteIncDuplicates =
    <T>(eq: (a: T) => (b: T) => boolean) =>
    (array: T[]): T[] =>
        array.filter((value, index, arr) => arr.filter(eq(value)).length === 1)

const areVectorsEqual =
    ([i, a]: [number, Vector2]) =>
    ([j, b]: [number, Vector2]) =>
        a[0] === b[0] && a[1] === b[1]

export const processRound = (elves: Elves, roundNumber: number) => {
    const proposedMoves = elves
        .reduce(processRoundHalf(roundNumber), [])
        .map(indexed)

    const successfulMoves = deleteIncDuplicates(areVectorsEqual)(proposedMoves)

    return successfulMoves.reduce(
        (elves, [index, move]) => [
            ...elves.slice(0, index),
            move,
            ...elves.slice(index + 1),
        ],
        elves
    )
}

const getNeighbours = (
    [tx, ty]: Vector2,
    grid: Elves
): Record<Direction, boolean> => ({
    N: grid.some(
        ([x, y]) => ty + 1 === y && (tx === x || tx - 1 === x || tx + 1 === x)
    ),
    S: grid.some(
        ([x, y]) => ty - 1 === y && (tx === x || tx - 1 === x || tx + 1 === x)
    ),
    E: grid.some(
        ([x, y]) => tx + 1 === x && (ty === y || ty - 1 === y || ty + 1 === y)
    ),
    W: grid.some(
        ([x, y]) => tx - 1 === x && (ty === y || ty - 1 === y || ty + 1 === y)
    ),
})

export const parseInput = (input: string): Vector2[] =>
    input
        .split('')
        .reverse()
        .flatMap((line, y) =>
            line.split('').map((char, x) => (char === '#' ? [x, y] : null))
        )
        .filter((value): value is Vector2 => value !== null)
