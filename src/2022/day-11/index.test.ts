import { parseInput, processRounds } from '.'

describe('2022 - Day 11', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const monkeys = parseInput(testInput1)
            const finalMonkeys = processRounds(20, monkeys)
            expect(monkeys).toHaveLength(4)
            expect(finalMonkeys.map((m) => m.itemsThrown)).toEqual(
                expect.arrayContaining([101, 95, 7, 105])
            )
        })
    })

    describe('Part Two', () => {
        test.skip('example should work', () => {
            const monkeys = parseInput(testInput1)
            const finalMonkeys = processRounds(10000, monkeys)
            expect(monkeys).toHaveLength(4)
            expect(finalMonkeys.map((m) => m.itemsThrown)).toEqual(
                expect.arrayContaining([52166, 47830, 1938, 52013])
            )
        })
    })
})

const testInput1 = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`
