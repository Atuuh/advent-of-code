import { input } from './input'
import * as NEA from 'fp-ts/lib/NonEmptyArray'
import { flow, pipe } from 'fp-ts/lib/function'

const partA = () => getFinalFloor(input)

const partB = () => getFirstTimeAtBasement(input)

const mapInputToFloorNumber = (input: string) =>
    pipe(
        input.split('') as NEA.NonEmptyArray<'(' | ')'>,
        NEA.reduce(NEA.of(0), (floors, command) => {
            const previousFloor = NEA.last(floors)

            const currentFloor =
                command === '(' ? previousFloor + 1 : previousFloor - 1

            return NEA.concat(floors, [currentFloor])
        })
    )

export const getFinalFloor = flow(mapInputToFloorNumber, NEA.last)

export const getFirstTimeAtBasement = flow(mapInputToFloorNumber, (floors) =>
    floors.findIndex((floor) => floor === -1)
)

console.log('Part A', partA())
console.log('Part B', partB())
