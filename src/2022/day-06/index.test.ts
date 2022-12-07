import { getFirstMarkerIndex } from '.'

describe('2022 - Day 6', () => {
    describe('getFirstMarkerIndex', () => {
        test.each([
            ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
            ['nppdvjthqldpwncqszvftbrmjlhg', 6],
            ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
            ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
        ])('windowSize=4 should work', (input, expected) => {
            expect(getFirstMarkerIndex(4)(input)).toBe(expected)
        })

        test.each([
            ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
            ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
            ['nppdvjthqldpwncqszvftbrmjlhg', 23],
            ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
            ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
        ])('windowSize=14 should work', (input, expected) => {
            expect(getFirstMarkerIndex(14)(input)).toBe(expected)
        })
    })
})
