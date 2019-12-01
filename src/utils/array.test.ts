import { SumArray } from "./array";

describe("Utils - Array", () => {
    describe("SumArray", () => {
        test("Sums an array correctly", () => {
            expect(SumArray([1, 2, 3, 4, 5])).toEqual(15);
        });

        test("Returns 0 for an empty array", () => {
            expect(SumArray([])).toEqual(0);
        });
    });
});
