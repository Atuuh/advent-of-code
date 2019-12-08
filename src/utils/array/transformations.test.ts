import { transpose, chunk } from './transformations';

describe('Utils - Array - Transformations', () => {
    describe('chunk', () => {
        test('correctly chunks an array into defined sizes', () => {
            const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]];
            expect(chunk(input, 3)).toEqual(expected);
        });
    });

    describe('transpose', () => {
        test('successfully transposes a 2d array', () => {
            const input = [
                [0, 1, 2],
                [0, 1, 2],
                [0, 1, 2],
            ];
            const expected = [
                [0, 0, 0],
                [1, 1, 1],
                [2, 2, 2],
            ];
            expect(transpose(input)).toEqual(expected);
        });

        test('successfully transposes a non symmetrical 2d array', () => {
            const input = [
                [1, 2, 3, 4, 5, 6],
                [6, 5, 4, 3, 2, 1],
            ];
            const expected = [
                [1, 6],
                [2, 5],
                [3, 4],
                [4, 3],
                [5, 2],
                [6, 1],
            ];
            expect(transpose(input)).toEqual(expected);
        });
    });
});
