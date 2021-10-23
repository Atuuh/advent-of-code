import { processBootCode, repairBootCode } from '.'
import { input } from './input'

const partOne = () => processBootCode(input)
const partTwo = () => repairBootCode(input)

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
