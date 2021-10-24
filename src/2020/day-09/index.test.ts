import { crackEncryption, findFirstInvalidNumber } from '.'

describe('2020 - Day 09', () => {
    describe('Part One', () => {
        test('Example 1', () => {
            const input = `35
            20
            15
            25
            47
            40
            62
            55
            65
            95
            102
            117
            150
            182
            127
            219
            299
            277
            309
            576`

            const result = findFirstInvalidNumber(input, 5)

            expect(result).toBe(127)
        })
    })

    describe('Part Two', () => {
        test('Example 1', () => {
            const input = `35
            20
            15
            25
            47
            40
            62
            55
            65
            95
            102
            117
            150
            182
            127
            219
            299
            277
            309
            576`

            const result = crackEncryption(input, 5)

            expect(result).toBe(62)
        })
    })
})
