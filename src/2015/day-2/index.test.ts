import { getRibbonNeeded, getWrappingPaperNeeded } from '.'

describe('getWrappingPaperNeeded', () => {
    test('example 1', () => {
        const input = '2x3x4'

        expect(getWrappingPaperNeeded(input)).toBe(58)
    })

    test('example 2', () => {
        const input = '1x1x10'

        expect(getWrappingPaperNeeded(input)).toBe(43)
    })
})

describe('getRibbonNeeded', () => {
    test('example 1', () => {
        const input = '2x3x4'

        expect(getRibbonNeeded(input)).toBe(34)
    })

    test('example 2', () => {
        const input = '1x1x10'

        expect(getRibbonNeeded(input)).toBe(14)
    })
})
