import { getDistinctPathsToEnd, getJoltageDifferences } from '.'
import { input } from './input'

const partOne = () => {
    const result = getJoltageDifferences(input)
    return result[1] * result[3]
}
const partTwo = () => getDistinctPathsToEnd(input)

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
