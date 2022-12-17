import { product } from '#utils/array/reducers'
import { descending } from '#utils/array/sorting'
import { parseAndSolve } from '#utils/solve'
import { parseInput, processRounds } from '.'

const solve = parseAndSolve(2022, 11, parseInput)

// Part One
solve(
    (monkeys) =>
        processRounds(20, monkeys)
            .map((monkey) => monkey.itemsThrown)
            .sort(descending)
            .slice(0, 2)
            .reduce(product),
    'Part One:'
)

// Part Two
solve(
    (monkeys) =>
        processRounds(10000, monkeys, true)
            .map((monkey) => monkey.itemsThrown)
            .sort(descending)
            .slice(0, 2)
            .reduce(product),
    'Part Two:'
)
