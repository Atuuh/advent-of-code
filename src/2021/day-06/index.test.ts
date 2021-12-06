import { modelLifecycle } from '.'

describe('2021 - Day 06', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const startingFish = [3, 4, 3, 1, 2]

            const result = modelLifecycle(18, startingFish)

            expect(result.length).toBe(26)
        })

        test('second example should work', () => {
            const startingFish = [3, 4, 3, 1, 2]

            const result = modelLifecycle(80, startingFish)

            expect(result.length).toBe(5934)
        })
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})
