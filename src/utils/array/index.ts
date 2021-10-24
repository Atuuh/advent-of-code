import { Eq } from 'fp-ts/lib/Eq'
import { flow } from 'fp-ts/lib/function'
import * as S from 'fp-ts/Set'

export const filterUnique = <T>(eq: Eq<T>): ((array: T[]) => T[]) =>
    flow(S.fromArray(eq), (set) => [...set])

export const atIndices = <T>(array: T[], indexes: number[]) =>
    indexes.map((index) => array[index])
