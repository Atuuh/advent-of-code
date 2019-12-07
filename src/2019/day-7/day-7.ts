import { Solution } from '../../models';
import { getIncrementalArray } from '../../utils/array';
import { Input } from './input';
import { IntcodeComputer } from '../shared/intcode-computer/intcode-computer';

export const DaySeven = (): Solution => {
    const program = Input.split(',').map(Number);

    const partOne = solvePartOne(program);

    const partTwo = 0;

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

export const getThrusterSignal = (
    program: number[],
    sequence: PhaseSequence
): number => {
    const [a, b, c, d, e] = sequence;
    const computer = new IntcodeComputer(program);

    let aResult = computer.run([a, 0]);
    const [aOutput] = aResult.output;

    let bResult = computer.run([b, aOutput]);
    const [bOutput] = bResult.output;

    let cResult = computer.run([c, bOutput]);
    const [cOutput] = cResult.output;

    let dResult = computer.run([d, cOutput]);
    const [dOutput] = dResult.output;

    let eResult = computer.run([e, dOutput]);
    const [eOutput] = eResult.output;

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
