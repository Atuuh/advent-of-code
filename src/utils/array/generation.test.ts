import { getIncrementalArray, repeat } from './generation'

describe('Utils - Array', () => {
    describe('getIncrementalArray', () => {
        test('Creates an array properly', () => {
            expect(getIncrementalArray(5)).toEqual([0, 1, 2, 3, 4])
        })

        test('Creates an array properly from start index', () => {
            expect(getIncrementalArray(5, 5)).toEqual([5, 6, 7, 8, 9])
        })
    })

    describe('repeat', () => {
        test('should repeat an array desired amount of times', () => {
            const input = [1, 2, 3]
            const expected = [1, 2, 3, 1, 2, 3]

            expect(repeat(input, 2)).toEqual(expected)
        })

        test('should repeat an array up to a maximum length', () => {
            const input = [1, 2, 3]
            const expected = [1, 2, 3, 1, 2, 3, 1]

            expect(repeat(input, 3, 7)).toEqual(expected)
        })
    })
})
