import { Solution } from '#models/solution';
import { transpose, chunk } from '#utils/array/transformations';
import { Input } from './input';

export const DayEight = (): Solution => {
    const input = Input.split('').map(Number);
    const width = 25;
    const height = 6;

    const image = decodeImage(input, width, height);
    const layerWithLeast0 = image.reduce((target, layer) => {
        const targetCount = target.filter(equals(0)).length;
        const layerCount = layer.filter(equals(0)).length;
        return layerCount < targetCount ? layer : target;
    });

    const partOne =
        layerWithLeast0.filter(equals(1)).length *
        layerWithLeast0.filter(equals(2)).length;

    const transposed = transpose(image);
    const finalImage = transposed.map(getVisiblePixelValue);

    const lines = chunk(finalImage, width);

    const joinedLines = lines.map(line => line.map(format).join(''));
    const output = joinedLines.join('\n');
    const partTwo = '^ look up ^';

    log(output);

    return { partOne, partTwo };
};

const getVisiblePixelValue = (layerPixels: number[]) =>
    layerPixels.reduce((final, value) => (final === 2 ? value : final));

const format = (value: number) => {
    if (value === 1) {
        return '⬜';
    } else if (value === 0) {
        return '⬛';
    } else return '';
};

export const decodeImage = (
    data: number[],
    width: number,
    height: number
): number[][] => {
    const layers = data.reduce((l, bit, index) => {
        const layerIndex = Math.floor(index / (width * height));
        l[layerIndex] ? l[layerIndex].push(bit) : (l[layerIndex] = [bit]);
        return l;
    }, [] as number[][]);

    return layers;
};

const equals = <T>(searchValue: T) => (value: T) => value === searchValue;

const log = console.log;
