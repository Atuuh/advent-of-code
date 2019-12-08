import { Solution } from '#models';
import { IntcodeComputer } from '#shared/intcode-computer';
import { Input } from './input';

export const DayFive = (): Solution => {
    const input = Input.split(',').map(Number);
    let ic = new IntcodeComputer([...input]);

    let runner = ic.run();
    runner.next();
    runner.next(1);
    const partOne = runner.next().value;

    runner = ic.run();
    runner.next();
    runner.next(5);
    const partTwo = runner.next().value;

    return {
        partOne,
        partTwo,
    };
};
