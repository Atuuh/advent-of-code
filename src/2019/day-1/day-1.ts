import { Solution } from '#models/solution';
import { Day } from '#models/day';
import { sum } from '#utils/array/reducers';
import { Input } from './input';

export class DayOne implements Day {
    private readonly puzzleInput: number[] = [];

    constructor() {
        this.puzzleInput = Input.split('\n').map(Number);
    }

    solvePartOne(): number {
        const fuelAmounts = this.puzzleInput.map(DayOne.calculateFuel);
        return fuelAmounts.reduce(sum);
    }

    solvePartTwo(): number {
        const fuelLevels = this.puzzleInput.map(DayOne.calculateInclusiveFuel);
        return fuelLevels.reduce(sum);
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
