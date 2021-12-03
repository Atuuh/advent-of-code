import { getLifeSupportRating, getPowerConsumption } from '.'

describe('2021 - Day 03', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [
                '00100',
                '11110',
                '10110',
                '10111',
                '10101',
                '01111',
                '00111',
                '11100',
                '10000',
                '11001',
                '00010',
                '01010',
            ]

            const result = getPowerConsumption(input)

            expect(result).toBe(198)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const input = [
                '00100',
                '11110',
                '10110',
                '10111',
                '10101',
                '01111',
                '00111',
                '11100',
                '10000',
                '11001',
                '00010',
                '01010',
            ]

            const result = getLifeSupportRating(input)

            expect(result).toBe(230)
        })
    })
})
