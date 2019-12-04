import { SumArray, IncrementalArray } from './array';

describe('Utils - Array', () => {
    describe('SumArray', () => {
        test('Sums an array correctly', () => {
            expect(SumArray([1, 2, 3, 4, 5])).toEqual(15);
        });

        test('Returns 0 for an empty array', () => {
            expect(SumArray([])).toEqual(0);
        });
    });

    describe('IncrementalArray', () => {
        test('Creates an array properly', () => {
            expect(IncrementalArray(5)).toEqual([0, 1, 2, 3, 4]);
        });

        test('Creates an array properly from start index', () => {
            expect(IncrementalArray(5, 5)).toEqual([5, 6, 7, 8, 9]);
        });
    });
});
