import { flow } from 'fp-ts/function';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as S from 'fp-ts/Set';
import * as Eq from 'fp-ts/Eq';
import * as A from 'fp-ts/Array';
import { input } from './input';

type Move = '^' | '>' | 'v' | '<';
type Moves = NEA.NonEmptyArray<Move>;
type House = [number, number];
type Houses = NEA.NonEmptyArray<House>;

const parseMoves = (input: string) => input.split('') as Moves;

const test = (move: Move, [x, y]: House): House => {
    switch (move) {
        case '^':
            return [x, y + 1];
        case '>':
            return [x + 1, y];
        case 'v':
            return [x, y - 1];
        case '<':
            return [x - 1, y];
    }
};

const performMoves = (moves: Moves): Houses =>
    moves.reduce(
        (travelPath, nextMove) => {
            const nextHouse = test(nextMove, NEA.last(travelPath));
            return NEA.snoc(travelPath, nextHouse);
        },
        [[0, 0]] as Houses
    );

const eqHouse = Eq.getTupleEq(Eq.eqNumber, Eq.eqNumber);

const toArray = <T extends unknown>(set: Set<T>): T[] => [...set];

const filterUnique = flow(S.fromArray(eqHouse), toArray);

const getLength = (arr: unknown[]) => arr.length;

export const getHousesDeliveredTo = flow(
    parseMoves,
    performMoves,
    filterUnique,
    getLength
);

export const partA = () => getHousesDeliveredTo(input);

const delegateMoves = A.partitionWithIndex<Move>((index) => index % 2 === 0);

export const getHousesWithRoboSanta = flow(
    parseMoves,
    delegateMoves,
    ({ left, right }) =>
        [left as Moves, right as Moves] as NEA.NonEmptyArray<Moves>,
    NEA.map(performMoves),
    NEA.flatten,
    filterUnique,
    getLength
);

export const partB = () => getHousesWithRoboSanta(input);

console.log('Part A', partA());
console.log('Part B', partB());
