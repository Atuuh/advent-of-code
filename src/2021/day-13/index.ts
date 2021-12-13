import { uniqueBy } from '#utils/array'

export type Dot = [x: number, y: number]
export type Fold = {
    direction: 'x' | 'y'
    point: number
}

export const foldAlong = (dots: Dot[], { direction, point }: Fold) => {
    if (direction === 'y') {
        return dots
            .map<Dot>(([x, y]) =>
                y > point ? [x, point - (y - point)] : [x, y]
            )
            .filter(uniqueBy(areDotsEqual))
    } else {
        return dots
            .map<Dot>(([x, y]) =>
                x > point ? [point - (x - point), y] : [x, y]
            )
            .filter(uniqueBy(areDotsEqual))
    }
}

const areDotsEqual = (a: Dot, b: Dot) => a[0] === b[0] && a[1] === b[1]
