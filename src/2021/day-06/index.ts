import { getIncrementalArray } from '#utils/array/generation'
import { sum } from '#utils/array/reducers'

export type Model = {
    [age: number]: number
}

const getEmptyModel = (): Model =>
    getIncrementalArray(9).reduce((model, i) => ({ ...model, [i]: 0 }), {})

export const modelLifecycle = (days: number, fish: Model): Model => {
    if (days === 0) return fish

    const nextCycle = Object.keys(fish)
        .map(Number)
        .reduce(ageGroupOfFish(fish), getEmptyModel())

    return modelLifecycle(days - 1, nextCycle)
}

const ageGroupOfFish =
    (fish: Model) =>
    (newCycle: Model, age: number): Model =>
        age === 0
            ? { ...newCycle, 6: fish[age] + newCycle[6], 8: fish[age] }
            : { ...newCycle, [age - 1]: fish[age] + newCycle[age - 1] }

export const countFish = (fish: Model) => Object.values(fish).reduce(sum)
