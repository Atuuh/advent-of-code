import { isNiceString, partARules, partBRules } from '.'

describe('isNiceString Part A', () => {
    test('example 1', () => {
        expect(isNiceString(partARules)('ugknbfddgicrmopn')).toBe(true)
    })

    test('example 2', () => {
        expect(isNiceString(partARules)('aaa')).toBe(true)
    })

    test('example 3', () => {
        expect(isNiceString(partARules)('jchzalrnumimnmhp')).toBe(false)
    })

    test('example 4', () => {
        expect(isNiceString(partARules)('haegwjzuvuyypxyu')).toBe(false)
    })

    test('example 5', () => {
        expect(isNiceString(partARules)('dvszwmarrgswjxmb')).toBe(false)
    })
})

describe('isNiceString Part B', () => {
    test('example 1', () => {
        expect(isNiceString(partBRules)('qjhvhtzxzqqjkmpb')).toBe(true)
    })

    test('example 2', () => {
        expect(isNiceString(partBRules)('xxyxx')).toBe(true)
    })

    test('example 3', () => {
        expect(isNiceString(partBRules)('uurcxstgmygtbstg')).toBe(false)
    })

    test('example 4', () => {
        expect(isNiceString(partBRules)('ieodomkazucvgmuy')).toBe(false)
    })
})
