import { parseAndSolve } from '#utils/solve'
import { addLinesToGrid, countOverlapPoints, Line } from '.'

const parseInput = (input: string) =>
    input
        .split('\n')
        .map((line) =>
            line.split(' -> ').map((point) => point.split(',').map(Number))
        ) as Line[]

const solve = parseAndSolve(2021, 5, parseInput)

const getAnswerNoDiagonals = (lines: Line[]) => {
    const nonDiagonalLines = lines.filter(
        (line) => line[0][0] === line[1][0] || line[0][1] === line[1][1]
    )
    const grid = addLinesToGrid(1000, nonDiagonalLines)
    return countOverlapPoints(grid)
}

const getAnswer = (lines: Line[]) => {
    const grid = addLinesToGrid(1000, lines)
    return countOverlapPoints(grid)
}

// Part One
solve(getAnswerNoDiagonals, 'Part One:')

// Part Two
solve(getAnswer, 'Part Two:')
