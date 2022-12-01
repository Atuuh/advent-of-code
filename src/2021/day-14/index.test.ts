import { generatePolymer, generateRules } from '.'

describe('2021 - Day 14', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const startingPolymer = 'NNCB'.split('')

            const rules = generateRules([
                'CH -> B',
                'HH -> N',
                'CB -> H',
                'NH -> C',
                'HB -> C',
                'HC -> B',
                'HN -> C',
                'NN -> C',
                'BH -> H',
                'NC -> B',
                'NB -> B',
                'BN -> B',
                'BB -> N',
                'BC -> B',
                'CC -> N',
                'CN -> C',
            ])

            let nextPolymer = generatePolymer(rules, startingPolymer, 1)
            expect(nextPolymer.join('')).toBe('NCNBCHB')

            nextPolymer = generatePolymer(rules, nextPolymer, 1)
            expect(nextPolymer.join('')).toBe('NBCCNBBBCBHCB')

            nextPolymer = generatePolymer(rules, nextPolymer, 1)
            expect(nextPolymer.join('')).toBe('NBBBCNCCNBBNBNBBCHBHHBCHB')

            nextPolymer = generatePolymer(rules, nextPolymer, 1)
            expect(nextPolymer.join('')).toBe(
                'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'
            )
        })
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})
