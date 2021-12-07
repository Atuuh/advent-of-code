import { getCheapestAlignment } from '.'

describe('2021 - Day 07', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

            const [position, fuelCost] = getCheapestAlignment(input)

            expect(position).toBe(2)
            expect(fuelCost).toBe(37)
        })
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})
