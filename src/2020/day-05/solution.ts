import { max } from '#utils/array/reducers'
import { env } from 'process'
import { getSeatID, getSeatIDUsingBinary } from '.'
import { input } from './input'

const getInput = () => input.split('\n')

const partOne = () => {
    const seats = getInput()
    return seats.map(getSeatID).reduce(max)
}

const partTwo = () => {
    const seats = getInput()
    return (
        seats
            .map(getSeatID)
            .filter(
                (id, _, array) =>
                    !array.includes(id + 1) && array.includes(id + 2)
            )[0] + 1
    )
}

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())

const partOneBinary = () => {
    const seats = getInput()
    return seats.map(getSeatIDUsingBinary).reduce(max)
}

const partTwoBinary = () => {
    const seats = getInput()
    return (
        seats
            .map(getSeatIDUsingBinary)
            .filter(
                (id, _, array) =>
                    !array.includes(id + 1) && array.includes(id + 2)
            )[0] + 1
    )
}
console.log('Part One - Binary:', partOneBinary())
console.log('Part Two - Binary:', partTwoBinary())
