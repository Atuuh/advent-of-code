import { findNumbersTotalling } from '.'

describe('2020 - Day 01', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [1721, 979, 366, 299, 675, 1456]
            const result = findNumbersTotalling(input, 2, 2020)

            expect(result).toEqual(expect.arrayContaining([1721, 299]))
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const input = [1721, 979, 366, 299, 675, 1456]
            const result = findNumbersTotalling(input, 3, 2020)

            expect(result).toEqual(expect.arrayContaining([979, 366, 675]))
        })
    })
})
