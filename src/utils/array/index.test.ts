import { atIndices, partition } from '.'

describe('Array Utils', () => {
    describe('atIndices', () => {
        test('Can get multiple indices', () => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

            const result = atIndices(array, [0, 9])

            expect(result).toEqual([1, 10])
        })
    })

    describe('partition', () => {
        test('Correctly seperates passing and failing values', () => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

            const isEven = (value: number) => value % 2 == 0

            const [even, odd] = partition(isEven)(array)

            expect(even).toEqual([2, 4, 6, 8, 10])
            expect(odd).toEqual([1, 3, 5, 7, 9])
        })

        test('Correctly handles array of arrays', () => {
            const array = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]

            const hasSmallNumber = (value: number[]) =>
                value.some((num) => num <= 4)

            const [even, odd] = partition(hasSmallNumber)(array)

            expect(even).toEqual([
                [1, 2, 3],
                [4, 5, 6],
            ])
            expect(odd).toEqual([[7, 8, 9]])
        })
    })
})
