import { getLowestNumber, partATest } from '.'

describe('getLowestNumber', () => {
    test('example 1', () => {
        expect(getLowestNumber(partATest)('abcdef')).toBe(609043)
    })

    test('example 2', () => {
        expect(getLowestNumber(partATest)('pqrstuv')).toBe(1048970)
    })
})
