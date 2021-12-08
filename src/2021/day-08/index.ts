import { sum } from '#utils/array/reducers'

export const getOutputNumbers = (lines: string[]): number[][] => {
    const formattedLines = lines.map((line) =>
        line
            .split(' | ')
            .map((section) =>
                section
                    .split(' ')
                    .map((segment) => segment.split('').sort().join(''))
            )
    )

    return formattedLines.map(([signals, output]) => {
        const numberSegments = getNumberSegments(signals)

        return output.reduce(getOutputNumber(numberSegments), [])
    })
}

export const getOutputNumberSum = (outputNumbers: number[][]) =>
    outputNumbers
        .map((numbers) => +numbers.map((num) => num.toString()).join(''))
        .reduce(sum)

export const getEasyOutputNumberCount = (outputNumbers: number[][]) =>
    outputNumbers.flat().filter((num) => [1, 4, 7, 8].includes(num)).length

const getOutputNumber =
    (numberSegments: string[]) => (outputNumbers: number[], output: string) =>
        outputNumbers.concat(numberSegments.indexOf(output))

const getNumberSegments = (signals: string[]): string[] => {
    const easyNumbers = signals.reduce((numbers, value) => {
        const num = getEasyNumber(value)
        if (num !== null) {
            numbers[num] = value
        }
        return numbers
    }, new Array(10).fill(''))

    return signals.reduce((numbers, value) => {
        if (easyNumbers.includes(value)) {
            return numbers
        }
        if (value.length === 5) {
            if (getSharedSegment(value, numbers[1]) === 2) {
                numbers[3] = value
            } else if (getSharedSegment(value, numbers[4]) === 2) {
                numbers[2] = value
            } else {
                numbers[5] = value
            }
        } else if (value.length === 6) {
            if (getSharedSegment(value, numbers[1]) === 1) {
                numbers[6] = value
            } else if (getSharedSegment(value, numbers[4]) === 3) {
                numbers[0] = value
            } else {
                numbers[9] = value
            }
        }
        return numbers
    }, easyNumbers)
}

const getSharedSegment = (a: string, b: string) =>
    a.split('').filter((letter) => b.includes(letter)).length

const getEasyNumber = (pattern: string) => {
    switch (pattern.length) {
        case 2:
            return 1
        case 3:
            return 7
        case 4:
            return 4
        case 7:
            return 8
        default:
            return null
    }
}
