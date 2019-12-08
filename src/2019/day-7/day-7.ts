import { Solution } from '#models';
import { getIncrementalArray } from '#utils/array/generation';
import { IntcodeComputer } from '#shared/intcode-computer';
import { Input } from './input';

export const DaySeven = (): Solution => {
    const program = Input.split(',').map(Number);

    const partOne = solvePartOne(program);

    const partTwo = solvePartTwo(program);

    return { partOne, partTwo };
};

const solvePartOne = (program: number[]) => {
    const ampValues = getIncrementalArray(5);
    const ampMap = [
        ampValues.slice(),
        ampValues.slice(),
        ampValues.slice(),
        ampValues.slice(),
        ampValues.slice(),
    ];
    const permutations = getArrayPermutations(...ampMap) as PhaseSequence[];
    const targets = permutations.filter(
        item =>
            item.includes(0) &&
            item.includes(1) &&
            item.includes(2) &&
            item.includes(3) &&
            item.includes(4)
    );
    const thrusterValues = targets.map(permutation =>
        getThrusterSignal(program, permutation)
    );
    return Math.max(...thrusterValues);
};

const solvePartTwo = (program: number[]) => {
    const ampValues = getIncrementalArray(5, 5);
    const ampMap = [
        ampValues.slice(),
        ampValues.slice(),
        ampValues.slice(),
        ampValues.slice(),
        ampValues.slice(),
    ];
    const permutations = getArrayPermutations(...ampMap) as PhaseSequence[];
    const targets = permutations.filter(
        item =>
            item.includes(5) &&
            item.includes(6) &&
            item.includes(7) &&
            item.includes(8) &&
            item.includes(9)
    );
    const thrusterValues = targets.map(permutation => {
        const amps = permutation.map(phase => {
            const amp = new IntcodeComputer(program).run();
            amp.next();
            const state = amp.next(phase);
            return { amp, state };
        });
        let power = 0;

        while (!amps.slice(-1)[0].state.done) {
            for (const amp of amps) {
                const out = amp.amp.next(power);
                amp.state = amp.amp.next();
                power = out.value;
            }
        }

        return power;
    });
    return Math.max(...thrusterValues);
};

export const getThrusterSignal = (
    program: number[],
    sequence: PhaseSequence
): number => {
    const [a, b, c, d, e] = sequence;
    const computer = new IntcodeComputer(program);

    let runner = computer.run();
    runner.next();
    runner.next(a);
    let aOutput = runner.next(0).value;

    runner = computer.run();
    runner.next();
    runner.next(b);
    let bOutput = runner.next(aOutput).value;

    runner = computer.run();
    runner.next();
    runner.next(c);
    let cOutput = runner.next(bOutput).value;

    runner = computer.run();
    runner.next();
    runner.next(d);
    let dOutput = runner.next(cOutput).value;

    runner = computer.run();
    runner.next();
    runner.next(e);
    let eOutput = runner.next(dOutput).value;

    return eOutput;
};

type PhaseSequence = [number, number, number, number, number];

const arrayCombinations = (a: any[], b: any[]): any[] => [
    ...a.flatMap(a2 => b.map(b2 => [].concat(a2, b2))),
];

export const getArrayPermutations = (...arrays: any[]): any[][] => {
    const [a, b, ...c] = arrays;
    if (!b || b.length === 0) {
        return a;
    }
    const [b2, ...c2] = c;
    const fab = arrayCombinations(a, b);
    return getArrayPermutations(fab, b2, ...c2);
};
