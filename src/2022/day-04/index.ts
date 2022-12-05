import { getIncrementalArray } from '#utils/array/generation'
import { intersection } from '#utils/array/set'

export const getFullyContainingSection = (
    a: number,
    b: number,
    c: number,
    d: number
): number[] => {
    const firstContainsSecond = c >= a && d <= b
    if (firstContainsSecond) {
        return getIncrementalArray(d - c + 1, c)
    }
    const secondContainsFirst = a >= c && b <= d
    if (secondContainsFirst) {
        return getIncrementalArray(b - a + 1, a)
    }
    return []
}

export const getSectionOverlap = (
    a: number,
    b: number,
    c: number,
    d: number
): number[] => {
    const first = getIncrementalArray(b - a + 1, a)
    const second = getIncrementalArray(d - c + 1, c)
    return intersection([first, second])
}

export const inputToNumberArray = (
    line: string
): [number, number, number, number] =>
    line.match(/\d+/g)?.map(Number) as [number, number, number, number]
