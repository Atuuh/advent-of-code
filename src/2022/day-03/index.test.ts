import { findBadge, findItemInBothCompartments, getPriority } from '.'

describe('2022 - Day 03', () => {
    describe('getPriority', () => {
        test('example should work', () => {
            expect(getPriority('p')).toBe(16)
            expect(getPriority('L')).toBe(38)
            expect(getPriority('P')).toBe(42)
            expect(getPriority('v')).toBe(22)
            expect(getPriority('t')).toBe(20)
            expect(getPriority('s')).toBe(19)
        })
    })

    describe('findItemInBothCompartments', () => {
        test('should correctly find the item in both compartments', () => {
            expect(findItemInBothCompartments('vJrwpWtwJgWrhcsFMMfFFhFp')).toBe(
                'p'
            )
            expect(
                findItemInBothCompartments('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')
            ).toBe('L')
            expect(findItemInBothCompartments('PmmdzqPrVvPwwTWBwg')).toBe('P')
            expect(
                findItemInBothCompartments('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn')
            ).toBe('v')
            expect(findItemInBothCompartments('ttgJtRGJQctTZtZT')).toBe('t')
            expect(findItemInBothCompartments('CrZsJsPPZsGzwwsLwLmpwMDw')).toBe(
                's'
            )
        })
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
