import { crackEncryption, findFirstInvalidNumber } from '.'
import { input } from './input'

const partOne = () => findFirstInvalidNumber(input)
const partTwo = () => crackEncryption(input)

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
