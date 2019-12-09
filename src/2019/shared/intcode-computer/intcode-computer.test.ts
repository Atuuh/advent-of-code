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
                    const result = runner.next(8).value;
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
                    const result = runner.next(7).value;
                    expect(result).toEqual(0);
                });
            });
            describe('immediate mode', () => {
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
                    const result = runner.next(8).value;
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
                    const result = runner.next(7).value;
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
                    const result = runner.next(7).value;
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
                    const result = runner.next(8).value;
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
                    const result = runner.next(7).value;
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
                    const result = runner.next(8).value;
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
                    const result = runner.next(1).value;
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
                    const result = runner.next(0).value;
                    expect(result).toEqual(0);
                });
            });
        });

        describe('Da', () => {
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
                const result = runner.next(5).value;
                expect(result).toEqual(999);
            });
            test('Example 2', () => {
                const ic = new IntcodeComputer(input);
                const runner = ic.run();
                runner.next();
                const result = runner.next(8).value;
                expect(result).toEqual(1000);
            });
            test('Example 3', () => {
                const ic = new IntcodeComputer(input);
                const runner = ic.run();
                runner.next();
                const result = runner.next(15).value;
                expect(result).toEqual(1001);
            });
        });

        describe('Day 9 Examples', () => {
            test('Example 1', () => {
                const program = [
                    109,
                    1,
                    204,
                    -1,
                    1001,
                    100,
                    1,
                    100,
                    1008,
                    100,
                    16,
                    101,
                    1006,
                    101,
                    0,
                    99,
                ];
                const ic = new IntcodeComputer(program);
                const runner = ic.run();
                let state = runner.next();
                let output = [state.value];
                while (!state.done) {
                    state = runner.next();
                    if (!state.done) output = output.concat(state.value);
                }
                expect(output).toEqual(program);
            });

            test('Example 2', () => {
                const program = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];
                const runner = new IntcodeComputer(program).run();
                const result = runner.next().value as number;
                expect(result.toString().length).toBe(16);
            });

            test('Example 3', () => {
                const program = [104, 1125899906842624, 99];
                const runner = new IntcodeComputer(program).run();
                const result = runner.next().value;
                expect(result).toBe(program[1]);
            });
        });
    });
});
