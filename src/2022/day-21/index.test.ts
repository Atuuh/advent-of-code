import { getHumanValue, getValue, parseInput } from '.'

describe('2022 - Day 21', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const root = parseInput(testInput1)
            expect(getValue(root)).toBe(152)
        })
    })

    describe('Part Two', () => {
        test('example should work', () => {
            const root = parseInput(testInput1)
            expect(getHumanValue(root)).toBe(301)
        })
    })
})

const testInput1 = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`
