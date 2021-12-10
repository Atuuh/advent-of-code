import { processInput } from '.'

describe('2021 - Day 10', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const input = [
                '{([(<{}[<>[]}>{[]{[(<()>',
                '[[<[([]))<([[{}[[()]]]',
                '[{[{({}]{}}([{[{{{}}([]',
                '[<(<(<(<{}))><([]([]()',
                '<{([([[(<>()){}]>(<<{{',
            ]

            const result = processInput(input, 'incorrect')

            expect(result[0].wrongCharacter).toBe('}')
            expect(result[1].wrongCharacter).toBe(')')
            expect(result[2].wrongCharacter).toBe(']')
            expect(result[3].wrongCharacter).toBe(')')
            expect(result[4].wrongCharacter).toBe('>')
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const input = [
                '[({(<(())[]>[[{[]{<()<>>',
                '[(()[<>])]({[<{<<[]>>(',
                '(((({<>}<{<{<>}{[]{[]{}',
                '{<[[]]>}<{[{[{[]{()[[[]',
                '<{([{{}}[<[[[<>{}]]]>[]]',
            ]

            const result = processInput(input, 'incomplete')

            expect(result[0].remainingCharacters.join('')).toBe('}}]])})]')
            expect(result[1].remainingCharacters.join('')).toBe(')}>]})')
            expect(result[2].remainingCharacters.join('')).toBe('}}>}>))))')
            expect(result[3].remainingCharacters.join('')).toBe(']]}}]}]}>')
            expect(result[4].remainingCharacters.join('')).toBe('])}>')
        })
    })
})
