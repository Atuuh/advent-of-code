import { countIncreasingNumbers } from '.'
import { input } from './input'

const getInput = () => input.split('\n').map(Number)

const partOne = () => countIncreasingNumbers(getInput())

const partTwo = () => ''

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
