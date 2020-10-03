import { min, max, sum } from './reducers'

describe('Utils - Array - Reducers', () => {
    describe('min', () => {
        test('returns the minimum value in array', () => {
            const input = [1, 2, 3, 4, 5, 6, 7]
            expect(input.reduce(min)).toBe(1)
        })
    })

    describe('max', () => {
        test('returns the maximum value in array', () => {
            const input = [1, 2, 3, 4, 5, 6, 7]
            expect(input.reduce(max)).toBe(7)
        })
    })

    describe('sum', () => {
        test('returns the sum of the array', () => {
            const input = [1, 2, 3, 4, 5, 6, 7]
            expect(input.reduce(sum)).toBe(28)
        })
    })
})
