import {
    isValidPassword,
    isValidExtraCriteria,
    getChainLengths,
} from './day-4';

describe('2019 - Day Four', () => {
    describe('Is Valid Password', () => {
        test('Example 1', () => {
            expect(isValidPassword(111111, 0, Infinity)).toBe(true);
        });
        test('Example 2', () => {
            expect(isValidPassword(223450, 0, Infinity)).toBe(false);
        });
        test('Example 3', () => {
            expect(isValidPassword(123789, 0, Infinity)).toBe(false);
        });
    });

    describe('Extra criteria', () => {
        test('Example 1', () => {
            expect(isValidExtraCriteria(112233, 0, Infinity)).toBe(true);
        });
        test('Example 2', () => {
            expect(isValidExtraCriteria(123444, 0, Infinity)).toBe(false);
        });
        test('Example 3', () => {
            expect(isValidExtraCriteria(111122, 0, Infinity)).toBe(true);
        });
    });

    describe('Get chain lengths', () => {
        test('Example 1', () => {
            expect(getChainLengths(123434)).toEqual([1, 1, 1, 1, 1, 1]);
        });

        test('Example 1', () => {
            expect(getChainLengths(112233)).toEqual([2, 2, 2]);
        });
    });
});
