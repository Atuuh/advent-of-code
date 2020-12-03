import { countTreesOnSlope } from '.'

describe('2020 - Day 03', () => {
    const input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

    test('example 1 should work', () => {
        const result = countTreesOnSlope(input, 1, 1)

        expect(result).toBe(2)
    })

    test('example 2 should work', () => {
        const result = countTreesOnSlope(input, 3, 1)

        expect(result).toBe(7)
    })

    test('example 3 should work', () => {
        const result = countTreesOnSlope(input, 5, 1)

        expect(result).toBe(3)
    })

    test('example 4 should work', () => {
        const result = countTreesOnSlope(input, 7, 1)

        expect(result).toBe(4)
    })

    test('example 5 should work', () => {
        const result = countTreesOnSlope(input, 1, 2)

        expect(result).toBe(2)
    })
})
