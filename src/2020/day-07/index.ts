type NonEmptyContents = { colour: string; amount: number }

type EmptyBag = 'empty'

type BagContents = NonEmptyContents[] | EmptyBag

type Bags = {
    [key: string]: BagContents
}

const parseRule = (rule: string): [colour: string, contents: BagContents] => {
    const [, colour, heldBags] = rule.split(/^(.+?) bags contain /)
    const bags = heldBags
        .split(/[,.]/)
        .filter((bag) => !!bag)
        .map((bag) => {
            const [, amount, colour] = bag.split(/(\d) (.+?) bags?/)

            return { colour, amount: Number.parseInt(amount) }
        })
    return [
        colour,
        bags.some((bag) => Number.isNaN(bag.amount)) ? 'empty' : bags,
    ]
}

const parseAllRules = (input: string): Bags => {
    const rules = input.split('\n')
    return rules.reduce<Bags>((bags, rule) => {
        const [colour, heldBags] = parseRule(rule)

        return {
            ...bags,
            [colour.trim()]: heldBags,
        }
    }, {})
}

const shinyGold = 'shiny gold'

const doesContainShinyGoldBag = (
    colour: string,
    contents: BagContents,
    allBags: Bags,
    bagsContainingShinyGoldBags: string[]
): boolean => {
    if (contents === 'empty' || colour === shinyGold) {
        return false
    }
    if (bagsContainingShinyGoldBags.includes(colour)) {
        return true
    }
    if (contents.some((content) => content.colour === shinyGold)) {
        bagsContainingShinyGoldBags.push(colour)
        return true
    }
    const contentsContainShinyGold = contents.some((content) =>
        doesContainShinyGoldBag(
            content.colour,
            allBags[content.colour],
            allBags,
            bagsContainingShinyGoldBags
        )
    )
    if (contentsContainShinyGold) {
        bagsContainingShinyGoldBags.push(colour)
    }
    return contentsContainShinyGold
}

export const getBagsContainingShinyGoldBags = (rulesString: string) => {
    const allBags = parseAllRules(rulesString)

    const bagsCanContainShinyGold: string[] = []

    Object.keys(allBags).forEach((colour) =>
        doesContainShinyGoldBag(
            colour,
            allBags[colour],
            allBags,
            bagsCanContainShinyGold
        )
    )

    return bagsCanContainShinyGold.length
}

export const getRequiredNumberOfBags = (
    input: string,
    colour: string
): number => {
    const allBags = parseAllRules(input)

    const targetBag = allBags[colour]

    const getAmountOfBagsInside = (
        bag: BagContents,
        startCount = 1
    ): number => {
        if (bag === 'empty') return 1
        return bag.reduce(
            (total, child) =>
                total +
                child.amount * getAmountOfBagsInside(allBags[child.colour], 1),
            startCount
        )
    }

    return getAmountOfBagsInside(targetBag, 0)
}
