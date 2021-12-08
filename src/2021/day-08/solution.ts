import { inputToArray } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import {
    getEasyOutputNumberCount,
    getOutputNumbers,
    getOutputNumberSum,
} from '.'

const solve = parseAndSolve(2021, 8, inputToArray)

const partOne = (inputLines: string[]) => {
    const outputNumbers = getOutputNumbers(inputLines)
    return getEasyOutputNumberCount(outputNumbers)
}

// Part One
solve(partOne, 'Part One:')

const partTwo = (inputLines: string[]) => {
    const outputNumbers = getOutputNumbers(inputLines)
    return getOutputNumberSum(outputNumbers)
}

// Part Two
solve(partTwo, 'Part Two:')
