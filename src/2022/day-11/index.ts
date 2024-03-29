import { max, min } from '#utils/array/reducers'
import { getPrimeDecomposition, lowestCommonMultiple } from '#utils/number'

const add = (a: number) => (b: number) => a + b
const multiply = (a: number) => (b: number) => a * b

type Monkey = {
    items: number[]
    operation: (a: number) => number
    test: number
    pass: number
    fail: number
    itemsThrown: number
}

const duplicateParams =
    <A, B>(fn: (a1: A) => (a2: A) => B) =>
    (a: A) =>
        fn(a)(a)

const getOperation = (op: string, amount: string) => {
    if (op === '+') {
        if (amount === 'old') {
            return duplicateParams(add)
        } else {
            return add(+amount)
        }
    } else {
        if (amount === 'old') {
            return duplicateParams(multiply)
        } else {
            return multiply(+amount)
        }
    }
}

export const parseInput = (input: string): Monkey[] =>
    input.split('\n\n').map((chunk) => {
        const monkey = chunk.split('\n')
        const items = monkey[1].split(':')[1].split(',').map(Number)

        const [op, amount] = monkey[2].split('new = old')[1].trim().split(' ')
        const operation: Monkey['operation'] = getOperation(op, amount)

        const test = +monkey[3].match(/\d+/)![0]
        const pass = +monkey[4].match(/\d+/)![0]
        const fail = +monkey[5].match(/\d+/)![0]

        return {
            items,
            operation,
            test,
            pass,
            fail,
            itemsThrown: 0,
        }
    })

const processRound = (
    monkeys: Monkey[],
    monkey: Monkey,
    currentMonkey: number
) => {
    for (const item of monkey.items) {
        const newWorryLevel = monkey.operation(item)
        const decreasedLevel = Math.floor(newWorryLevel / 3)
        const result = Number.isInteger(decreasedLevel / monkey.test)
        const targetMonkey = result ? monkey.pass : monkey.fail
        monkeys[targetMonkey].items.push(decreasedLevel)
        monkeys[currentMonkey].itemsThrown += 1
    }
    monkeys[currentMonkey].items = []

    return monkeys
}

const processHardRounds = (
    monkeys: Monkey[],
    monkey: Monkey,
    currentMonkey: number
) => {
    const mod = lowestCommonMultiple(monkeys.map((m) => m.test))
    for (const item of monkey.items) {
        const newWorryLevel = monkey.operation(item)
        const result = Number.isInteger(newWorryLevel / monkey.test)
        const targetMonkey = result ? monkey.pass : monkey.fail
        monkeys[targetMonkey].items.push(newWorryLevel % mod)
        monkeys[currentMonkey].itemsThrown += 1
    }
    monkeys[currentMonkey].items = []

    return monkeys
}

export const processRounds = (
    amount: number,
    startingMonkeys: Monkey[],
    hard = false
) =>
    new Array(amount)
        .fill(null)
        .reduce<Monkey[]>(
            (monkeys) =>
                hard
                    ? monkeys.reduce(processHardRounds, monkeys)
                    : monkeys.reduce(processRound, monkeys),
            startingMonkeys
        )
