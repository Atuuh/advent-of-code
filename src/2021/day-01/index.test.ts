import { countIncreasingNumbers } from '.'

describe('2021 - Day 01', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

            const result = countIncreasingNumbers(input)

            expect(result).toEqual(7)
        })
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})
