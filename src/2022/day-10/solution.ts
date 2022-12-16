import { sum } from '#utils/array/reducers'
import { parseAndSolve } from '#utils/solve'
import { getDrawn, getSignalAtCycle, getSignals, parseInput } from '.'

const solve = parseAndSolve(2022, 10, parseInput)

// Part One
solve(
    (commands) =>
        [20, 60, 100, 140, 180, 220]
            .map((cycle) => getSignalAtCycle(commands, cycle))
            .reduce(sum),
    'Part One:'
)

// Part Two
solve((commands) => '\n'.concat(getDrawn(getSignals(commands))), 'Part Two:\n')
