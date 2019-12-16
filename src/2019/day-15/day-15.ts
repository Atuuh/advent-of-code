import { Day } from '#models/solution';
import { rotate, zip, chunk } from '#utils/array/transformations';
import { repeat } from '#utils/array/generation';
import { sum } from '#utils/array/reducers';
import { numberAt } from '#utils/number';
import { memoise } from '#utils/function/function';

const Input =
    '59762574510031092870627555978901048140761858379740610694074091049186715780458779281173757827279664853239780029412670100985236587608814782710381775353184676765362101185238452198186925468994552552398595814359309282056989047272499461615390684945613327635342384979527937787179298170470398889777345335944061895986118963644324482739546009761011573063020753536341827987918039441655270976866933694280743472164322345885084587955296513566305016045735446107160972309130456411097870723829697443958231034895802811058095753929607703384342912790841710546106752652278155618050157828313372657706962936077252259769356590996872429312866133190813912508915591107648889331';

export const DayFifteen: Day = () => {
    const input = Input.split('').map(Number);

    const phase100 = getPhase(input, 100);
    const partOne = +phase100.slice(0, 8).join('');
    const partTwo = getPhaseWithOffset(7, input, 100);

    return { partOne, partTwo };
};

const InitialPattern = [0, 1, 0, -1];

export const getPhase = (
    input: number[],
    maxIterations: number,

    iterationCount: number = 0
): number[] => {
    const phase = input.map((value, index, array) => {
        const pattern = getMemoisedPattern(index + 1, input.length);
        const result = zip(array, pattern)
            .map(([inputValue, patternValue]) => inputValue * patternValue)
            .reduce(sum);
        return numberAt(Math.abs(result), 0);
    });
    return iterationCount + 1 < maxIterations
        ? memoisedGetPhase(phase, maxIterations, iterationCount + 1)
        : phase;
};

export const getPhaseWithOffset = (
    offsetLength: number,
    input: number[],
    maxIterations: number
): number => {
    const offset = +input.slice(0, offsetLength).join('');
    const times = Math.ceil((input.length * 10000 - offset) / input.length);

    const phase = repeat(input, times).slice(offset % input.length);

    for (let i = 0; i < 100; i++) {
        for (let j = phase.length - 2; j >= 0; j--) {
            const digit = phase[j] + phase[j + 1];
            phase[j] = Math.abs(digit) % 10;
        }
    }

    return +phase.slice(0, 8).join('');
};

const memoisedGetPhase = memoise(getPhase);

export const getPattern = (
    repetitionCount: number,
    length: number
): number[] => {
    const pattern = InitialPattern.map(value =>
        Array.from({ length: repetitionCount }, () => value)
    ).flat();
    const repeatedPattern = repeat(
        pattern,
        Math.ceil(length / InitialPattern.length)
    );
    return rotate(repeatedPattern).slice(0, length);
};

export const getMemoisedPattern = memoise(getPattern);
