import { parseAndSolve } from '#utils/solve'
import { getOctopusGrid, getSynchroniseStep, simulateSteps } from '.'

const solve = parseAndSolve(2021, 11, (input) =>
    input.split('\n').map((row) => row.split('').map(Number))
)

// Part One
solve((input) => simulateSteps(getOctopusGrid(input), 100)[1], 'Part One:')

// Part Two
solve((input) => getSynchroniseStep(getOctopusGrid(input)), 'Part Two:')
