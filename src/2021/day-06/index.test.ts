import { countFish, modelLifecycle } from '.'

describe('2021 - Day 06', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const startingFish = { 1: 1, 2: 1, 3: 2, 4: 1 }

            const result = modelLifecycle(18, startingFish)
            const fishCount = countFish(result)

            expect(fishCount).toBe(26)
        })

        test('second example should work', () => {
            const startingFish = { 1: 1, 2: 1, 3: 2, 4: 1 }

            const result = modelLifecycle(80, startingFish)
            const fishCount = countFish(result)

            expect(fishCount).toBe(5934)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const startingFish = { 1: 1, 2: 1, 3: 2, 4: 1 }

            const result = modelLifecycle(256, startingFish)
            const fishCount = countFish(result)

            expect(fishCount).toBe(26984457539)
        })
    })
})
