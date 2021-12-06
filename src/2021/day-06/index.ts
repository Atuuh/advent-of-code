export const modelLifecycle = (days: number, fish: number[]): number[] => {
    if (days === 0) return fish
    if (days % 7) {
        console.log('There are', fish.length, 'fish')
    }
    const nextCycle = fish.flatMap(ageFish)

    return modelLifecycle(days - 1, nextCycle)
}

const ageFish = (fish: number): number[] => (fish === 0 ? [6, 8] : [fish - 1])
