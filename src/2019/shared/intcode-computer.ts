export class IntcodeComputer {
    constructor(private readonly program: number[]) {}

    processCommand(opCode: number, a: number, b: number): number {
        if (opCode === 1) {
            return a + b;
        } else if (opCode === 2) {
            return a * b;
        }
        return -1;
    }

    run(): number[] {
        return [];
    }
}

interface Instruction {
    Opcode: number;
}
interface OneParameter {
    a: number;
}
interface TwoParameters extends OneParameter {
    b: number;
}
interface AddInstruction extends Instruction, TwoParameters {}
