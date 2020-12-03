import { isPasswordValid } from '.'

describe('2020 - Day 02', () => {
    describe('Part One', () => {
        test('example 1 should work', () => {
            const input = '1-3 a: abcde'
            const result = isPasswordValid(input)

            expect(result).toBe(true)
        })
        test('example 2 should work', () => {
            const input = '1-3 b: cdefg'
            const result = isPasswordValid(input)

            expect(result).toBe(false)
        })
        test('example 3 should work', () => {
            const input = '2-9 c: ccccccccc'
            const result = isPasswordValid(input)

            expect(result).toBe(true)
        })
    })
})
