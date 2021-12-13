import { foldAlong } from '.'

describe('2021 - Day 13', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const dots: [number, number][] = [
                [6, 10],
                [0, 14],
                [9, 10],
                [0, 3],
                [10, 4],
                [4, 11],
                [6, 0],
                [6, 12],
                [4, 1],
                [0, 13],
                [10, 12],
                [3, 4],
                [3, 0],
                [8, 4],
                [1, 10],
                [2, 14],
                [8, 10],
                [9, 0],
            ]

            const result = foldAlong(dots, 'y', 7)

            expect(result).toHaveLength(17)
        })
    })
})
