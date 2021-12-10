import { uniqueBy } from '#utils/array'
import { product, sum } from '#utils/array/reducers'
import { ascending } from '#utils/array/sorting'

type Point = { x: number; y: number; value: number }

export const getLowPoints = (heightmap: number[][]): Point[] => {
    const getNeighbours = getNeighboursOf(heightmap)

    return heightmap.reduce<Point[]>((lowPoints, columns, y) => {
        const rowLowPoints = columns.reduce<Point[]>((lp, value, x) => {
            const neighbours = getNeighbours(x, y)
            if (neighbours.some((point) => point.value <= value)) {
                return lp
            } else {
                return lp.concat({ x, y, value })
            }
        }, [])

        return lowPoints.concat(rowLowPoints)
    }, [])
}

export const sumRiskLevels = (lowpoints: Point[]) =>
    lowpoints.map((point) => point.value + 1).reduce(sum)

export const getBasins = (heightmap: number[][]): Point[][] => {
    const lowPoints = getLowPoints(heightmap)
    return lowPoints.map((point) => getBasin([point], heightmap))
}

const getBasin = (points: Point[], heightmap: number[][]): Point[] => {
    const neighbours = points.flatMap((point) =>
        getNeighboursOf(heightmap)(point.x, point.y)
    )

    const externalNeighbours = neighbours.filter((point) =>
        points.every((otherPoint) => !arePointsEqual(point, otherPoint))
    )

    if (externalNeighbours.some((point) => point.value < 9)) {
        const basin = points.concat(
            externalNeighbours.filter((point) => point.value < 9)
        )
        return getBasin(basin, heightmap)
    }
    return points.filter(uniqueBy(arePointsEqual))
}

const arePointsEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y

export const productBiggestBasins = (basins: Point[][]) =>
    basins
        .map((basin) => basin.length)
        .sort(ascending)
        .slice(-3)
        .reduce(product, 1)

const getNeighboursOf =
    (heightmap: number[][]) =>
    (x: number, y: number): Point[] => {
        return [
            { x, y: y - 1, value: heightmap?.[y - 1]?.[x] ?? -1 },
            { x, y: y + 1, value: heightmap?.[y + 1]?.[x] ?? -1 },
            { x: x - 1, y, value: heightmap?.[y]?.[x - 1] ?? -1 },
            { x: x + 1, y, value: heightmap?.[y]?.[x + 1] ?? -1 },
        ].filter((point) => point.value >= 0)
    }
