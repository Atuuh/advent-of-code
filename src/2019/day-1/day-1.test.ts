import { DayOne } from "./day-1";

describe("2019 - Day One", () => {
    describe("Fuel calculations", () => {
        test("Example 1", () => {
            const result = DayOne.calculateFuel(12);
            expect(result).toEqual(2);
        });

        test("Example 2", () => {
            const result = DayOne.calculateFuel(14);
            expect(result).toEqual(2);
        });

        test("Example 3", () => {
            const result = DayOne.calculateFuel(1969);
            expect(result).toEqual(654);
        });

        test("Example 4", () => {
            const result = DayOne.calculateFuel(100756);
            expect(result).toEqual(33583);
        });
    });

    describe("Inclusive Fuel Calculations", () => {
        test("Example 1", () => {
            const result = DayOne.calculateInclusiveFuel(14);
            expect(result).toEqual(2);
        });

        test("Example 2", () => {
            const result = DayOne.calculateInclusiveFuel(1969);
            expect(result).toEqual(966);
        });

        test("Example 3", () => {
            const result = DayOne.calculateInclusiveFuel(100756);
            expect(result).toEqual(50346);
        });

        test("Example 3", () => {
            const result = DayOne.calculateInclusiveFuel(100756);
            expect(result).toEqual(50346);
        });
    });
});
