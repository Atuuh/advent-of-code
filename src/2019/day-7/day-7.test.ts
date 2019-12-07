import { getThrusterSignal, getArrayPermutations } from './day-7';

describe('2019 - Day Seven', () => {
    describe('getThrusterSignal', () => {
        test('Example 1', () => {
            const result = getThrusterSignal(
                [
                    3,
                    15,
                    3,
                    16,
                    1002,
                    16,
                    10,
                    16,
                    1,
                    16,
                    15,
                    15,
                    4,
                    15,
                    99,
                    0,
                    0,
                ],
                [4, 3, 2, 1, 0]
            );
            expect(result).toBe(43210);
        });
        test('Example 2', () => {
            const result = getThrusterSignal(
                [
                    3,
                    23,
                    3,
                    24,
                    1002,
                    24,
                    10,
                    24,
                    1002,
                    23,
                    -1,
                    23,
                    101,
                    5,
                    23,
                    23,
                    1,
                    24,
                    23,
                    23,
                    4,
                    23,
                    99,
                    0,
                    0,
                ],
                [0, 1, 2, 3, 4]
            );
            expect(result).toBe(54321);
        });
        test('Example 3', () => {
            const result = getThrusterSignal(
                [
                    3,
                    31,
                    3,
                    32,
                    1002,
                    32,
                    10,
                    32,
                    1001,
                    31,
                    -2,
                    31,
                    1007,
                    31,
                    0,
                    33,
                    1002,
                    33,
                    7,
                    33,
                    1,
                    33,
                    31,
                    31,
                    1,
                    32,
                    31,
                    31,
                    4,
                    31,
                    99,
                    0,
                    0,
                    0,
                ],
                [1, 0, 4, 3, 2]
            );
            expect(result).toBe(65210);
        });
        test('getArrayCombinations', () => {
            const input = [
                [0, 1, 2],
                [true, false],
                ['a', 'b', 'c'],
            ];
            expect(getArrayPermutations(...input).length).toBe(18);
        });
    });
});
