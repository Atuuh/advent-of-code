import { countIncreasingNumbersInWindow } from '.'
import { input } from './input'

const getInput = () => input.split('\n').map(Number)

const partOne = () => countIncreasingNumbersInWindow(getInput(), 1)

const partTwo = () => countIncreasingNumbersInWindow(getInput(), 3)

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
