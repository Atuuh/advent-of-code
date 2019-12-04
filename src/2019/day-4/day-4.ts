import { Solution } from 'models';

const Input: [number, number] = [158126, 624574];

export const DayFour = (): Solution => {
    const partOne = 0;
    const partTwo = 0;

    return {
        partOne,
        partTwo,
    };
};

export const isValidPassword = (
    password: number,
    min: number,
    max: number
): boolean => {
    if (password < min && password > max) return false;

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
