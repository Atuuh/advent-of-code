import { sum } from '#utils/array/reducers'
import { transpose } from '#utils/array/transformations'

export const getFinalScore = (input: string) => {
    const [callingNumbers, ...boards] = input.split('\n\n')
    const callNumbers = callingNumbers.split(',')
    const bingoBoards = boards.map((board) =>
        board
            .trim()
            .split('\n')
            .map((row) => row.trim().split(/\s+/))
    )

    const [winningBoard, calledNumber] = markAllBoards(callNumbers, bingoBoards)

    const uncalledNumbers = winningBoard.flatMap((row) =>
        row.filter((num) => !num.includes('x')).map(Number)
    )

    return uncalledNumbers.reduce(sum) * Number(calledNumber)
}

const markAllBoards = (
    callingNumbers: string[],
    bingoBoards: string[][][]
): [string[][], string] => {
    const [numberToMark, ...nextnumbersToMark] = callingNumbers
    const updatedBoards = bingoBoards.map((board) =>
        markBoard(board, numberToMark)
    )
    const winningBoards = updatedBoards.filter(isWinningBoard)

    if (winningBoards.length > 0) {
        return [winningBoards[0], numberToMark]
    }

    return markAllBoards(nextnumbersToMark, updatedBoards)
}

const markBoard = (board: string[][], numToMark: string): string[][] =>
    board.map((row) => row.map((num) => (num === numToMark ? num + ' x' : num)))

const isWinningBoard = (board: string[][]) =>
    hasWinningRow(board) || hasWinningRow(transpose(board))

const hasWinningRow = (board: string[][]) =>
    board.some((row) => row.every((num) => num.includes('x')))
