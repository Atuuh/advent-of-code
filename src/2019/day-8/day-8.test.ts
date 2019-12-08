import { decodeImage, DayEight } from './day-8';

describe('2019 - Day Eight', () => {
    describe('decodeImage', () => {
        test('Example 1', () => {
            const result = decodeImage(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
                3,
                2
            );
            expect(result).toEqual([
                [1, 2, 3, 4, 5, 6],
                [7, 8, 9, 0, 1, 2],
            ]);
        });
    });
    describe('Final Results', () => {
        const result = DayEight();
        expect(result.partOne).toBe(1620);
    });
});
