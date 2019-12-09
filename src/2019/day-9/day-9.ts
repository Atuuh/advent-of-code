import { Day } from '#models/solution';
import { IntcodeComputer } from '#shared/intcode-computer';
import { Input } from './input';

export const DayNine: Day = () => {
    const program = Input.split(',').map(Number);

    let runner = new IntcodeComputer(program).run();
    runner.next();

    const partOne = runner.next(1).value;

    runner = new IntcodeComputer(program).run();
    runner.next();

    const partTwo = runner.next(2).value;

    return {
        partOne,
        partTwo,
    };
};
