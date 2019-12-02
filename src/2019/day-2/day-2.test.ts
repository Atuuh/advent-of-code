import { DayTwo } from './day-2';

describe('2019 - Day Two', () => {
    describe('Executed program', () => {
        test('Example 1', () => {
            const input = [1, 0, 0, 0, 99];
            const result = DayTwo.runProgram(input);
            expect(result).toEqual([2, 0, 0, 0, 99]);
        });

        test('Example 2', () => {
            const input = [2, 3, 0, 3, 99];
            const result = DayTwo.runProgram(input);
            expect(result).toEqual([2, 3, 0, 6, 99]);
        });

        test('Example 3', () => {
            const input = [2, 4, 4, 5, 99, 0];
            const result = DayTwo.runProgram(input);
            expect(result).toEqual([2, 4, 4, 5, 99, 9801]);
        });

        test('Example 4', () => {
            const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
            const result = DayTwo.runProgram(input);
            expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
        });
    });
});
