import { getNeighbours, map, modify } from './2d'

describe('Utils | Array | 2D', () => {
    describe('map', () => {
        it('maps each element of an array using provided function', () => {
            const array = [
                [1, 0, 1],
                [0, 1, 2],
                [3, 1, 2],
            ]
            const multiplyBy5 = map((item: number) => item * 5)

            const result = multiplyBy5(array)

            expect(result.flat()).toHaveLength(array.flat().length)
            expect(result[0]).toEqual(expect.arrayContaining([5, 0, 5]))
            expect(result[1]).toEqual(expect.arrayContaining([0, 5, 10]))
            expect(result[2]).toEqual(expect.arrayContaining([15, 5, 10]))
        })
    })

    describe('modify', () => {
        it('immutably updates given element', () => {
            const array = [[0, 0, 0]]

            const result = modify(array, 1, 0, () => 10)

            expect(result).toHaveLength(array.length)
            expect(result).not.toBe(array)
            expect(result[0]).not.toBe(array[0])
            expect(result[0]).toEqual(expect.arrayContaining([0, 10, 0]))
        })
    })

    describe('getNeighbours', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]

        it('correctly gets cardinal neighbours', () => {
            const result = getNeighbours(array)(1, 1, 'cardinal')

            expect(result).toHaveLength(4)
            expect(result).toEqual(expect.arrayContaining([2, 4, 6, 8]))
        })

        it('correctly gets diagonal neighbours', () => {
            const result = getNeighbours(array)(1, 1, 'diagonal')

            expect(result).toHaveLength(4)
            expect(result).toEqual(expect.arrayContaining([1, 3, 7, 9]))
        })

        it('correctly gets both cardinal and diagonal neighbours', () => {
            const result = getNeighbours(array)(1, 1, 'both')

            expect(result).toHaveLength(8)
            expect(result).toEqual(
                expect.arrayContaining([1, 2, 3, 4, 6, 7, 8, 9])
            )
        })
    })
})
