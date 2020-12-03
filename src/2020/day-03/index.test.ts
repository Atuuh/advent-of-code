import { countTreesOnSlope } from '.'

describe('2020 - Day 03', () => {
    describe('Part One', () => {
        test('example should work', () => {
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
            const result = countTreesOnSlope(input, 3, 1)

            expect(result).toBe(7)
        })
    })
})
