import { inputToArray } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import {
    processInput,
    getIllegalCharacterScore,
    getIncompleteCharacterScore,
} from '.'

const solve = parseAndSolve(2021, 10, inputToArray)

// Part One
const partOne = (input: string[]) => {
    const illegalCharacters = processInput(input, 'incorrect')
    return getIllegalCharacterScore(illegalCharacters)
}

solve(partOne, 'Part One:')

// Part Two
const partTwo = (input: string[]) => {
    const remainingCharacters = processInput(input, 'incomplete')
    return getIncompleteCharacterScore(remainingCharacters)
}
solve(partTwo, 'Part Two:')
