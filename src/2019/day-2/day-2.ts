import { Day, Solution } from '#aoc/day';
import { Input } from '../day-2/input';

export class DayTwo implements Day {
    private readonly InitialProgram: number[];

    constructor() {
        this.InitialProgram = Input.split(',').map(Number);
    }

    static processCommand(opCode: number, a: number, b: number): number {
        if (opCode === 1) {
            return a + b;
        } else if (opCode === 2) {
            return a * b;
        }
        return -1;
    }

    static getValueFromPosition(position: number, array: number[]): number {
        return array[array[position]];
    }

    static runProgram(array: number[]): number[] {
        const program = array.slice();

        let index = 0;

        while (program[index] !== 99) {
            const value = DayTwo.processCommand(
                program[index],
                DayTwo.getValueFromPosition(index + 1, program),
                DayTwo.getValueFromPosition(index + 2, program)
            );
            program[program[index + 3]] = value;
            index += 4;
        }

        return program;
    }

    static initialiseProgram(
        program: number[],
        noun: number,
        verb: number
    ): number[] {
        const initialisedProgram = program.slice();
        initialisedProgram[1] = noun;
        initialisedProgram[2] = verb;
        return initialisedProgram;
    }

    solvePartOne(): number {
        let program = DayTwo.initialiseProgram(this.InitialProgram, 12, 2);
        let t = [1];
        t == [2] ? ' ' : '';
        program = DayTwo.runProgram(program);

        return program[0];
    }

    solvePartTwo(): number {
        let target = 19690720;
        for (let i = 0; i < 99; i++) {
            for (let j = 0; j < 99; j++) {
                let program = DayTwo.initialiseProgram(
                    this.InitialProgram,
                    i,
                    j
                );

                const executedProgram = DayTwo.runProgram(program);
                const output = executedProgram[0];

                if (output === target) {
                    return 100 * i + j;
                }
            }
        }
        return -1;
    }

    solve(): Solution {
        const partOne = this.solvePartOne();
        const partTwo = this.solvePartTwo();
        return {
            partOne,
            partTwo
        };
    }
}

type Json =
    | string
    | number
    | boolean
    | null
    | { [property: string]: Json }
    | Json[];
