import { atIndices } from '.'

describe('Array Utils', () => {
    describe('atIndices', () => {
        test('Can get multiple indices', () => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

            const result = atIndices(array, [0, 9])

            expect(result).toEqual([1, 10])
        })
    })
})
