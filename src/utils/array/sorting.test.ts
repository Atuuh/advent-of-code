import { ascending } from './sorting'

describe('Utils - Array - Sorting', () => {
    describe('ascending', () => {
        it('correctly sorts numbers in ascending order', () => {
            expect([1, 5, 7, 35, 3].sort(ascending)).toEqual([1, 3, 5, 7, 35])
        })
    })
})
