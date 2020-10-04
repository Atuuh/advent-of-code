import * as A from 'fp-ts/Array'
import * as Eq from 'fp-ts/Eq'
import * as NEA from 'fp-ts/NonEmptyArray'
import { flow } from 'fp-ts/function'

import { input } from './input'
import { log } from '#utils/console'
import { filterUnique } from '#utils/array'

type Move = '^' | '>' | 'v' | '<'
type Moves = NEA.NonEmptyArray<Move>
type House = [number, number]
type Houses = NEA.NonEmptyArray<House>

const parseMoves = (input: string) => input.split('') as Moves

const findNextHouse = (move: Move, [x, y]: House): House => {
    switch (move) {
        case '^':
            return [x, y + 1]
        case '>':
            return [x + 1, y]
        case 'v':
            return [x, y - 1]
        case '<':
            return [x - 1, y]
    }
}

const performMoves = (moves: Moves): Houses =>
    moves.reduce(
        (travelPath, nextMove) => {
            const nextHouse = findNextHouse(nextMove, NEA.last(travelPath))
            return NEA.snoc(travelPath, nextHouse)
        },
        [[0, 0]] as Houses
    )

const eqHouse = Eq.getTupleEq(Eq.eqNumber, Eq.eqNumber)

const getLength = (arr: unknown[]) => arr.length

export const getHousesDeliveredTo = flow(
    parseMoves,
    performMoves,
    filterUnique(eqHouse),
    getLength
)

const partA = () => getHousesDeliveredTo(input)

const delegateMoves = A.partitionWithIndex<Move>((index) => index % 2 === 0)

export const getHousesWithRoboSanta = flow(
    parseMoves,
    delegateMoves,
    ({ left, right }) =>
        [left as Moves, right as Moves] as NEA.NonEmptyArray<Moves>,
    NEA.map(performMoves),
    NEA.flatten,
    filterUnique(eqHouse),
    getLength
)

const partB = () => getHousesWithRoboSanta(input)

log('Part A', partA())
log('Part B', partB())
