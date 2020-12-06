import { sum } from '#utils/array/reducers'
import { getGroupAnswers } from '.'
import { input } from './input'

const partOne = () =>
    input
        .split('\n\n')
        .map((group) => getGroupAnswers(group))
        .map((answers) => answers.length)
        .reduce(sum)

const partTwo = () =>
    input
        .split('\n\n')
        .map((group) => getGroupAnswers(group, 'everyone'))
        .map((answers) => answers.length)
        .reduce(sum)

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
