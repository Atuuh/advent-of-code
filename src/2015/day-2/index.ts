import { flow, pipe } from 'fp-ts/function'
import { ordNumber } from 'fp-ts/lib/Ord'
import { semigroupProduct, semigroupSum } from 'fp-ts/lib/Semigroup'
import * as NEA from 'fp-ts/NonEmptyArray'
import { input } from './input'

const getLengths = flow(
    (input: string) => input.split('x') as NEA.NonEmptyArray<string>,
    NEA.map(Number)
)

const getSideAreas = (lengths: number[]) =>
    lengths
        .map((length, index, array) => {
            const rest = array.slice(index + 1)
            return rest.map((r) => r * length)
        })
        .flat() as NEA.NonEmptyArray<number>

const doubleSides = (sides: NEA.NonEmptyArray<number>) =>
    pipe(
        sides,
        NEA.map((side) => [side, side] as NEA.NonEmptyArray<number>),
        NEA.flatten
    )

const addSmallest = (nea: NEA.NonEmptyArray<number>) =>
    NEA.concat(nea, [NEA.min(ordNumber)(nea)])

export const getWrappingPaperNeeded = flow(
    getLengths,
    getSideAreas,
    doubleSides,
    addSmallest,
    NEA.fold(semigroupSum)
)

const partA = () =>
    pipe(
        input.split('\n') as NEA.NonEmptyArray<string>,
        NEA.map(getWrappingPaperNeeded),
        NEA.fold(semigroupSum)
    )

const getShortestSides: (
    nea: NEA.NonEmptyArray<number>
) => NEA.NonEmptyArray<number> = flow(
    NEA.sort(ordNumber),
    NEA.reverse,
    (nea) => nea.slice(1) as NEA.NonEmptyArray<number>
)

const getSmallestPerimeter = (sides: NEA.NonEmptyArray<number>) =>
    pipe(sides, getShortestSides, doubleSides, NEA.fold(semigroupSum))

const calculateRibbonLength = (sides: NEA.NonEmptyArray<number>) => {
    const perimeter = getSmallestPerimeter(sides)
    const bow = NEA.fold(semigroupProduct)(sides)

    return perimeter + bow
}

export const getRibbonNeeded = flow(getLengths, calculateRibbonLength)

const partB = () =>
    pipe(
        input.split('\n') as NEA.NonEmptyArray<string>,
        NEA.map(getRibbonNeeded),
        NEA.fold(semigroupSum)
    )

console.log('Part A', partA())
console.log('Part B', partB())
