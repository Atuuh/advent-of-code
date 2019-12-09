export class IntcodeComputer {
    private instructionPointer = 0;
    program: number[];
    relativeBase = 0;

    constructor(
        private readonly initialProgram: number[],
        options?: { noun: number; verb: number }
    ) {
        this.program = initialProgram.slice();
        if (options)
            this.initialProgram = this.initialiseProgram(
                options.noun,
                options.verb
            );
    }

    initialiseProgram(noun: number, verb: number): number[] {
        const array = this.initialProgram.slice();
        array[1] = noun;
        array[2] = verb;
        return array;
    }

    getNextInstruction() {
        const instructionCode = this.program[this.instructionPointer];

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

    *run(): Generator<number, number, number> {
        this.instructionPointer = 0;
        this.program = this.initialProgram.slice();
        this.relativeBase = 0;

        while (true) {
            const { opCode, parameterModes } = this.getNextInstruction();

            const param1 = this.getParameter(
                this.instructionPointer + 1,
                parameterModes[0]
            );
            const param2 = this.getParameter(
                this.instructionPointer + 2,
                parameterModes[1]
            );
            const param3 =
                parameterModes[2] === ParameterMode.Position
                    ? this.program[this.instructionPointer + 3]
                    : this.relativeBase +
                      this.program[this.instructionPointer + 3];

            switch (opCode) {
                case Instruction.Halt:
                    return -Infinity;
                case Instruction.Add:
                    this.program[param3] = param1 + param2;
                    this.instructionPointer += 4;
                    break;
                case Instruction.Multiply:
                    this.program[param3] = param1 * param2;
                    this.instructionPointer += 4;
                    break;
                case Instruction.Input:
                    let index;
                    if (parameterModes[0] === ParameterMode.Position)
                        index = this.program[this.instructionPointer + 1];
                    else if (parameterModes[0] === ParameterMode.Relative) {
                        index =
                            this.relativeBase +
                            this.program[this.instructionPointer + 1];
                    } else {
                        index = -1;
                    }
                    this.program[index] = yield -1;
                    this.instructionPointer += 2;
                    break;
                case Instruction.Output:
                    yield param1;
                    this.instructionPointer += 2;
                    break;
                case Instruction.TrueJump:
                    this.instructionPointer =
                        param1 !== 0 ? param2 : this.instructionPointer + 3;
                    break;
                case Instruction.FalseJump:
                    this.instructionPointer =
                        param1 === 0 ? param2 : this.instructionPointer + 3;
                    break;
                case Instruction.LessThan:
                    this.program[param3] = param1 < param2 ? 1 : 0;
                    this.instructionPointer += 4;
                    break;
                case Instruction.Equals:
                    this.program[param3] = param1 === param2 ? 1 : 0;
                    this.instructionPointer += 4;
                    break;
                case Instruction.MoveRelativeBase:
                    this.relativeBase += param1;
                    this.instructionPointer += 2;
                    break;
                default:
                    throw Error(`Opcode is invalid!: ${opCode}`);
            }
        }
    }

    getParameter(index: number, mode: ParameterMode) {
        switch (mode) {
            case ParameterMode.Immediate:
                return this.program[index] || 0;
            case ParameterMode.Position:
                return this.program[this.program[index]] || 0;
            case ParameterMode.Relative:
                return (
                    this.program[this.relativeBase + this.program[index]] || 0
                );
        }
    }
}

export interface ExecutedProgram {
    program: number[];
    output: number[];
}

enum Instruction {
    Add = 1,
    Multiply = 2,
    Input = 3,
    Output = 4,
    TrueJump = 5,
    FalseJump = 6,
    LessThan = 7,
    Equals = 8,
    MoveRelativeBase = 9,
    Halt = 99,
}

enum ParameterMode {
    Position = 0,
    Immediate = 1,
    Relative = 2,
}
