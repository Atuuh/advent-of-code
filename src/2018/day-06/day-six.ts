import { Advent } from '../advent'
import { input } from './input'

export class DaySix extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Six'
        this.Input = input

        const Locations = this.Input.split('\n').map((value) => {
            const coords = value.split(',').map(Number)
            return new Point(coords[0], coords[1], true)
        })
        const gridBounds = this.getGridBounds(Locations)
        const Grid: GridPoint[] = []

        for (let i = gridBounds.minX; i <= gridBounds.maxX; i++) {
            for (let j = gridBounds.minY; j <= gridBounds.maxY; j++) {
                Grid.push(new GridPoint(i, j))
            }
        }

        for (const point of Locations) {
            for (const gridPoint of Grid) {
                gridPoint.Distances[point.id] = gridPoint.GetDistance(point)
            }
        }

        for (const point of Grid) {
            point.SetIdByDistance()
        }

        const edges = Grid.filter(
            (point) =>
                point.x === gridBounds.minX ||
                point.x === gridBounds.maxX ||
                point.y === gridBounds.minY ||
                point.y === gridBounds.maxY
        )
            .map((point) => point.id)
            .reduce((array, next) => {
                if (next !== null && !array.includes(next)) {
                    return [...array, next]
                }
                return array
            }, new Array<number>())

        for (const point of Grid) {
            if (edges.includes(point.id)) {
                point.id = null
            }
        }

        const sizes = Grid.reduce((total, next) => {
            total[next.id]++
            return total
        }, new Array<number>(Locations.length).fill(0))

        this.PartA = Math.max(...sizes).toString()

        this.PartB = Grid.filter(
            (point) => point.TotalDistance < 10000
        ).length.toString()
    }

    getGridBounds(points: Point[]): GridBounds {
        const gridMaxX = points.reduce((max, next) => {
            return Math.max(max, next.x)
        }, 0)
        const gridMinX = points.reduce((min, next) => {
            return Math.min(min, next.x)
        }, gridMaxX)
        const gridMaxY = points.reduce((max, next) => {
            return Math.max(max, next.y)
        }, 0)
        const gridMinY = points.reduce((min, next) => {
            return Math.min(min, next.y)
        }, gridMaxY)
        return {
            minX: gridMinX,
            maxX: gridMaxX + 1,
            minY: gridMinY,
            maxY: gridMaxY + 1,
        } as GridBounds
    }
}

interface GridBounds {
    maxX: number
    maxY: number
    minX: number
    minY: number
}

class Point {
    x: number
    y: number
    id: number
    static _id = 0
    constructor(x: number, y: number, setId = false) {
        this.x = x
        this.y = y
        this.id = setId ? Point._id++ : 0
    }
    public Equals(right: Point): boolean {
        return this.x === right.x && this.y === right.y
    }
    public GetDistance(right: Point) {
        return Math.abs(this.x - right.x) + Math.abs(this.y - right.y)
    }
}

class GridPoint extends Point {
    Distances: number[] = []
    SetIdByDistance() {
        this.id = this.GetClosestDistance()
    }

    GetClosestDistance(): number | null {
        const minDistance = Math.min(...this.Distances)
        return this.Distances.filter((x) => x === minDistance).length > 1
            ? null
            : this.Distances.findIndex((x) => x === minDistance)
    }

    get TotalDistance(): number {
        return this.Distances.map(Number).reduce((total, next) => total + next)
    }
}
