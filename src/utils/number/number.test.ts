import { isInRange } from './number';

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
});
