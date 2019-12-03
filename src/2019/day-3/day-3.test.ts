import { findClosestIntersection, getManhattanDistance } from "./day-3";

describe("2019 - Day Three", () => {
    describe("Find Closest Intersection", () => {
        test("Example 1", () => {
            const input = [
                ["R8", "U5", "L5", "D3"],
                ["U7", "R6", "D4", "L4"]
            ];

            expect(findClosestIntersection(input)).toBe(6);
        });

        test("Example 2", () => {
            const input = [
                ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
                ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
            ];

            expect(findClosestIntersection(input)).toBe(159);
        });

        test("Example 3", () => {
            const input = [
                [
                    "R98",
                    "U47",
                    "R26",
                    "D63",
                    "R33",
                    "U87",
                    "L62",
                    "D20",
                    "R33",
                    "U53",
                    "R51"
                ],
                [
                    "U98",
                    "R91",
                    "D20",
                    "R16",
                    "D67",
                    "R40",
                    "U7",
                    "R15",
                    "U6",
                    "R7"
                ]
            ];

            expect(findClosestIntersection(input)).toBe(135);
        });
    });
    describe("Get Manhattan Distance", () => {
        test("Example 1", () => {
            expect(getManhattanDistance({ x: 3, y: 3 })).toBe(6);
        });
    });
});
