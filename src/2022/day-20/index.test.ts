import { getNewIndex, mix, moveItemInList } from '.'

describe('2022 - Day 20', () => {
    describe('Part One', () => {
        test.each<[number[], number, number[]]>([
            [[1, 2, -3, 3, -2, 0, 4], 0, [2, 1, -3, 3, -2, 0, 4]],
            [[2, 1, -3, 3, -2, 0, 4], 0, [1, -3, 2, 3, -2, 0, 4]],
            [[1, -3, 2, 3, -2, 0, 4], 1, [1, 2, 3, -2, -3, 0, 4]],
            [[1, 2, 3, -2, -3, 0, 4], 2, [1, 2, -2, -3, 0, 3, 4]],
            [[1, 2, -2, -3, 0, 3, 4], 2, [1, 2, -3, 0, 3, 4, -2]],
            [[1, 2, -3, 0, 3, 4, -2], 3, [1, 2, -3, 0, 3, 4, -2]],
            [[1, 2, -3, 0, 3, 4, -2], 5, [1, 2, -3, 4, 0, 3, -2]],
        ])('moveItemInList', (array, index, expected) => {
            const result = moveItemInList(
                array,
                index,
                getNewIndex(index, array[index], array.length)
            )
            expect(result).toEqual(expected)
        })

        test('should mix correctly', () => {
            const result = mix(1)([1, 2, -3, 3, -2, 0, 4])
            expect(result).toEqual([1, 2, -3, 4, 0, 3, -2])
        })
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})
