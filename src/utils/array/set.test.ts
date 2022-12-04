import { intersection, union } from './set'

describe('Utils - Array - Set', () => {
    describe('intersection', () => {
        test('should correctly find common item amongst arrays', () => {
            const a = [1, 2, 3]
            const b = [4, 5, 2, 6]
            const c = [9, 8, 7, 2]

            expect(intersection([a, b, c])).toEqual([2])
        })

        test('should correctly find common items amongst arrays', () => {
            const a = [1, 2, 3, 6]
            const b = [4, 5, 2, 6]
            const c = [9, 8, 7, 2, 6]
            const d = [6, 7, 3, 1, 2]

            const result = intersection([a, b, c, d])
            expect(result).toHaveLength(2)
            expect(result).toContain(2)
            expect(result).toContain(6)
        })
    })

    describe('union', () => {
        test('should correctly union arrays together', () => {
            const a = [1, 2, 3, 4]
            const b = [4, 5, 6, 7]
            const c = [7, 8, 9, 10]

            const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const result = union([a, b, c])

            expect(result).toHaveLength(expected.length)
            expect(result).toEqual(expect.arrayContaining(expected))
        })
    })
})
