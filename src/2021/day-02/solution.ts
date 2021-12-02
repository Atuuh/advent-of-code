import { inputToArray } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { getPosition } from '.'

const solve = parseAndSolve(2021, 2, inputToArray)

// Part One
const getSolution = (input: string[]) => {
    const result = getPosition({ horizontal: 0, vertical: 0, aim: 0 })(input)
    return result.horizontal * result.vertical
}
// solve(getSolution, 'Part One:')

// Part Two
solve(getSolution, 'Part Two:')
