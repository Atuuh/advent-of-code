import { IntcodeComputer, ExecutedProgram } from './intcode-computer';

describe('2019 - Shared', () => {
    describe('Intcode Computer', () => {
        describe('getInstruction', () => {
            test('Example 1', () => {
                const ic = new IntcodeComputer([1002]);
                const expected = { opCode: 2, parameterModes: [0, 1, 0] };
                expect(ic.getNextInstruction()).toEqual(expected);
            });
        });

        describe('equal', () => {
            describe('position mode', () => {
                test('true', () => {
                    const ic = new IntcodeComputer([
                        3,
                        9,
                        8,
                        9,
                        10,
                        9,
                        4,
                        9,
                        99,
                        -1,
                        8,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(8);
                    const result = runner.next().value;
                    expect(result).toEqual(1);
                });
                test('false', () => {
                    const ic = new IntcodeComputer([
                        3,
                        9,
                        8,
                        9,
                        10,
                        9,
                        4,
                        9,
                        99,
                        -1,
                        8,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(7);
                    const result = runner.next().value;
                    expect(result).toEqual(0);
                });
            });
            describe('position mode', () => {
                test('true', () => {
                    const ic = new IntcodeComputer([
                        3,
                        3,
                        1108,
                        -1,
                        8,
                        3,
                        4,
                        3,
                        99,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(8);
                    const result = runner.next().value;
                    expect(result).toEqual(1);
                });
                test('false', () => {
                    const ic = new IntcodeComputer([
                        3,
                        3,
                        1108,
                        -1,
                        8,
                        3,
                        4,
                        3,
                        99,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(7);
                    const result = runner.next().value;
                    expect(result).toEqual(0);
                });
            });
        });

        describe('less than', () => {
            describe('position mode', () => {
                test('true', () => {
                    const ic = new IntcodeComputer([
                        3,
                        9,
                        7,
                        9,
                        10,
                        9,
                        4,
                        9,
                        99,
                        -1,
                        8,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(7);
                    const result = runner.next().value;
                    expect(result).toEqual(1);
                });
                test('false', () => {
                    const ic = new IntcodeComputer([
                        3,
                        9,
                        7,
                        9,
                        10,
                        9,
                        4,
                        9,
                        99,
                        -1,
                        8,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(8);
                    const result = runner.next().value;
                    expect(result).toEqual(0);
                });
            });
            describe('immediate mode', () => {
                test('true', () => {
                    const ic = new IntcodeComputer([
                        3,
                        3,
                        1107,
                        -1,
                        8,
                        3,
                        4,
                        3,
                        99,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(7);
                    const result = runner.next().value;
                    expect(result).toEqual(1);
                });

                test('false', () => {
                    const ic = new IntcodeComputer([
                        3,
                        3,
                        1107,
                        -1,
                        8,
                        3,
                        4,
                        3,
                        99,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(8);
                    const result = runner.next().value;
                    expect(result).toEqual(0);
                });
            });
        });

        describe('true jump', () => {
            describe('position mode', () => {
                test('non zero', () => {
                    const ic = new IntcodeComputer([
                        3,
                        12,
                        6,
                        12,
                        15,
                        1,
                        13,
                        14,
                        13,
                        4,
                        13,
                        99,
                        -1,
                        0,
                        1,
                        9,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(1);
                    const result = runner.next().value;
                    expect(result).toEqual(1);
                });
                test('zero', () => {
                    const ic = new IntcodeComputer([
                        3,
                        12,
                        6,
                        12,
                        15,
                        1,
                        13,
                        14,
                        13,
                        4,
                        13,
                        99,
                        -1,
                        0,
                        1,
                        9,
                    ]);
                    const runner = ic.run();
                    runner.next();
                    runner.next(0);
                    const result = runner.next().value;
                    expect(result).toEqual(0);
                });
            });
        });

        describe('run', () => {
            const input = [
                3,
                21,
                1008,
                21,
                8,
                20,
                1005,
                20,
                22,
                107,
                8,
                21,
                20,
                1006,
                20,
                31,
                1106,
                0,
                36,
                98,
                0,
                0,
                1002,
                21,
                125,
                20,
                4,
                20,
                1105,
                1,
                46,
                104,
                999,
                1105,
                1,
                46,
                1101,
                1000,
                1,
                20,
                4,
                20,
                1105,
                1,
                46,
                98,
                99,
            ];
            test('Example 1', () => {
                const ic = new IntcodeComputer(input);
                const runner = ic.run();
                runner.next();
                runner.next(5);
                const result = runner.next().value;
                expect(result).toEqual(999);
            });
            test('Example 2', () => {
                const ic = new IntcodeComputer(input);
                const runner = ic.run();
                runner.next();
                runner.next(8);
                const result = runner.next().value;
                expect(result).toEqual(1000);
            });
            test('Example 3', () => {
                const ic = new IntcodeComputer(input);
                const runner = ic.run();
                runner.next();
                runner.next(15);
                const result = runner.next().value;
                expect(result).toEqual(1001);
            });
        });
    });
});
