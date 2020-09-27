import {
    parseInput,
    Reaction,
    getOreRequired,
    Chemical,
    getRequiredChemicals,
} from './day-14';

describe('2019 - Day Fourteen', () => {
    describe('parseInput', () => {
        test('should correctly parse 1 input to 1 output', () => {
            const expected: Reaction = {
                InputChemicals: [{ name: 'ORE', amount: 10 }],
                OutputChemical: { name: 'A', amount: 10 },
            };
            expect(parseInput('10 ORE => 10 A')).toEqual(expected);
        });

        test('should correctly parse multiple inputs to 1 output', () => {
            const expected: Reaction = {
                InputChemicals: [
                    { name: 'A', amount: 7 },
                    { name: 'E', amount: 1 },
                ],
                OutputChemical: { name: 'FUEL', amount: 1 },
            };
            expect(parseInput('7 A, 1 E => 1 FUEL')).toEqual(expected);
        });
    });

    describe('getRequiredChemicals', () => {
        test('should get correct amount of input chemicals for multiple reactions', () => {
            const chemical: Chemical = {
                name: 'C',
                amount: 7,
            };
            const reaction: Reaction = {
                OutputChemical: { name: 'C', amount: 3 },
                InputChemicals: [
                    { name: 'A', amount: 1 },
                    { name: 'B', amount: 6 },
                ],
            };
            const expected: Chemical[] = [
                { name: 'A', amount: 3 },
                { name: 'B', amount: 18 },
            ];
            expect(getRequiredChemicals([chemical], [reaction])).toEqual(
                expected
            );
        });
    });

    describe.skip('getOreRequired', () => {
        test('Example 1', () => {
            const reactions = `10 ORE => 10 A
            1 ORE => 1 B
            7 A, 1 B => 1 C
            7 A, 1 C => 1 D
            7 A, 1 D => 1 E
            7 A, 1 E => 1 FUEL`
                .split('\n')
                .map(parseInput);
            expect(getOreRequired(reactions)).toBe(31);
        });
    });
});
