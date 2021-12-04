import { max, sum } from '#utils/array/reducers'

export const scoreYahtzee = (rolls: number[]) => {
    const grouped = Array.from(Object.values(groupByNumber(rolls)))

    const ege = filterByLength(grouped)

    const minLengthOf = filterByMinLength(grouped)

    const four = minLengthOf(4)
    const three = minLengthOf(3)
    const pairs = minLengthOf(2)

    return {
        ones: rolls.reduce(filterSum(1)),
        twos: rolls.reduce(filterSum(2)),
        threes: rolls.reduce(filterSum(3)),
        fours: rolls.reduce(filterSum(4)),
        fives: rolls.reduce(filterSum(5)),
        sixes: rolls.reduce(filterSum(6)),

        pair:
            pairs.length > 0 ? pairs.map((pair) => pair[0]).reduce(max) * 2 : 0,
        twoPairs: pairs.length === 2 ? pairs.flat().reduce(sum) : 0,
        threeOfAKind: three.length === 1 ? three[0].reduce(sum) : 0,
        fourOfAKind: four.length === 1 ? four[0].reduce(sum) : 0,

        smallStraight: [1, 2, 3, 4, 5].every((num) => rolls.includes(num))
            ? 15
            : 0,
        largeStraight: [2, 3, 4, 5, 6].every((num) => rolls.includes(num))
            ? 20
            : 0,
        fullHouse:
            ege(3).length === 1 && ege(2).length === 1 ? rolls.reduce(sum) : 0,
        yahtzee: ege(5).length === 1 ? 50 : 0,
        chance: rolls.reduce(sum),
    }
}

const filterByLength =
    <T>(arrays: T[][]) =>
    (length: number) =>
        arrays.filter((array) => array.length === length)

const filterByMinLength =
    <T>(arrays: T[][]) =>
    (length: number) =>
        arrays.filter((array) => array.length >= length)

const groupByNumber = (values: number[]) =>
    values.reduce(
        (groups, value) => ({
            ...groups,
            [value]: (groups[value] || []).concat(value),
        }),
        {} as { [key: number]: number[] }
    )

const filterSum = (target: number) => (total: number, value: number) =>
    target === value ? total + value : total
