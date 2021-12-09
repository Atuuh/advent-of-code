import { sum } from '#utils/array/reducers'
import { getBasins, getLowPoints, productBiggestBasins, sumRiskLevels } from '.'

describe('2021 - Day 09', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [
                [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
                [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
                [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
                [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
                [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
            ]

            const lowPoints = getLowPoints(input)

            const result = sumRiskLevels(lowPoints)

            expect(result).toBe(15)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const input = [
                [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
                [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
                [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
                [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
                [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
            ]

            const basins = getBasins(input)

            const result = productBiggestBasins(basins)

            expect(result).toBe(1134)
        })
    })
})
