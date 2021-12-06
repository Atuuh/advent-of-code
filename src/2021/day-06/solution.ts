import { parseAndSolve } from '#utils/solve'
import { countFish, Model, modelLifecycle } from '.'

const parseInput = (input: string): Model =>
    input
        .split(',')
        .map(Number)
        .reduce<Model>(
            (model, value) => ({ ...model, [value]: (model[value] || 0) + 1 }),
            {}
        )

const solve = parseAndSolve(2021, 6, parseInput)

// Part One
solve((fish) => countFish(modelLifecycle(80, fish)), 'Part One:')

// Part Two
solve((fish) => countFish(modelLifecycle(256, fish)), 'Part Two:')
