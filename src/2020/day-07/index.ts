type BagContents = { colour: string; amount: number }
type Bags = {
    [key: string]: BagContents[]
}

export const getBagsContainingShinyGoldBags = (rulesString: string) => {
    const rules = rulesString.split('\n')
    const stuff = rules.reduce<Bags>((bags, rule) => {
        const [, colour, heldBags] = rule.split(/^(.+?) bags contain /)
        const dbags = heldBags
            .split(/[,.]/)
            .filter((bag) => !!bag)
            .map<BagContents>((bag) => {
                const [, amount, colour] = bag.split(/(\d) (.+?) bags?/)
                return { amount: Number.parseInt(amount), colour }
            })

        return {
            ...bags,
            [colour.trim()]: dbags,
        }
    }, {})
    return 0
}
