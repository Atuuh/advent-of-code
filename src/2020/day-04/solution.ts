import { isPassportValid } from '.'
import { input } from './input'

const getInput = () => input.split('\n\n')

const partOne = () => {
    const passports = getInput()

    return passports
        .map((passport) => isPassportValid(passport))
        .filter((valid) => valid === true).length
}

const partTwo = () => {
    const passports = getInput()

    return passports
        .map((passport) => isPassportValid(passport, true))
        .filter((valid) => valid === true).length
}

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
