import { parseAndSolve } from '#utils/solve'
import { getBasins, getLowPoints, productBiggestBasins, sumRiskLevels } from '.'

const solve = parseAndSolve(2021, 9, (input) =>
    input.split('\n').map((row) => row.split('').map(Number))
)

const partOne = (input: number[][]) => {
    const lowPoints = getLowPoints(input)
    return sumRiskLevels(lowPoints)
}

// Part One
solve(partOne, 'Part One:')

const partTwo = (input: number[][]) => {
    const basins = getBasins(input)
    return productBiggestBasins(basins)
}

// Part Two
solve(partTwo, 'Part Two:')
