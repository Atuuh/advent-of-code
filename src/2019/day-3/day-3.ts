import { Solution } from '#aoc/day';
import { Input } from './input';

export const DayThree = (): Solution => {
    const wires = Input.split('\n').map(wire => wire.split(','));

    const partOne = findClosestIntersection(wires);
    const partTwo = '';

    return {
        partOne,
        partTwo
    };
};

export const findClosestIntersection = (wires: string[][]): number => {
    // convert inputs into filled array of points
    const [wire1points, wire2points] = wires
        .map(getWirePoints)
        .map(wire => wire.filter(point => !(point.x === 0 && point.y === 0)));

    // filter arrays against each other  to find where the cross
    const intersectionPoints = wire1points.filter(point =>
        wire2points.some(
            comparePoint =>
                point.x === comparePoint.x && point.y === comparePoint.y
        )
    );

    // find one with shortest manhattan distance
    const distances = intersectionPoints.map(point =>
        getManhattanDistance(point)
    );

    return Math.min(...distances);
};

export const getWirePoints = (wire: string[]): Point[] => {
    const points = wire.reduce(
        (pointList, instruction) => {
            const [instructionDirection, stringDistance] = splitStringAtIndex(
                instruction,
                1
            );
            const instructionDistance = Number(stringDistance);

            return pointList.concat(
                instructionToPointList(
                    instructionDirection,
                    instructionDistance,
                    pointList[pointList.length - 1]
                )
            );
        },
        [{ x: 0, y: 0 }] as Point[]
    );

    return points;
};

export const instructionToPointList = (
    direction: string,
    distance: number,
    previousPoint: Point = { x: 0, y: 0 }
): Point[] => {
    if (distance === 0) return [];
    const result = { ...previousPoint };

    switch (direction) {
        case 'U':
            result.y += 1;
            break;
        case 'D':
            result.y -= 1;
            break;
        case 'L':
            result.x -= 1;
            break;
        case 'R':
            result.x += 1;
            break;
        default:
            break;
    }

    return [result, ...instructionToPointList(direction, distance - 1, result)];
};

export const instructionToPoint = (
    instruction: string,
    previousPoint: Point
): Point => {
    const [direction, stringDistance] = splitStringAtIndex(instruction, 1);
    const distance = Number(stringDistance);

    const result = { ...previousPoint };

    switch (direction) {
        case 'U':
            result.y += distance;
            break;
        case 'D':
            result.y -= distance;
            break;
        case 'L':
            result.x -= distance;
            break;
        case 'R':
            result.x += distance;
            break;
        default:
            break;
    }

    return result;
};

export const splitStringAtIndex = (input: string, index: number) => {
    return [input.slice(0, index), input.slice(index)];
};

export interface Point {
    x: number;
    y: number;
}

export const getManhattanDistance = (
    point: Point,
    origin: Point = { x: 0, y: 0 }
): number => {
    return Math.abs(origin.x - point.x) + Math.abs(origin.y - point.y);
};
