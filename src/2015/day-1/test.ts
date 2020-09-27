import { getFinalFloor, getFirstTimeAtBasement } from '.';

describe('calculateTargetFloor', () => {
    test('example 1a', () => {
        const input = '(())';

        expect(getFinalFloor(input)).toBe(0);
    });

    test('example 1b', () => {
        const input = '()()';

        expect(getFinalFloor(input)).toBe(0);
    });

    test('example 2a', () => {
        const input = '(((';

        expect(getFinalFloor(input)).toBe(3);
    });

    test('example 2b', () => {
        const input = '(()(()(';

        expect(getFinalFloor(input)).toBe(3);
    });

    test('example 3', () => {
        const input = '))(((((';

        expect(getFinalFloor(input)).toBe(3);
    });

    test('example 4a', () => {
        const input = '())';

        expect(getFinalFloor(input)).toBe(-1);
    });

    test('example 4b', () => {
        const input = '))(';

        expect(getFinalFloor(input)).toBe(-1);
    });

    test('example 5a', () => {
        const input = ')))';

        expect(getFinalFloor(input)).toBe(-3);
    });

    test('example 5b', () => {
        const input = ')())())';

        expect(getFinalFloor(input)).toBe(-3);
    });
});

describe('getFirstTimeAtBasement', () => {
    test('example 1', () => {
        const input = ')';

        expect(getFirstTimeAtBasement(input)).toBe(1);
    });

    test('example 2', () => {
        const input = '()())';

        expect(getFirstTimeAtBasement(input)).toBe(5);
    });
});
