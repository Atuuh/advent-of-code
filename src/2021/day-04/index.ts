import { partition } from '#utils/array'
import { sum } from '#utils/array/reducers'
import { transpose } from '#utils/array/transformations'

type Board = string[][]

const parseInput = (input: string): [Board[], string[]] => {
    const [callingNumbers, ...boards] = input.split('\n\n')
    const callNumbers = callingNumbers.split(',')
    const bingoBoards = boards.map((board) =>
        board
            .trim()
            .split('\n')
            .map((row) => row.trim().split(/\s+/))
    )
    return [bingoBoards, callNumbers]
}

export const getFinalScore = (input: string) => {
    const [bingoBoards, callNumbers] = parseInput(input)

    const [winningBoard, calledNumber] = markAllBoards(bingoBoards, callNumbers)

    const uncalledNumbers = winningBoard.flatMap((row) =>
        row.filter((num) => !num.includes('x')).map(Number)
    )

    return uncalledNumbers.reduce(sum) * Number(calledNumber)
}

export const getLastWinningScore = (input: string) => {
    const [bingoBoards, callNumbers] = parseInput(input)
    const [lastWinningBoard, lastCalledNumber] = exhaustiveMarkAllBoards(
        bingoBoards,
        callNumbers
    )
    const uncalledNumbers = lastWinningBoard.flatMap((row) =>
        row.filter((num) => !num.includes('x')).map(Number)
    )
    return uncalledNumbers.reduce(sum) * Number(lastCalledNumber)
}

const markAllBoards = (
    bingoBoards: Board[],
    callingNumbers: string[]
): [Board, string] => {
    const [numberToMark, ...nextnumbersToMark] = callingNumbers
    const updatedBoards = bingoBoards.map((board) =>
        markBoard(board, numberToMark)
    )
    const [winningBoards] = groupWinningBoards(updatedBoards)

    if (winningBoards.length > 0) {
        return [winningBoards[0], numberToMark]
    }

    return markAllBoards(updatedBoards, nextnumbersToMark)
}

const exhaustiveMarkAllBoards = (
    bingoBoards: Board[],
    callingNumbers: string[]
): [Board, string] => {
    const [numberToMark, ...nextnumbersToMark] = callingNumbers
    const updatedBoards = bingoBoards.map((board) =>
        markBoard(board, numberToMark)
    )
    const [winningBoards, nonWinningBoards] = groupWinningBoards(updatedBoards)

    if (bingoBoards.length === 1 && winningBoards.length === 1) {
        return [winningBoards[0], numberToMark]
    }

    return exhaustiveMarkAllBoards(nonWinningBoards, nextnumbersToMark)
}

const markBoard = (board: Board, numToMark: string): Board =>
    board.map((row) => row.map((num) => (num === numToMark ? num + ' x' : num)))

const isWinningBoard = (board: Board) =>
    hasWinningRow(board) || hasWinningRow(transpose(board))

const hasWinningRow = (board: Board) =>
    board.some((row) => row.every((num) => num.includes('x')))

const groupWinningBoards = partition(isWinningBoard)
