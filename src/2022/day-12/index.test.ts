import { canClimbTo, findPath } from '.'

describe('2022 - Day 12', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const grid = [
                ['S', 'a', 'b', 'q', 'p', 'o', 'n', 'm'],
                ['a', 'b', 'c', 'r', 'y', 'x', 'x', 'l'],
                ['a', 'c', 'c', 's', 'z', 'E', 'x', 'k'],
                ['a', 'c', 'c', 't', 'u', 'v', 'w', 'j'],
                ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i'],
            ]
            const result = findPath(canClimbTo)(
                grid,
                { x: 0, y: 0 },
                { x: 2, y: 5 }
            )
            expect(result).toHaveLength(32)
        })
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})
