import { chunk } from '#utils/array/transformations'

export const parseInput = (input: string) =>
    input
        .split('\n')
        .map((line) => (line.startsWith('noop') ? 'noop' : +line.split(' ')[1]))

export const getSignalAtCycle = (
    commands: ReturnType<typeof parseInput>,
    cycle: number
): number => getSignals(commands)[cycle - 1] * cycle

export const getSignals = (commands: ReturnType<typeof parseInput>) =>
    commands
        .reduce(
            ({ currentCycle, result }, item) => {
                if (item === 'noop') {
                    return {
                        currentCycle: currentCycle + 1,
                        result: [...result, result[currentCycle]],
                    }
                } else {
                    return {
                        currentCycle: currentCycle + 2,
                        result: [
                            ...result,
                            result[currentCycle],
                            result[currentCycle] + item,
                        ],
                    }
                }
            },
            { currentCycle: 1, result: [0, 1] } as {
                currentCycle: number
                result: number[]
            }
        )
        .result.slice(1, -1)

export const getDrawn = (values: number[]): string =>
    chunk(values, 40)
        .map((line) =>
            line
                .map((value, index) =>
                    index + 1 >= value && index + 1 < value + 3 ? '#' : '.'
                )
                .join('')
        )
        .join('\n')
