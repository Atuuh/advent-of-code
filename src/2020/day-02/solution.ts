import { isSledPasswordValid, isTobogganPasswordValid } from '.'
import { input } from './input'

const partOne = () => {
    const passwordLines = input.split('\n')

    return passwordLines
        .map(isSledPasswordValid)
        .filter((value) => value === true).length
}

const partTwo = () => {
    const passwordLines = input.split('\n')

    return passwordLines
        .map(isTobogganPasswordValid)
        .filter((value) => value === true).length
}

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
