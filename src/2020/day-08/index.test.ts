import { processBootCode, repairBootCode } from '.'

describe('2020 - Day 08', () => {
    describe('Part One', () => {
        test('Example 1', () => {
            const input = `nop +0
            acc +1
            jmp +4
            acc +3
            jmp -3
            acc -99
            acc +1
            jmp -4
            acc +6`

            const result = processBootCode(input)

            expect(result.acc).toBe(5)
        })
    })

    describe('Part Two', () => {
        test('Example 1', () => {
            const input = `nop +0
            acc +1
            jmp +4
            acc +3
            jmp -3
            acc -99
            acc +1
            nop -4
            acc +6`

            const result = processBootCode(input)

            expect(result.acc).toBe(8)
        })

        test('Correctly modify to successful bootcode', () => {
            const input = `nop +0
            acc +1
            jmp +4
            acc +3
            jmp -3
            acc -99
            acc +1
            jmp -4
            acc +6`

            const result = repairBootCode(input)

            expect(result.acc).toBe(8)
        })
    })
})
