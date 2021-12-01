import { countIncreasingNumbers, countIncreasingNumbersInWindow } from '.'
import { input } from './input'

const getInput = () => input.split('\n').map(Number)

const partOne = () => countIncreasingNumbers(getInput())

const partTwo = () => countIncreasingNumbersInWindow(getInput())

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
