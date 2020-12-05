import { getLowestNumber } from '.'
import { partATest } from './solution'

describe.skip('getLowestNumber', () => {
    test('example 1', () => {
        expect(getLowestNumber(partATest)('abcdef')).toBe(609043)
    })

    test('example 2', () => {
        expect(getLowestNumber(partATest)('pqrstuv')).toBe(1048970)
    })
})
