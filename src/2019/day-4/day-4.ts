import { Solution } from '../../models';
import { IncrementalArray } from '../../utils';

const Input: [number, number] = [158126, 624574];

export const DayFour = (): Solution => {
    const partOne = solvePartOne();
    const partTwo = solvePartTwo();

    return {
        partOne,
        partTwo,
    };
};

export const solvePartOne = (): number => {
    const [min, max] = Input;
    const passwordAttempts = IncrementalArray(max - min, min);
    return passwordAttempts
        .map(attempt => isValidPassword(attempt, min, max))
        .filter(item => item === true).length;
};

export const solvePartTwo = () => {
    const [min, max] = Input;
    const passwordAttempts = IncrementalArray(max - min, min);
    return passwordAttempts.filter(item => isValidExtraCriteria(item, min, max))
        .length;
};

export const isValidExtraCriteria = (
    password: number,
    min: number,
    max: number
): boolean => {
    return (
        isValidPassword(password, min, max) &&
        getChainLengths(password).includes(2)
    );
};

export const getChainLengths = (input: number): number[] => {
    const t = {
        running: new Array<number>(input.toString().length).fill(0),
        prevNum: -Infinity,
        index: -1,
    };
    const array = input
        .toString()
        .split('')
        .map(Number);
    return array
        .reduce((q, w) => {
            if (q.prevNum === w) {
                q.running[q.index] += 1;
            } else {
                q.prevNum = w;
                q.index += 1;
                q.running[q.index] += 1;
            }

            return q;
        }, t)
        .running.filter(item => item !== 0);
};

export const isInRange = (
    password: number,
    min: number,
    max: number
): boolean => {
    return password >= min && password < max;
};

export const isValidPassword = (
    password: number,
    min: number,
    max: number
): boolean => {
    if (!isInRange(password, min, max)) return false;

    let increments = true;
    const numberArray = password
        .toString()
        .split('')
        .map(Number);
    numberArray.reduce((prevNumber, currentNumber) => {
        increments = increments && currentNumber >= prevNumber;
        return currentNumber;
    }, 0);
    if (!increments) return false;

    let doubleNumber = false;
    numberArray.reduce((prevNumber, currentNumber) => {
        doubleNumber = doubleNumber || currentNumber === prevNumber;
        return currentNumber;
    }, 0);
    if (!doubleNumber) return false;

    return true;
};
