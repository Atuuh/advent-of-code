import { getBagsContainingShinyGoldBags, getRequiredNumberOfBags } from '.'
import { input } from './input'

const partOne = () => getBagsContainingShinyGoldBags(input)
const partTwo = () => getRequiredNumberOfBags(input, 'shiny gold')

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
