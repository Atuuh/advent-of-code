import { getDistinctPathsToEnd, getJoltageDifferences } from '.'

describe('2020 - Day 10', () => {
    describe('Part One', () => {
        test('Example 1', () => {
            const input = `16
            10
            15
            5
            1
            11
            7
            19
            6
            12
            4`

            const result = getJoltageDifferences(input)

            expect(result[1] * result[3]).toBe(35)
        })

        test('Example 2', () => {
            const input = `28
            33
            18
            42
            31
            14
            46
            20
            48
            47
            24
            23
            49
            45
            19
            38
            39
            11
            1
            32
            25
            35
            8
            17
            7
            9
            4
            2
            34
            10
            3`

            const result = getJoltageDifferences(input)

            expect(result[1] * result[3]).toBe(220)
        })
    })

    describe('Part Two', () => {
        test('Example 1', () => {
            const input = `16
            10
            15
            5
            1
            11
            7
            19
            6
            12
            4`

            const result = getDistinctPathsToEnd(input)

            expect(result).toBe(8)
        })

        test('Example 2', () => {
            const input = `28
            33
            18
            42
            31
            14
            46
            20
            48
            47
            24
            23
            49
            45
            19
            38
            39
            11
            1
            32
            25
            35
            8
            17
            7
            9
            4
            2
            34
            10
            3`

            const result = getDistinctPathsToEnd(input)

            expect(result).toBe(19208)
        })
    })
})
