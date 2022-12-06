import { moveBoxes } from '.'

describe('2022 - Day 5', () => {
    describe.each([
        {
            allStacks: [['N', 'Z'], ['D', 'C', 'M'], ['P']],
            command: [1, 2, 1] as [number, number, number],
            expected: [['D', 'N', 'Z'], ['C', 'M'], ['P']],
        },
        {
            allStacks: [['D', 'N', 'Z'], ['C', 'M'], ['P']],
            command: [3, 1, 3] as [number, number, number],
            expected: [[], ['C', 'M'], ['Z', 'N', 'D', 'P']],
        },
        {
            allStacks: [[], ['C', 'M'], ['Z', 'N', 'D', 'P']],
            command: [2, 2, 1] as [number, number, number],
            expected: [['M', 'C'], [], ['Z', 'N', 'D', 'P']],
        },
        {
            allStacks: [['M', 'C'], [], ['Z', 'N', 'D', 'P']],
            command: [1, 1, 2] as [number, number, number],
            expected: [['C'], ['M'], ['Z', 'N', 'D', 'P']],
        },
    ])('moveBoxes', ({ allStacks, command, expected }) => {
        test('example should work', () => {
            const result = moveBoxes(false)(allStacks, command)
            expect(result).toEqual(expected)
        })
    })

    describe.each([
        {
            allStacks: [['N', 'Z'], ['D', 'C', 'M'], ['P']],
            command: [1, 2, 1] as [number, number, number],
            expected: [['D', 'N', 'Z'], ['C', 'M'], ['P']],
        },
        {
            allStacks: [['D', 'N', 'Z'], ['C', 'M'], ['P']],
            command: [3, 1, 3] as [number, number, number],
            expected: [[], ['C', 'M'], ['D', 'N', 'Z', 'P']],
        },
        {
            allStacks: [[], ['C', 'M'], ['D', 'N', 'Z', 'P']],
            command: [2, 2, 1] as [number, number, number],
            expected: [['C', 'M'], [], ['D', 'N', 'Z', 'P']],
        },
        {
            allStacks: [['C', 'M'], [], ['D', 'N', 'Z', 'P']],
            command: [1, 1, 2] as [number, number, number],
            expected: [['M'], ['C'], ['D', 'N', 'Z', 'P']],
        },
    ])('moveBoxes', ({ allStacks, command, expected }) => {
        test('example should work', () => {
            const result = moveBoxes(true)(allStacks, command)
            expect(result).toEqual(expected)
        })
    })
})
