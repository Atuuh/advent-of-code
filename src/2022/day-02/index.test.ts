import { getCorrectScoreForRound, getIncorrectScoreForRound } from '.'

describe('2022 - Day 02', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const guide: [string, string][] = [
                ['A', 'Y'],
                ['B', 'X'],
                ['C', 'Z'],
            ]

            const scores = guide.map(getIncorrectScoreForRound)

            expect(scores).toEqual([8, 1, 6])
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const guide: [string, string][] = [
                ['A', 'Y'],
                ['B', 'X'],
                ['C', 'Z'],
            ]

            const scores = guide.map(getCorrectScoreForRound)

            expect(scores).toEqual([4, 1, 7])
        })
    })
})
