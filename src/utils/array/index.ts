import { Eq } from 'fp-ts/lib/Eq'
import { flow } from 'fp-ts/lib/function'
import * as S from 'fp-ts/Set'

export const filterUnique = <T extends unknown>(
    eq: Eq<T>
): ((array: T[]) => T[]) => flow(S.fromArray(eq), (set) => [...set])
