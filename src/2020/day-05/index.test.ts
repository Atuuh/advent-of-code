import { getSeatID } from '.'

describe('2020 - Day 05', () => {
    describe('Part One', () => {
        test('example 1 should work', () => {
            const input = 'FBFBBFFRLR'
            const result = getSeatID(input)

            expect(result).toBe(357)
        })

        test('example 2 should work', () => {
            const input = 'BFFFBBFRRR'
            const result = getSeatID(input)

            expect(result).toBe(567)
        })

        test('example 3 should work', () => {
            const input = 'FFFBBBFRRR'
            const result = getSeatID(input)

            expect(result).toBe(119)
        })

        test('example 4 should work', () => {
            const input = 'BBFFBBFRLL'
            const result = getSeatID(input)

            expect(result).toBe(820)
        })
    })
})
