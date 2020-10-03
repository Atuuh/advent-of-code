import { getLowestNumber } from '.'

describe('getLowestNumber', () => {
    test('example 1', () => {
        expect(getLowestNumber('abcdef')).toBe(609043)
    })

    test('example 2', () => {
        expect(getLowestNumber('pqrstuv')).toBe(1048970)
    })
})
