import { Day, Solution } from "#aoc/day";
import { Input } from "../day-2/input";

export class DayTwo implements Day {
    private readonly InitialProgram: number[];
    constructor() {
        this.InitialProgram = Input.split(",").map(Number);
    }

    solvePartOne(): number {
        let index = 0;
        let program = this.InitialProgram;
        while (program[index] !== 99) {}
    }

    solve(): Solution {
        const partOne = "";
        const partTwo = "";
        return {
            partOne,
            partTwo
        };
    }
}
