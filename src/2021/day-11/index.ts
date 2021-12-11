import { getNeighbours, map, modify } from '#utils/array/2d'

type Octopus = {
    x: number
    y: number
    energy: number
    hasFlashed: boolean
}

type Grid = Octopus[][]

export const getOctopusGrid = (energyLevels: number[][]): Grid =>
    energyLevels.map((column, y) =>
        column.map<Octopus>((level, x) => ({
            x,
            y,
            energy: level,
            hasFlashed: false,
        }))
    )

const incrementGrid = map((octopus: Octopus) => ({
    ...octopus,
    energy: octopus.energy + 1,
}))

const drainGrid = map((octopus: Octopus) =>
    octopus.hasFlashed
        ? {
              ...octopus,
              hasFlashed: false,
              energy: 0,
          }
        : octopus
)

export const simulateSteps = (
    grid: Grid,
    steps: number,
    flashes = 0
): [Grid, number] => {
    if (steps <= 0) {
        return [grid, flashes]
    }

    const updatedGrid = incrementGrid(grid)

    const [flashedGrid, flashesThisStep] = processFlashes(updatedGrid)

    const drainedGrid = drainGrid(flashedGrid)

    return simulateSteps(drainedGrid, steps - 1, flashes + flashesThisStep)
}

const processFlashes = (
    grid: Grid,
    flashes = 0
): [updatedGrid: Grid, flashesProcessed: number] => {
    const octopusesToFlash = grid
        .flat()
        .filter((octopus) => octopus.energy > 9 && octopus.hasFlashed === false)
    if (octopusesToFlash.length === 0) {
        return [grid, flashes]
    }

    const octopus = octopusesToFlash[0]

    const neighbours = getNeighbours(grid)(octopus.x, octopus.y, 'both')

    const gridAfterThisFlash = modify(grid, octopus.x, octopus.y, (item) => ({
        ...item,
        hasFlashed: true,
    }))

    const flashedGrid = neighbours.reduce(
        (newGrid, { x, y }) =>
            modify(newGrid, x, y, (item) => ({
                ...item,
                energy: item.energy + 1,
            })),
        gridAfterThisFlash
    )

    return processFlashes(flashedGrid, flashes + 1)
}

export const getSynchroniseStep = (startingGrid: Grid): number => {
    const gridSize = startingGrid.flat().length

    const flashesInStep = (grid: Grid, step = 1): number => {
        const [newGrid, flashes] = simulateSteps(grid, 1)
        if (flashes === gridSize) {
            return step
        } else {
            return flashesInStep(newGrid, step + 1)
        }
    }

    return flashesInStep(startingGrid)
}
