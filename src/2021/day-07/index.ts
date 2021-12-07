import { getIncrementalArray } from '#utils/array/generation'
import { max, min } from '#utils/array/reducers'

type tetete = [position: number, fuelCost: number]

export const getCheapestAlignment = (positions: number[]): tetete => {
    const minimum = positions.reduce(min)
    const maximum = positions.reduce(max)
    const testPositions = getIncrementalArray(maximum - minimum, minimum)
    const cheapestPosition = testPositions.reduce(calculateFuel(positions), [
        Number.MAX_VALUE,
        Number.MAX_VALUE,
    ])
    return cheapestPosition
}

const calculateFuel =
    (positions: number[]) =>
    ([cheapestPosition, cheapestCost]: tetete, value: number): tetete => {
        const cost = positions.reduce(
            (acc, pos) => (acc += Math.abs(value - pos)),
            0
        )
        if (cost < cheapestCost) {
            return [value, cost]
        } else {
            return [cheapestPosition, cheapestCost]
        }
    }
