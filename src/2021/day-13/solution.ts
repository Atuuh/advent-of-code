import { modify } from '#utils/array/2d'
import { max } from '#utils/array/reducers'
import { parseAndSolve } from '#utils/solve'
import { Dot, Fold, foldAlong } from '.'

const parseInput = (input: string) => {
    const [dotsString, foldsString] = input.split('\n\n')
    const dots = dotsString
        .split('\n')
        .map<Dot>((line) => line.split(',').map(Number) as Dot)
    const folds = foldsString.split('\n').map<Fold>((line) => {
        const [start, num] = line.split('=')

        return {
            direction: start.endsWith('x') ? 'x' : 'y',
            point: Number(num),
        }
    })
    return { dots, folds }
}

type Input = ReturnType<typeof parseInput>

const solve = parseAndSolve(2021, 13, parseInput)

// Part One

const partOne = ({ dots, folds }: Input) => foldAlong(dots, folds[0])

solve(partOne, 'Part One:')

const partTwo = ({ dots, folds }: Input) => {
    const finalDots = folds.reduce(
        (currentDots, fold) => foldAlong(currentDots, fold),
        dots
    )
    const maxX = finalDots.map(([x]) => x).reduce(max) + 1
    const maxY = finalDots.map(([_, y]) => y).reduce(max) + 1

    const array = new Array(maxY).fill([]).map(() => new Array(maxX).fill('.'))

    const drawing = finalDots.reduce(
        (drawing, [x, y]) => modify(drawing, x, y, () => 'x'),
        array
    )

    console.log(drawing.map((line) => line.join('')).join('\n'))

    return drawing
}

// Part Two
solve(partTwo, 'Part Two:')
