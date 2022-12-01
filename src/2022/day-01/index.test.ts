import { getTop, inputToCalorieCount } from '.'

describe('2022 - Day 01', () => {
    describe('Part One', () => {
        test('getMostCalories', () => {
            const counts = inputToCalorieCount(testInput)
            expect(getTop(counts, 1)).toBe(24000)
        })
    })

    describe('Part Two', () => {
        test('get top 3 calorie counts', () => {
            const counts = inputToCalorieCount(testInput)
            expect(getTop(counts, 3)).toBe(45000)
        })
    })
})

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
