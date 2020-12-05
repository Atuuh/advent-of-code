import { getIncrementalArray } from '#utils/array/generation'

const rows = getIncrementalArray(128)
const columns = getIncrementalArray(8)

export const getSeatID = (seat: string): number => {
    const { row, column } = findSeat(rows, columns, [...seat])

    return row * 8 + column
}
type Seat = { row: number; column: number }
const findSeat = (
    possibleRows: number[],
    possibleColumns: number[],
    instructions: string[]
): Seat => {
    if (instructions.length === 0)
        return { row: possibleRows[0], column: possibleColumns[0] }

    const instruction = instructions[0]

    switch (instruction) {
        case 'F':
            return findSeat(
                keepLower(possibleRows),
                possibleColumns,
                instructions.slice(1)
            )
        case 'B':
            return findSeat(
                keepHigher(possibleRows),
                possibleColumns,
                instructions.slice(1)
            )
        case 'L':
            return findSeat(
                possibleRows,
                keepLower(possibleColumns),
                instructions.slice(1)
            )
        case 'R':
            return findSeat(
                possibleRows,
                keepHigher(possibleColumns),
                instructions.slice(1)
            )
        default:
            return { row: -1, column: -1 }
    }
}

const keepHalf = (half: 'lower' | 'higher') => <T extends Array<any>>(
    array: T
) =>
    half === 'lower'
        ? array.slice(0, array.length / 2)
        : array.slice(array.length / 2)

const keepLower = keepHalf('lower')
const keepHigher = keepHalf('higher')
