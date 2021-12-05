import { parseAndSolve } from '#utils/solve'
import { addLinesToGrid, countOverlapPoints, Line, Point } from '.'

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
    // Part Two
    return countOverlapPoints(grid)
}

const getAnswer = (lines: Line[]) => {
    console.time('Solve')
    const grid = addLinesToGrid(1000, lines)
    console.timeEnd('Solve')
    return countOverlapPoints(grid)
}

// Part One
// solve(getAnswerNoDiagonals, 'Part One:')

solve(getAnswer, 'Part Two:')
