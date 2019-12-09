import { Input } from './input';
import { Solution } from '#models/solution';

export const DayThree = (): Solution => {
    let wires = Input.split('\n').map(wire => wire.split(','));

    const partOne = solvePartOne(wires);
    const partTwo = solvePartTwo(wires);

    return {
        partOne,
        partTwo,
    };
};

export const solvePartTwo = (wires: string[][]): number => {
    const [wire1Sections, wire2Sections] = wires.map(getWireSections);

    const wire1Intersections = wire1Sections.map(section => {
        const linesThatIntersect = wire2Sections.filter(targetSection =>
            GetIntersection(section, targetSection)
        );

        if (linesThatIntersect.length === 0) return undefined;

        return linesThatIntersect.map(line => [section, line]);
    });

    const filtered = wire1Intersections.filter(
        line => line !== undefined
    ) as Line[][][];

    const flat = filtered.flat();

    let minDistance = Infinity;

    for (const [iwire1, iwire2] of flat) {
        const intersectionPoint = GetIntersection(iwire1, iwire2) as Point;
        const firstLength = getWireLengthToIntersection(
            wire1Sections,
            iwire1,
            intersectionPoint
        );
        const secondLength = getWireLengthToIntersection(
            wire2Sections,
            iwire2,
            intersectionPoint
        );

        const totalLength = firstLength + secondLength;

        if (totalLength < minDistance) minDistance = totalLength;
    }

    return minDistance;
};

const getWireLengthToIntersection = (
    wire1Sections: Line[],
    iWire: Line,
    intersectPoint: Point
) => {
    const index = wire1Sections.findIndex(section => section === iWire);
    const sectionsBeforeIntersection = wire1Sections.slice(0, index);
    const l = sectionsBeforeIntersection
        .map(line => line.length)
        .reduce((total, value) => total + value, 0);
    const m = getManhattanDistance(iWire.start, intersectPoint);
    return l + m;
};

export const solvePartOne = (wires: string[][]): number => {
    // convert inputs into filled array of points
    const [wire1Sections, wire2Sections] = wires.map(getWireSections);

    // filter arrays against each other  to find where the cross
    const intersectionPoints = wire1Sections.map(section => {
        const crossPoints = wire2Sections
            .map(targetSection => {
                const intersectionPoint = GetIntersection(
                    section,
                    targetSection
                );
                if (
                    intersectionPoint &&
                    intersectionPoint.x === 0 &&
                    intersectionPoint.y === 0
                ) {
                    return undefined;
                }
                return intersectionPoint;
            })
            .filter(point => point !== undefined) as Point[];
        if (crossPoints.length === 0) return undefined;
        const crossedPoint = crossPoints.reduce((closest, point) =>
            getManhattanDistance(point) < getManhattanDistance(closest)
                ? point
                : closest
        );

        return crossedPoint;
    });

    const filtered = intersectionPoints.filter(
        item => item !== undefined
    ) as Point[];

    // find one with shortest manhattan distance
    const distances = filtered.map(point => getManhattanDistance(point));

    return Math.min(...distances);
};

export const getWireSections = (wire: string[]): Line[] => {
    const corners = wire.reduce(
        (pointList, instruction) => {
            const [instructionDirection, stringDistance] = splitStringAtIndex(
                instruction,
                1
            );
            const instructionDistance = Number(stringDistance);

            return pointList.concat(
                instructionToPoint(
                    instructionDirection as Direction,
                    instructionDistance,
                    pointList[pointList.length - 1]
                )
            );
        },
        [{ x: 0, y: 0 }] as Point[]
    );

    return corners.map((corner, index, array) => {
        const previousCorner = index === 0 ? { x: 0, y: 0 } : array[index - 1];
        return new Line(previousCorner, corner);
    });
};

type Direction = 'U' | 'D' | 'L' | 'R';

export const instructionToPoint = (
    direction: Direction,
    distance: number,
    previousPoint: Point
): Point => {
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

export class Line {
    constructor(public start: Point, public end: Point) {
        this.length = getManhattanDistance(start, end);
    }
    length: number;
}

export const GetIntersection = (a: Line, b: Line): Point | undefined => {
    const denominator =
        (b.end.y - b.start.y) * (a.end.x - a.start.x) -
        (b.end.x - b.start.x) * (a.end.y - a.start.y);
    const numeratorA =
        (b.end.x - b.start.x) * (a.start.y - b.start.y) -
        (b.end.y - b.start.y) * (a.start.x - b.start.x);
    const numeratorB =
        (a.end.x - a.start.x) * (a.start.y - b.start.y) -
        (a.end.y - a.start.y) * (a.start.x - b.start.x);

    if (denominator === 0) return undefined;

    const uA = numeratorA / denominator;
    const uB = numeratorB / denominator;

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return {
            x: a.start.x + uA * (a.end.x - a.start.x),
            y: a.start.y + uA * (a.end.y - a.start.y),
        } as Point;
    }

    return undefined;
};
