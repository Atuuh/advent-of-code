import { getIncrementalArray } from '#utils/array/generation'
import { max, min } from '#utils/array/reducers'

type Result = [position: number, fuelCost: number]
type FuelRate = 'constant' | 'linear'

export const getCheapestAlignment =
    (fuelRate: 'constant' | 'linear') =>
    (positions: number[]): Result => {
        const minimum = positions.reduce(min)
        const maximum = positions.reduce(max)
        const testPositions = getIncrementalArray(maximum - minimum, minimum)

        const cheapestPosition = testPositions.reduce(
            calculateFuel(positions, fuelRate),
            [Number.MAX_VALUE, Number.MAX_VALUE]
        )
        return cheapestPosition
    }

const calculateFuel =
    (positions: number[], fuelRate: FuelRate) =>
    ([cheapestPosition, cheapestCost]: Result, value: number): Result => {
        const cost = positions.reduce(
            fuelRate === 'constant'
                ? constantFuelRate(value)
                : linearFuelRate(value),
            0
        )
        if (cost < cheapestCost) {
            return [value, cost]
        } else {
            return [cheapestPosition, cheapestCost]
        }
    }

const constantFuelRate = (value: number) => (total: number, position: number) =>
    (total += Math.abs(value - position))

const linearFuelRate = (value: number) => (total: number, position: number) =>
    (total += getGaussianSum(Math.abs(value - position)))

const getGaussianSum = (amount: number) => (amount * (amount + 1)) / 2
