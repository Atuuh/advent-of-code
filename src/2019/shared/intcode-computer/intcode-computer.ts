export class IntcodeComputer {
    private instructionPointer = 0;
    program: number[];
    output = 0;

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
        this.output = 0;
        let input;

        while (true) {
            const { opCode, parameterModes } = this.getNextInstruction();
            switch (opCode) {
                case Instruction.Halt:
                    return this.output;
                case Instruction.Add:
                    this.performAddition(parameterModes);
                    break;
                case Instruction.Multiply:
                    this.performMultiplication(parameterModes);
                    break;
                case Instruction.Set:
                    input = yield -1;
                    this.performSet(input);
                    break;
                case Instruction.Output:
                    this.performOutput(parameterModes);
                    yield this.output;
                    break;
                case Instruction.TrueJump:
                    this.performTrueJump(parameterModes);
                    break;
                case Instruction.FalseJump:
                    this.performFalseJump(parameterModes);
                    break;
                case Instruction.LessThan:
                    this.performLessThan(parameterModes);
                    break;
                case Instruction.Equals:
                    this.performEquals(parameterModes);
                    break;
                default:
                    throw Error(`Opcode is invalid!: ${opCode}`);
            }
        }
    }

    getParameter(index: number, mode: ParameterMode) {
        return mode === ParameterMode.Position
            ? this.program[this.program[index]]
            : this.program[index];
    }

    performEquals(parameterModes: ParameterMode[]) {
        const left = this.getParameter(
            this.instructionPointer + 1,
            parameterModes[0]
        );
        const right = this.getParameter(
            this.instructionPointer + 2,
            parameterModes[1]
        );
        this.program[this.program[this.instructionPointer + 3]] =
            left === right ? 1 : 0;

        this.instructionPointer += 4;
    }

    performLessThan(parameterModes: ParameterMode[]) {
        const left = this.getParameter(
            this.instructionPointer + 1,
            parameterModes[0]
        );
        const right = this.getParameter(
            this.instructionPointer + 2,
            parameterModes[1]
        );
        this.program[this.program[this.instructionPointer + 3]] =
            left < right ? 1 : 0;

        this.instructionPointer += 4;
    }

    performFalseJump(parameterModes: ParameterMode[]) {
        const check = this.getParameter(
            this.instructionPointer + 1,
            parameterModes[0]
        );
        const value = this.getParameter(
            this.instructionPointer + 2,
            parameterModes[1]
        );
        this.instructionPointer =
            check === 0 ? value : this.instructionPointer + 3;
    }

    performTrueJump(parameterModes: ParameterMode[]) {
        const check = this.getParameter(
            this.instructionPointer + 1,
            parameterModes[0]
        );
        const value = this.getParameter(
            this.instructionPointer + 2,
            parameterModes[1]
        );
        this.instructionPointer =
            check !== 0 ? value : this.instructionPointer + 3;
    }

    performOutput(parameterModes: ParameterMode[]) {
        const output =
            parameterModes[0] === ParameterMode.Position
                ? this.program[this.program[this.instructionPointer + 1]]
                : this.program[this.instructionPointer + 1];
        this.output = output;
        this.instructionPointer += 2;
    }

    performSet(input: number) {
        this.program[this.program[this.instructionPointer + 1]] = input;
        this.instructionPointer += 2;
    }

    performMultiplication(parameterModes: ParameterMode[]) {
        const a =
            parameterModes[0] === ParameterMode.Position
                ? this.program[this.program[this.instructionPointer + 1]]
                : this.program[this.instructionPointer + 1];
        const b =
            parameterModes[1] === ParameterMode.Position
                ? this.program[this.program[this.instructionPointer + 2]]
                : this.program[this.instructionPointer + 2];
        const targetIndex = this.program[this.instructionPointer + 3];

        const value = a * b;

        this.program[targetIndex] = value;
        this.instructionPointer += 4;
    }

    performAddition(parameterModes: ParameterMode[]) {
        const a =
            parameterModes[0] === ParameterMode.Position
                ? this.program[this.program[this.instructionPointer + 1]]
                : this.program[this.instructionPointer + 1];
        const b =
            parameterModes[1] === ParameterMode.Position
                ? this.program[this.program[this.instructionPointer + 2]]
                : this.program[this.instructionPointer + 2];
        const targetIndex =
            parameterModes[2] === ParameterMode.Position
                ? this.program[this.instructionPointer + 3]
                : this.instructionPointer + 3;

        const value = a + b;

        this.program[targetIndex] = value;
        this.instructionPointer += 4;
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
