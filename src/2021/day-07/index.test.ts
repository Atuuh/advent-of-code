import { getCheapestAlignment } from '.'

describe('2021 - Day 07', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

            const [position, fuelCost] = getCheapestAlignment('constant')(input)

            expect(position).toBe(2)
            expect(fuelCost).toBe(37)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

            const [position, fuelCost] = getCheapestAlignment('linear')(input)

            expect(position).toBe(5)
            expect(fuelCost).toBe(168)
        })
    })
})
