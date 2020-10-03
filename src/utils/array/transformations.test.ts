import { chunk, concat, rotate, transpose, zip } from './transformations'

describe('Utils - Array - Transformations', () => {
    describe('chunk', () => {
        test('correctly chunks an array into defined sizes', () => {
            const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]
            expect(chunk(input, 3)).toEqual(expected)
        })
    })

    describe('transpose', () => {
        test('successfully transposes a 2d array', () => {
            const input = [
                [0, 1, 2],
                [0, 1, 2],
                [0, 1, 2],
            ]
            const expected = [
                [0, 0, 0],
                [1, 1, 1],
                [2, 2, 2],
            ]
            expect(transpose(input)).toEqual(expected)
        })

        test('successfully transposes a non symmetrical 2d array', () => {
            const input = [
                [1, 2, 3, 4, 5, 6],
                [6, 5, 4, 3, 2, 1],
            ]
            const expected = [
                [1, 6],
                [2, 5],
                [3, 4],
                [4, 3],
                [5, 2],
                [6, 1],
            ]
            expect(transpose(input)).toEqual(expected)
        })
    })

    describe('rotate', () => {
        test('should by default rotate array to the left by 1', () => {
            const input = [1, 2, 3, 4, 5]
            const expected = [2, 3, 4, 5, 1]

            expect(rotate(input)).toEqual(expected)
        })

        test('should rotate items to the right if specified', () => {
            const input = [1, 2, 3, 4, 5]
            const expected = [5, 1, 2, 3, 4]

            expect(rotate(input, 1, 'right')).toEqual(expected)
        })

        test('should rotate multiple items to the left', () => {
            const input = [1, 2, 3, 4, 5]
            const expected = [4, 5, 1, 2, 3]

            expect(rotate(input, 3)).toEqual(expected)
        })

        test('should loop around array if amount is greater than array length', () => {
            const input = [1, 2, 3, 4, 5]
            const expected = [2, 3, 4, 5, 1]

            expect(rotate(input, 6)).toEqual(expected)
        })
    })

    describe('concat', () => {
        test('should join 2 arrays together', () => {
            const a = [1, 2, 3]
            const b = ['a', 'b', 'c']

            expect(concat(a, b)).toEqual([1, 2, 3, 'a', 'b', 'c'])
        })

        test('should join more than 2 arrays together', () => {
            const a = [1, 2, 3]
            const b = [4, 5, 6]
            const c = [7, 8, 9]
            const d = [10, 11, 12]

            expect(concat(a, b, c, d)).toEqual([
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
            ])
        })
    })

    describe('zip', () => {
        test('should zip two arrays together', () => {
            const a = [1, 2, 3]
            const b = ['a', 'b', 'c']
            const expected = [
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]

            expect(zip(a, b)).toEqual(expected)
        })
    })
})
