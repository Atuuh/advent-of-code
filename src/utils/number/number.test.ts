import {
    isInRange,
    getPrimeDecomposition,
    lowestCommonMultiple,
    numberAt,
} from './number';

describe('Utils - Number', () => {
    describe('isInRange', () => {
        test('number in range', () => {
            expect(isInRange(5, 0, 10)).toBe(true);
        });

        test('number in range exclusive start boundary', () => {
            expect(isInRange(0, 0, 10, { inclusiveStart: false })).toBe(false);
        });

        test('number in range inclusive start boundary', () => {
            expect(isInRange(0, 0, 10, { inclusiveStart: true })).toBe(true);
        });

        test('number in range exclusive end boundary', () => {
            expect(isInRange(10, 0, 10, { inclusiveEnd: false })).toBe(false);
        });

        test('number in range inclusive end boundary', () => {
            expect(isInRange(10, 0, 10, { inclusiveEnd: true })).toBe(true);
        });

        test('number below range', () => {
            expect(isInRange(-5, 0, 10)).toBe(false);
        });

        test('number above range', () => {
            expect(isInRange(15, 0, 10)).toBe(false);
        });
    });

    describe('getPrimeDecomposition', () => {
        test('should correctly return prime factors of valid number', () => {
            expect(getPrimeDecomposition(30)).toEqual([2, 3, 5]);
        });

        test('should return empty array for number less than 2', () => {
            expect(getPrimeDecomposition(1)).toEqual([]);
        });

        test('should return [3] for value=3', () => {
            expect(getPrimeDecomposition(3)).toEqual([3]);
        });

        test('should return [2,2,2,2,5] for value=80', () => {
            expect(getPrimeDecomposition(80)).toEqual([2, 2, 2, 2, 5]);
        });
    });

    describe('lowestCommonMultiple', () => {
        test('should return correct value for two valid inputs', () => {
            expect(lowestCommonMultiple([30, 40])).toBe(120);
        });

        test('should return correct value for three valid inputs', () => {
            expect(lowestCommonMultiple([3, 9, 21])).toBe(63);
        });

        test('should return correct value for five valid inputs', () => {
            expect(lowestCommonMultiple([1512, 9823, 122, 94, 156])).toBe(
                11777934168
            );
        });
    });

    describe('numberAt', () => {
        test('should return correct number at a position in a number', () => {
            expect(numberAt(1537, 0)).toBe(7);
            expect(numberAt(1537, 1)).toBe(3);
            expect(numberAt(1537, 2)).toBe(5);
            expect(numberAt(1537, 3)).toBe(1);
        });
    });
});
