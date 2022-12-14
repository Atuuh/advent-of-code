import { uniqueBy } from '#utils/array'
import { parseAndSolve } from '#utils/solve'
import { areSamePosition, Direction, getAllPositions } from '.'

const solve = parseAndSolve(2022, 9, (input) =>
    input.split('\n').map((line) => {
        const [direction, amount] = line.split(' ')
        return [direction, +amount] as [Direction, number]
    })
)

// Part One
solve((commands) => {
    const result = getAllPositions(2)(commands)
    return result[result.length - 1].filter(uniqueBy(areSamePosition)).length
}, 'Part One:')

// Part Two
solve((commands) => {
    const result = getAllPositions(10)(commands)
    return result[result.length - 1].filter(uniqueBy(areSamePosition)).length
}, 'Part Two:')
