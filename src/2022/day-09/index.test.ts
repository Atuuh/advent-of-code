import { uniqueBy } from '#utils/array'
import { areSamePosition, getAllPositions } from '.'

describe('2022 - Day 9', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const result = getAllPositions(2)([
                ['R', 4],
                ['U', 4],
                ['L', 3],
                ['D', 1],
                ['R', 4],
                ['D', 1],
                ['L', 5],
                ['R', 2],
            ])
            const uniqueTailPositions = result[result.length - 1].filter(
                uniqueBy(areSamePosition)
            )
            expect(uniqueTailPositions).toHaveLength(13)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const result = getAllPositions(10)([
                ['R', 5],
                ['U', 8],
                ['L', 8],
                ['D', 3],
                ['R', 17],
                ['D', 10],
                ['L', 25],
                ['U', 20],
            ])
            const uniqueTailPositions = result[result.length - 1].filter(
                uniqueBy(areSamePosition)
            )
            expect(uniqueTailPositions).toHaveLength(36)
        })
    })
})
