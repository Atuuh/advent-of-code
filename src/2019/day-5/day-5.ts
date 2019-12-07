import { Solution } from '../../models';
import { IntcodeComputer } from '../shared/intcode-computer/intcode-computer';
import { Input } from './input';
import { getLast } from '../../utils/array';

export const DayFive = (): Solution => {
    const input = Input.split(',').map(Number);
    let ic = new IntcodeComputer([...input]);

    const result = ic.run(1);
    const partOne = getLast(result.output);

    const result2 = ic.run(5);
    const partTwo = getLast(result2.output);

    return {
        partOne,
        partTwo,
    };
};
