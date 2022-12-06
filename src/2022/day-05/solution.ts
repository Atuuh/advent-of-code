import { chunk, transpose } from '#utils/array/transformations'
import { parseAndSolve } from '#utils/solve'
import { moveBoxes } from '.'

const mapInput = (input: string) => {
    const [unparsedStacks, unparsedCommands] = input.split('\n\n')

    const unparsedStackAsChars = unparsedStacks
        .split('\n')
        .map((line) => chunk(line.split(''), 4))
    const stacks = transpose(unparsedStackAsChars).map((line) =>
        line
            .map((item) => item[1])
            .slice(0, -1)
            .filter((item) => item !== ' ')
    )

    const commands = unparsedCommands
        .split('\n')
        .map<[number, number, number]>(
            (line) =>
                line.match(/\d+/g)?.map(Number) as [number, number, number]
        )

    return {
        stacks,
        commands,
    }
}

const solve = parseAndSolve(2022, 5, mapInput)

// Part One
solve(
    ({ commands, stacks }) =>
        commands
            .reduce(moveBoxes(false), stacks)
            .map((stack) => stack[0])
            .join(''),
    'Part One:'
)

// Part Two
solve(
    ({ commands, stacks }) =>
        commands
            .reduce(moveBoxes(true), stacks)
            .map((stack) => stack[0])
            .join(''),
    'Part Two:'
)
