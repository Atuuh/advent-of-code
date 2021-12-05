import { addLinesToGrid, countOverlapPoints, Line } from '.'

describe('2021 - Day 05', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const lines: Line[] = [
                [
                    [0, 9],
                    [5, 9],
                ],
                [
                    [9, 4],
                    [3, 4],
                ],
                [
                    [2, 2],
                    [2, 1],
                ],
                [
                    [7, 0],
                    [7, 4],
                ],
                [
                    [0, 9],
                    [2, 9],
                ],
                [
                    [3, 4],
                    [1, 4],
                ],
            ]

            const grid = addLinesToGrid(10, lines)

            expect(countOverlapPoints(grid)).toBe(5)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const lines: Line[] = [
                [
                    [0, 9],
                    [5, 9],
                ],
                [
                    [8, 0],
                    [0, 8],
                ],
                [
                    [9, 4],
                    [3, 4],
                ],
                [
                    [2, 2],
                    [2, 1],
                ],
                [
                    [7, 0],
                    [7, 4],
                ],
                [
                    [6, 4],
                    [2, 0],
                ],
                [
                    [0, 9],
                    [2, 9],
                ],
                [
                    [3, 4],
                    [1, 4],
                ],
                [
                    [0, 0],
                    [8, 8],
                ],
                [
                    [5, 5],
                    [8, 2],
                ],
            ]

            const grid = addLinesToGrid(10, lines)

            expect(countOverlapPoints(grid)).toBe(12)
        })
    })
})
