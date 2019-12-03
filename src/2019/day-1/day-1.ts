import { Input } from './input';
import { Day, Solution } from 'models';
import { SumArray } from 'utils';

export class DayOne implements Day {
    private readonly puzzleInput: number[] = [];

    constructor() {
        this.puzzleInput = Input.split('\n').map(Number);
    }

    solvePartOne(): number {
        const fuelAmounts = this.puzzleInput.map(DayOne.calculateFuel);
        return SumArray(fuelAmounts);
    }

    solvePartTwo(): number {
        const fuelLevels = this.puzzleInput.map(DayOne.calculateInclusiveFuel);
        return SumArray(fuelLevels);
    }

    solve(): Solution {
        const partOne = this.solvePartOne();

        const partTwo = this.solvePartTwo();

        return {
            partOne,
            partTwo,
        };
    }

    static calculateFuel(mass: number): number {
        return Math.floor(mass / 3) - 2;
    }

    static calculateInclusiveFuel(initialMass: number): number {
        let fuelRequired = 0;
        let remainingMass = initialMass;

        do {
            const fuel = DayOne.calculateFuel(remainingMass);
            fuelRequired += fuel;
            remainingMass = fuel;
        } while (DayOne.calculateFuel(remainingMass) > 0);

        return fuelRequired;
    }
}
