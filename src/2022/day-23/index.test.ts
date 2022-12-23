import { parseInput, processRound, Vector2 } from '.'

describe('2022 - Day 23', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const elves: Vector2[] = [
                [2, 1],
                [2, 3],
                [2, 4],
                [3, 1],
                [3, 4],
            ]

            const expected = [
                [2, 1],
                [2, 3],
                [2, 5],
                [3, 2],
                [3, 5],
            ]

            expect(processRound(elves, 0)).toEqual(
                expect.arrayContaining(expected)
            )
        })
    })

    test('example with parsing should work', () => {
        const elves = parseInput(testInput1)

        const expected = [
            [2, 1],
            [2, 3],
            [2, 5],
            [3, 2],
            [3, 5],
        ]

        expect(processRound(elves, 0)).toEqual(expect.arrayContaining(expected))
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})

const testInput1 = `.....
..##.
..#..
.....
..##.
.....`
