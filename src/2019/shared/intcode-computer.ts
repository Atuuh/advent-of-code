export class IntcodeComputer {
    constructor(
        private readonly program: number[],
        options?: { noun: number; verb: number }
    ) {
        if (options)
            this.program = this.initialiseProgram(options.noun, options.verb);
    }

    initialiseProgram(noun: number, verb: number): number[] {
        const array = this.program.slice();
        array[1] = noun;
        array[2] = verb;
        return array;
    }

    getInstruction(instructionCode: number) {
        const asArray = instructionCode
            .toString()
            .padStart(5, '0')
            .split('')
            .map(Number);

        const opCode = Number(
            asArray
                .slice(-2)
                .map(item => item.toString())
                .join('')
        ) as Instruction;

        const parameterModes = asArray
            .slice(0, -2)
            .reverse() as ParameterMode[];

        return {
            opCode,
            parameterModes,
        };
    }

    run(input: number = 0): ExecutedProgram {
        const program = this.program.slice();
        const output: number[] = [];

        let index = 0;

        while (true) {
            const { opCode, parameterModes } = this.getInstruction(
                program[index]
            );
            let result;
            switch (opCode) {
                case Instruction.Halt:
                    return { program, output };
                case Instruction.Add:
                    result = this.doAddition(program, index, parameterModes);

                    program[result.targetIndex] = result.value;
                    index += result.moveIndex;
                    break;
                case Instruction.Multiply:
                    result = this.doMultiplication(
                        program,
                        index,
                        parameterModes
                    );

                    program[result.targetIndex] = result.value;
                    index += result.moveIndex;
                    break;
                case Instruction.Set:
                    program[program[index + 1]] = input;
                    index += 2;
                    break;
                case Instruction.Output:
                    output.push(program[program[index + 1]]);
                    index += 2;
                    break;
                case Instruction.TrueJump:
                    const tjmp = this.getParameter(
                        program,
                        index + 1,
                        parameterModes[0]
                    );
                    index =
                        tjmp !== 0
                            ? this.getParameter(
                                  program,
                                  index + 2,
                                  parameterModes[1]
                              )
                            : index + 3;

                    break;
                case Instruction.FalseJump:
                    const fjmp = this.getParameter(
                        program,
                        index + 1,
                        parameterModes[0]
                    );
                    index =
                        fjmp === 0
                            ? this.getParameter(
                                  program,
                                  index + 2,
                                  parameterModes[1]
                              )
                            : index + 3;

                    break;
                case Instruction.LessThan:
                    const left = this.getParameter(
                        program,
                        index + 1,
                        parameterModes[0]
                    );
                    const right = this.getParameter(
                        program,
                        index + 2,
                        parameterModes[1]
                    );
                    program[program[index + 3]] = left < right ? 1 : 0;
                    index += 4;
                    break;
                case Instruction.Equals:
                    const eleft = this.getParameter(
                        program,
                        index + 1,
                        parameterModes[0]
                    );
                    const eright = this.getParameter(
                        program,
                        index + 2,
                        parameterModes[1]
                    );
                    program[program[index + 3]] = eleft === eright ? 1 : 0;
                    index += 4;
                    break;
            }
        }
    }

    getParameter(program: number[], index: number, mode: ParameterMode) {
        return mode === ParameterMode.Position
            ? program[program[index]]
            : program[index];
    }

    doMultiplication(
        program: number[],
        index: number,
        parameterModes: ParameterMode[]
    ) {
        const a =
            parameterModes[0] === ParameterMode.Position
                ? program[program[index + 1]]
                : program[index + 1];
        const b =
            parameterModes[1] === ParameterMode.Position
                ? program[program[index + 2]]
                : program[index + 2];
        const targetIndex =
            parameterModes[2] === ParameterMode.Position
                ? program[index + 3]
                : index + 3;

        const value = a * b;

        return {
            targetIndex,
            value,
            moveIndex: 4,
        };
    }

    doAddition(
        program: number[],
        index: number,
        parameterModes: ParameterMode[]
    ) {
        const a =
            parameterModes[0] === ParameterMode.Position
                ? program[program[index + 1]]
                : program[index + 1];
        const b =
            parameterModes[1] === ParameterMode.Position
                ? program[program[index + 2]]
                : program[index + 2];
        const targetIndex =
            parameterModes[2] === ParameterMode.Position
                ? program[index + 3]
                : index + 3;

        const value = a + b;

        return {
            targetIndex,
            value,
            moveIndex: 4,
        };
    }
}

export interface ExecutedProgram {
    program: number[];
    output: number[];
}

enum Instruction {
    Add = 1,
    Multiply = 2,
    Set = 3,
    Output = 4,
    TrueJump = 5,
    FalseJump = 6,
    LessThan = 7,
    Equals = 8,
    Halt = 99,
}

enum ParameterMode {
    Position = 0,
    Immediate = 1,
}
