import { zip } from '#utils/array/transformations'

type Polymer = string[]

type Rules = {
    [key: string]: string
}

export const generatePolymer = (
    rules: Rules,
    polymerChain: Polymer,
    steps: number
): Polymer => {
    if (steps === 0) {
        return polymerChain
    }

    const pairs = zip(polymerChain.slice(0, -1), polymerChain.slice(1))

    const newPolymer = pairs.reduce<Polymer>(
        (newPolymer, [a, b]) => {
            const rule = rules[`${a}${b}`]
            return rule ? newPolymer.concat(rule, b) : newPolymer.concat(b)
        },
        [polymerChain[0]]
    )

    return generatePolymer(rules, newPolymer, steps - 1)
}

export const generateRules = (rulesString: string[]): Rules =>
    rulesString.reduce((rulesMap, ruleLine) => {
        const [pair, insert] = ruleLine.split(' -> ')
        return {
            ...rulesMap,
            [pair]: insert,
        }
    }, {})
