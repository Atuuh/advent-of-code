import { getPattern, getPhase, getPhaseWithOffset } from './day-15';
import { toArray } from '#utils/number';

describe('2019 - Day Fifteen', () => {
    describe('getPattern', () => {
        test('should return correct pattern for first iteration', () => {
            const expected = [1, 0, -1, 0, 1, 0, -1, 0];
            expect(getPattern(1, 8)).toEqual(expected);
        });

        test('should return correct pattern for third iteration', () => {
            const expected = [0, 0, 1, 1, 1, 0, 0, 0];
            expect(getPattern(3, 8)).toEqual(expected);
        });
    });

    describe('getPhase', () => {
        test('Example 1 - should get correct value after 1 phase', () => {
            expect(getPhase([1, 2, 3, 4, 5, 6, 7, 8], 1)).toEqual([
                4,
                8,
                2,
                2,
                6,
                1,
                5,
                8,
            ]);
        });

        test('Example 2 - should get correct value after 2 phases', () => {
            expect(getPhase([1, 2, 3, 4, 5, 6, 7, 8], 2)).toEqual([
                3,
                4,
                0,
                4,
                0,
                4,
                3,
                8,
            ]);
        });
    });

    describe('Main Examples', () => {
        test('Example 1 - should return first 8 digits correctly', () => {
            const input = '80871224585914546619083218645595';
            const result = getPhase(input.split('').map(Number), 100);

            expect(+result.slice(0, 8).join('')).toEqual(24176176);
        });

        test('Example 2 - should return first 8 digits correctly', () => {
            const input = '19617804207202209144916044189917';
            const result = getPhase(input.split('').map(Number), 100);

            expect(+result.slice(0, 8).join('')).toEqual(73745418);
        });

        test('Example 3 - should return first 8 digits correctly', () => {
            const input = '69317163492948606335995924319873';
            const result = getPhase(input.split('').map(Number), 100);

            expect(+result.slice(0, 8).join('')).toEqual(52432133);
        });
    });

    describe('Part Two Examples', () => {
        test('Example 1 - should return the expected result', () => {
            const input = '03036732577212944063491565474664'
                .split('')
                .map(Number);
            const result = getPhaseWithOffset(7, input, 100);

            expect(result).toEqual(84462026);
        });

        test('Example 2 - should return the expected result', () => {
            const input = '02935109699940807407585447034323'
                .split('')
                .map(Number);
            const result = getPhaseWithOffset(7, input, 100);

            expect(result).toEqual(78725270);
        });

        test('Example 3 - should return the expected result', () => {
            const input = '03081770884921959731165446850517'
                .split('')
                .map(Number);
            const result = getPhaseWithOffset(7, input, 100);

            expect(result).toEqual(53553731);
        });
    });
});
