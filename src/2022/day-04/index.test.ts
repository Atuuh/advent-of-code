import {
    getFullyContainingSection,
    getSectionOverlap,
    inputToNumberArray,
} from '.'

describe('2022 - Day 4', () => {
    describe('getSectionOverlap', () => {
        test.each([
            [[2, 4, 6, 8], []],
            [[2, 3, 4, 5], []],
            [[5, 7, 7, 9], [7]],
            [
                [2, 8, 3, 7],
                [3, 4, 5, 6, 7],
            ],
            [[6, 6, 4, 6], [6]],
            [
                [2, 6, 4, 8],
                [4, 5, 6],
            ],
        ])('example should work', (sections, expected) => {
            const result = getSectionOverlap(
                sections[0],
                sections[1],
                sections[2],
                sections[3]
            )
            expect(result).toHaveLength(expected.length)
            expect(result).toEqual(expect.arrayContaining(expected))
        })
    })

    describe('inputToNumberArray', () => {
        test.each([
            ['2-4,6-8', [2, 4, 6, 8]],
            ['2-3,4-5', [2, 3, 4, 5]],
            ['5-7,7-9', [5, 7, 7, 9]],
            ['2-8,3-7', [2, 8, 3, 7]],
            ['6-6,4-6', [6, 6, 4, 6]],
            ['2-6,4-8', [2, 6, 4, 8]],
        ])('example should work', (input, expected) => {
            const result = inputToNumberArray(input)
            expect(result).toHaveLength(expected.length)
            expect(result).toEqual(expect.arrayContaining(expected))
        })
    })

    describe('getFullyContainingSection', () => {
        test.each<[[number, number, number, number], number[]]>([
            [[2, 4, 6, 8], []],
            [[2, 3, 4, 5], []],
            [[5, 7, 7, 9], []],
            [
                [2, 8, 3, 7],
                [3, 4, 5, 6, 7],
            ],
            [[6, 6, 4, 6], [6]],
            [[2, 6, 4, 8], []],
        ])('example should work', (section, expected) => {
            const result = getFullyContainingSection(...section)
            expect(result).toHaveLength(expected.length)
            expect(result).toEqual(expect.arrayContaining(expected))
        })
    })
})
