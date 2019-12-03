import {
    solvePartOne,
    getManhattanDistance,
    splitStringAtIndex,
    instructionToPoint,
    Point,
    Line,
    GetIntersection,
} from './day-3';

describe('2019 - Day Three', () => {
    describe('Find Closest Intersection', () => {
        test('Example 1', () => {
            const input = [
                ['R8', 'U5', 'L5', 'D3'],
                ['U7', 'R6', 'D4', 'L4'],
            ];

            expect(solvePartOne(input)).toBe(6);
        });

        test('Example 2', () => {
            const input = [
                ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
                ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
            ];

            expect(solvePartOne(input)).toBe(159);
        });

        test('Example 3', () => {
            const input = [
                [
                    'R98',
                    'U47',
                    'R26',
                    'D63',
                    'R33',
                    'U87',
                    'L62',
                    'D20',
                    'R33',
                    'U53',
                    'R51',
                ],
                [
                    'U98',
                    'R91',
                    'D20',
                    'R16',
                    'D67',
                    'R40',
                    'U7',
                    'R15',
                    'U6',
                    'R7',
                ],
            ];

            expect(solvePartOne(input)).toBe(135);
        });
    });

    describe('Get Manhattan Distance', () => {
        test('Example 1', () => {
            expect(getManhattanDistance({ x: 3, y: 3 })).toBe(6);
        });
    });

    test('string split', () => {
        const result = splitStringAtIndex('Hello', 3);
        expect(result).toEqual(['Hel', 'lo']);
    });

    describe('Instruction To Point', () => {
        test('Example 1', () => {
            expect(instructionToPoint('R', 30, { x: 0, y: 0 })).toEqual({
                x: 30,
                y: 0,
            });
        });

        test('Example 2', () => {
            expect(instructionToPoint('U', 23, { x: 36, y: -23 })).toEqual({
                x: 36,
                y: 0,
            });
        });
    });

    describe('GetIntersection', () => {
        test('Example 1', () => {
            const a = new Line({ x: -2, y: 0 }, { x: 3, y: 0 });
            const b = new Line({ x: 1, y: 2 }, { x: 1, y: -3 });

            const result = GetIntersection(a, b);
            expect(result).toEqual({ x: 1, y: 0 });
        });
        test('Example 2', () => {
            const a = new Line({ x: -5, y: 5 }, { x: 3, y: -5 });
            const b = new Line({ x: 2, y: 2 }, { x: -1, y: -4 });

            const result = GetIntersection(a, b) as Point;
            expect(result.x).toBeCloseTo(0.23);
            expect(result.y).toBeCloseTo(-1.54);
        });
    });
});
