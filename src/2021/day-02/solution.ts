import { inputToArray } from '#utils/input/mappings'
import { parseAndSolve } from '#utils/solve'
import { getPosition } from '.'

const solve = parseAndSolve(2021, 2, inputToArray)

const getSolution = (withAim: boolean) => (input: string[]) => {
    const result = getPosition({
        horizontal: 0,
        vertical: 0,
        aim: withAim ? 0 : undefined,
    })(input)
    return result.horizontal * result.vertical
}

// Part One
solve(getSolution(false), 'Part One:')

// Part Two
solve(getSolution(true), 'Part Two:')
