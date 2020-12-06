import { getGroupAnswers } from '.'

describe('2020 - Day 06', () => {
    describe('Part One', () => {
        test('example 1 should work', () => {
            const input = 'abc'
            const result = getGroupAnswers(input)

            expect(result.length).toBe(3)
        })

        test('example 2 should work', () => {
            const input = 'a\nb\nc'
            const result = getGroupAnswers(input)

            expect(result.length).toBe(3)
        })

        test('example 3 should work', () => {
            const input = 'ab\nac'
            const result = getGroupAnswers(input)

            expect(result.length).toBe(3)
        })

        test('example 4 should work', () => {
            const input = 'a\na\na\na'
            const result = getGroupAnswers(input)

            expect(result.length).toBe(1)
        })

        test('example 5 should work', () => {
            const input = 'b'
            const result = getGroupAnswers(input)

            expect(result.length).toBe(1)
        })
    })

    describe('Part Two', () => {
        test('example 1 should work', () => {
            const input = 'abc'
            const result = getGroupAnswers(input, 'everyone')

            expect(result.length).toBe(3)
        })

        test('example 2 should work', () => {
            const input = 'a\nb\nc'
            const result = getGroupAnswers(input, 'everyone')

            expect(result.length).toBe(0)
        })

        test('example 3 should work', () => {
            const input = 'ab\nac'
            const result = getGroupAnswers(input, 'everyone')

            expect(result.length).toBe(1)
        })

        test('example 4 should work', () => {
            const input = 'a\na\na\na'
            const result = getGroupAnswers(input, 'everyone')

            expect(result.length).toBe(1)
        })

        test('example 5 should work', () => {
            const input = 'b'
            const result = getGroupAnswers(input, 'everyone')

            expect(result.length).toBe(1)
        })
    })
})
