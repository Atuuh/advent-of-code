import { intersection } from '#utils/array/set'
import { chunk } from '#utils/array/transformations'

export const getPriority = (char: string): number => {
    const a = char.charCodeAt(0) - 96

    return a > 0 ? a : a + 58
}

export const findItemInBothCompartments = (items: string): string =>
    intersection(chunk(items.split(''), items.length / 2))[0]

export const findBadge = (group: [string, string, string]): string =>
    intersection(group.map((item) => item.split('')))[0]
