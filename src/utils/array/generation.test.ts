import { getIncrementalArray } from './generation';

describe('Utils - Array', () => {
    describe('getIncrementalArray', () => {
        test('Creates an array properly', () => {
            expect(getIncrementalArray(5)).toEqual([0, 1, 2, 3, 4]);
        });

        test('Creates an array properly from start index', () => {
            expect(getIncrementalArray(5, 5)).toEqual([5, 6, 7, 8, 9]);
        });
    });
});
