export const moveBoxes =
    (retainOrder: boolean) =>
    (allStacks: string[][], [amount, from, to]: [number, number, number]) => {
        const toMove = allStacks[from - 1].slice(0, amount)
        const leftOver = allStacks[from - 1].slice(amount)

        return allStacks.map((stack, index) => {
            if (index + 1 === from) {
                return leftOver
            } else if (index + 1 === to) {
                return [...(retainOrder ? toMove : toMove.reverse()), ...stack]
            } else {
                return stack
            }
        })
    }
