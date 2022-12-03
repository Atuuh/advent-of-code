import { findBadge, findItemInBothCompartments, getPriority } from '.'

describe('2022 - Day 03', () => {
    describe('getPriority', () => {
        test.each([
            ['p', 16],
            ['L', 38],
            ['P', 42],
            ['v', 22],
            ['t', 20],
            ['s', 19],
        ])('example should work', (value, expected) => {
            expect(getPriority(value)).toEqual(expected)
        })
    })

    describe('findItemInBothCompartments', () => {
        test.each([
            ['vJrwpWtwJgWrhcsFMMfFFhFp', 'p'],
            ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'L'],
            ['PmmdzqPrVvPwwTWBwg', 'P'],
            ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'v'],
            ['ttgJtRGJQctTZtZT', 't'],
            ['CrZsJsPPZsGzwwsLwLmpwMDw', 's'],
        ])(
            'should correctly find the item in both compartments',
            (value, expected) => {
                expect(findItemInBothCompartments(value)).toEqual(expected)
            }
        )
    })

    describe('findBadge', () => {
        test('example should work', () => {
            const group1: [string, string, string] = [
                'vJrwpWtwJgWrhcsFMMfFFhFp',
                'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
                'PmmdzqPrVvPwwTWBwg',
            ]

            const group2: [string, string, string] = [
                'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
                'ttgJtRGJQctTZtZT',
                'CrZsJsPPZsGzwwsLwLmpwMDw',
            ]

            expect(findBadge(group1)).toBe('r')
            expect(findBadge(group2)).toBe('Z')
        })
    })
})
