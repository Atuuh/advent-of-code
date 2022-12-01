import { sum } from '#utils/array/reducers'
import { descending } from '#utils/array/sorting'

export const inputToCalorieCount = (input: string): number[] =>
    input
        .split('\n\n')
        .map((group) => group.split('\n').map(Number).reduce(sum))
        .sort(descending)

export const getTop = (array: number[], amount: number) =>
    array.slice(0, amount).reduce(sum)
