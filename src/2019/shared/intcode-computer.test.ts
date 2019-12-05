import { IntcodeComputer, ExecutedProgram } from './intcode-computer';

describe('2019 - Intcode Computer', () => {
    describe('getInstruction', () => {
        test('Example 1', () => {
            const ic = new IntcodeComputer([]);
            const expected = { opCode: 2, parameterModes: [0, 1, 0] };
            expect(ic.getNextInstruction(1002)).toEqual(expected);
        });
    });

    describe('run', () => {
        test('add', () => {
            const ic = new IntcodeComputer([10001, 1, 1, 0, 99]);
            const result = ic.run();
            const expected: ExecutedProgram = {
                output: [],
                program: [10001, 1, 1, 2, 99],
            };
            expect(result).toEqual(expected);
        });

        test('multiply', () => {
            const ic = new IntcodeComputer([1002, 4, 3, 4, 33]);
            const result = ic.run();
            const expected: ExecutedProgram = {
                output: [],
                program: [1002, 4, 3, 4, 99],
            };
            expect(result).toEqual(expected);
        });

        test('set', () => {
            const ic = new IntcodeComputer([3, 0, 99]);
            const result = ic.run(50);
            const expected: ExecutedProgram = {
                output: [],
                program: [50, 0, 99],
            };
            expect(result).toEqual(expected);
        });
    });
});
