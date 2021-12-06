import { sum } from '#utils/array/reducers'

export type Model = {
    [age: number]: number
}

export const modelLifecycle = (days: number, fish: Model): Model => {
    if (days === 0) return fish

    const nextCycle = {
        0: fish[1] || 0,
        1: fish[2] || 0,
        2: fish[3] || 0,
        3: fish[4] || 0,
        4: fish[5] || 0,
        5: fish[6] || 0,
        6: fish[7] + fish[0] || 0,
        7: fish[8] || 0,
        8: fish[0] || 0,
    }

    return modelLifecycle(days - 1, nextCycle)
}

export const countFish = (fish: Model) => Object.values(fish).reduce(sum)

// const ageFish = (age: number, fishCount: number) =>
//     age === 0 ?
//         ([{6: fishCount}, {8: fishCount}]) :
//         ({[age - 1]: fishCount})

// const ageFish = (fish: number): number[] => (fish === 0 ? [6, 8] : [fish - 1])
