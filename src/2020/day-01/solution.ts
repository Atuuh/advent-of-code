import { product } from '#utils/array/reducers'
import { findNumbersTotalling } from '.'
import { input } from './input'

const getInput = (): number[] => input.split('\n').map(Number)

const partOne = () => findNumbersTotalling(getInput(), 2, 2020)?.reduce(product)

const partTwo = () => findNumbersTotalling(getInput(), 3, 2020)?.reduce(product)

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
