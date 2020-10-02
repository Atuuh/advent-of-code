import { getHousesDeliveredTo, getHousesWithRoboSanta } from '.';

describe('getHousesDeliveredTo', () => {
    test('example 1', () => {
        const input = '>';

        expect(getHousesDeliveredTo(input)).toBe(2);
    });

    test('example 2', () => {
        const input = '^>v<';

        expect(getHousesDeliveredTo(input)).toBe(4);
    });

    test('example 3', () => {
        const input = '^v^v^v^v^v';

        expect(getHousesDeliveredTo(input)).toBe(2);
    });
});

describe('getHousesWithRoboSanta', () => {
    test('example 1', () => {
        const input = '^v';

        expect(getHousesWithRoboSanta(input)).toBe(3);
    });

    test('example 2', () => {
        const input = '^>v<';

        expect(getHousesWithRoboSanta(input)).toBe(3);
    });

    test('example 3', () => {
        const input = '^v^v^v^v^v';

        expect(getHousesWithRoboSanta(input)).toBe(11);
    });
});
