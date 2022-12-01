import { max, min } from '#utils/array/reducers'
import { parseAndSolve } from '#utils/solve'
import { generatePolymer, generateRules } from '.'

const parseInput = (input: string) => {
    const [polymer, rulesString] = input.split('\n\n')
    return { polymer, rules: generateRules(rulesString.split('\n')) }
}

const solve = parseAndSolve(2021, 14, parseInput)

// Part One

const partOne = ({ polymer, rules }: ReturnType<typeof parseInput>) => {
    const result = generatePolymer(rules, polymer.split(''), 10)
    const elementCount = result.reduce(groupByElement, {})
    const counts = Array.from(Object.values(elementCount))
    const maxi = counts.reduce(max)
    const mini = counts.reduce(min)
    return maxi - mini
}

const groupByElement = (
    grouped: { [key: string]: number },
    element: string
) => ({
    ...grouped,
    [element]: (grouped[element] || 0) + 1,
})

solve(partOne, 'Part One:')

// Part Two
solve(() => 0, 'Part Two:')
