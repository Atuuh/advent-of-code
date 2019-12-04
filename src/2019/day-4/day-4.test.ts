import { isValidPassword } from './day-4';

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
});
