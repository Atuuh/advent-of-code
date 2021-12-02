import { getPosition } from '.'

describe('2021 - Day 02', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [
                'forward 5',
                'down 5',
                'forward 8',
                'up 3',
                'down 8',
                'forward 2',
            ]

            const result = getPosition({ horizontal: 0, vertical: 0 })(input)

            expect(result.horizontal).toBe(15)
            expect(result.vertical).toBe(10)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const input = [
                'forward 5',
                'down 5',
                'forward 8',
                'up 3',
                'down 8',
                'forward 2',
            ]

            const result = getPosition({ horizontal: 0, vertical: 0, aim: 0 })(
                input
            )

            expect(result.horizontal).toBe(15)
            expect(result.vertical).toBe(60)
        })
    })
})
