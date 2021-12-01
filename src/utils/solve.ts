import { readFile } from 'fs/promises'
import path from 'path'

export const readInput = async (year: number, day: number) =>
    await readFile(
        path.join(
            process.cwd(),
            'src',
            year.toString(),
            `day-${day.toString().padStart(2, '0')}`,
            './input.txt'
        ),
        'utf-8'
    )

export const parseAndSolve =
    <T>(year: number, day: number, inputMapFn: (input: string) => T) =>
    async (solutionFn: (input: T) => any, logText = 'Result') => {
        const input = await readInput(year, day)
        const parsedInput = inputMapFn(input)
        const result = solutionFn(parsedInput)
        console.log(logText, result)
    }
