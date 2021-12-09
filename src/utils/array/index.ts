import { Eq } from 'fp-ts/lib/Eq'
import { flow } from 'fp-ts/lib/function'
import * as S from 'fp-ts/Set'

export const filterUnique = <T>(eq: Eq<T>): ((array: T[]) => T[]) =>
    flow(S.fromArray(eq), (set) => [...set])

export const uniqueBy =
    <T>(compareFn: (a: T, b: T) => boolean) =>
    (element: T, index: number, self: T[]) =>
        self.findIndex((item) => compareFn(element, item)) === index

export const atIndices = <T>(array: T[], indexes: number[]) =>
    indexes.map((index) => array[index])

export const partition =
    <T>(predicate: (item: T) => boolean) =>
    (array: T[]): [T[], T[]] =>
        array.reduce<[T[], T[]]>(
            ([passing, failing], item) =>
                predicate(item)
                    ? [[...passing, item], failing]
                    : [passing, [...failing, item]],
            [[], []]
        )
