import { Day } from '#models/solution';
import { IntcodeComputer } from '#shared/intcode-computer';
import { Input } from './input';

export const DayNine: Day = () => {
    const program = Input.split(',').map(Number);

    const runner = new IntcodeComputer(program).run();
    runner.next();
    let state = runner.next(1);
    let output: number[] = [];
    while (!state.done) {
        state = runner.next();
        output = output.concat(state.value);
    }

    const partOne = runner.next().value;
    const partTwo = 0;

    return {
        partOne,
        partTwo,
    };
};
