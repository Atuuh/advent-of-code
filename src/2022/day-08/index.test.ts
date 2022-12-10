import { map } from '#utils/array/2d'
import { getScenicScore, getVisibleTrees, getVisibleTreesFrom } from '.'

describe('2022 - Day 8', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            const expected = [
                [true, true, true, true, true],
                [true, true, true, false, true],
                [true, true, false, true, true],
                [true, false, true, false, true],
                [true, true, true, true, true],
            ]

            expect(getVisibleTrees(grid)).toEqual(expected)
        })
    })

    describe('getVisibleTreesFrom', () => {
        test('left should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            const expected = [
                [true, false, false, true, false],
                [true, true, false, false, false],
                [true, false, false, false, false],
                [true, false, true, false, true],
                [true, true, false, true, false],
            ]

            const projection = getVisibleTreesFrom(grid, 'left')
            expect(projection).toEqual(expected)
        })

        test('right should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            const expected = [
                [false, false, false, true, true],
                [false, false, true, false, true],
                [true, true, false, true, true],
                [false, false, false, false, true],
                [false, false, false, true, true],
            ]

            const projection = getVisibleTreesFrom(grid, 'right')
            expect(projection).toEqual(expected)
        })

        test('up should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            const expected = [
                [true, true, true, true, true],
                [false, true, true, false, false],
                [true, false, false, false, false],
                [false, false, false, false, true],
                [false, false, false, true, false],
            ]

            const projection = getVisibleTreesFrom(grid, 'up')
            expect(projection).toEqual(expected)
        })

        test('down should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            const expected = [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [true, false, false, false, false],
                [false, false, true, false, true],
                [true, true, true, true, true],
            ]

            const projection = getVisibleTreesFrom(grid, 'down')
            expect(projection).toEqual(expected)
        })
    })

    describe('getScenicScore', () => {
        test('first example should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            expect(getScenicScore(grid, 1, 2)).toBe(4)
        })

        test('second example should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            expect(getScenicScore(grid, 3, 2)).toBe(8)
        })

        test('all examples should work', () => {
            const grid = [
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ]

            const expected = [
                [0, 0, 0, 0, 0],
                [0, 1, 4, 1, 0],
                [0, 6, 1, 2, 0],
                [0, 1, 8, 3, 0],
                [0, 0, 0, 0, 0],
            ]
            const mapped = grid.map((col, y) =>
                col.map((item, x) => getScenicScore(grid, y, x))
            )
            expect(mapped).toEqual(expect.arrayContaining(expected))
        })
    })
})
