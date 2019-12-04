import { sumArray, getIncrementalArray } from './array';

describe('Utils - Array', () => {
    describe('sumArray', () => {
        test('Sums an array correctly', () => {
            expect(sumArray([1, 2, 3, 4, 5])).toEqual(15);
        });

        test('Returns 0 for an empty array', () => {
            expect(sumArray([])).toEqual(0);
        });
    });

    describe('getIncrementalArray', () => {
        test('Creates an array properly', () => {
            expect(getIncrementalArray(5)).toEqual([0, 1, 2, 3, 4]);
        });

        test('Creates an array properly from start index', () => {
            expect(getIncrementalArray(5, 5)).toEqual([5, 6, 7, 8, 9]);
        });
    });
});
