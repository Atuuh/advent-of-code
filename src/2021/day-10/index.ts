import { sum } from '#utils/array/reducers'
import { ascending } from '#utils/array/sorting'

type Incomplete = {
    type: 'incomplete'
    remainingCharacters: string[]
}
type Incorrect = {
    type: 'incorrect'
    wrongCharacter: string
}

type Result = Incomplete | Incorrect

type GetResultType<T> = T extends 'incomplete' ? Incomplete[] : Incorrect[]

const initialResult: Result = {
    type: 'incomplete',
    remainingCharacters: [],
}

const openingBrackets = ['[', '(', '{', '<']
const closingBrackets = [']', ')', '}', '>']

const getMatchingClosingBracket = (char: string) =>
    closingBrackets[openingBrackets.indexOf(char)]

export const processInput = <ResultType extends Result['type']>(
    lines: string[],
    type: ResultType
): GetResultType<ResultType> => {
    return lines
        .map((line) => line.split('').reduce(processLine, initialResult))
        .filter((result) => result.type === type) as GetResultType<ResultType>
}

const processLine = (expectedClosing: Result, character: string): Result => {
    if (expectedClosing.type === 'incorrect') {
        return expectedClosing
    }

    if (openingBrackets.includes(character)) {
        return {
            type: 'incomplete',
            remainingCharacters: [
                getMatchingClosingBracket(character),
                ...expectedClosing.remainingCharacters,
            ],
        }
    } else {
        const [expected, ...rest] = expectedClosing.remainingCharacters
        if (expected === character) {
            return {
                type: 'incomplete',
                remainingCharacters: rest,
            }
        } else {
            return {
                type: 'incorrect',
                wrongCharacter: character,
            }
        }
    }
}

const scoreMap: {
    [type in Result['type']]: {
        [character: string]: number
    }
} = {
    ['incorrect']: {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    },
    ['incomplete']: {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    },
}

export const getIllegalCharacterScore = (results: Incorrect[]): number =>
    results
        .map((result) => scoreMap['incorrect'][result.wrongCharacter])
        .reduce(sum)

export const getIncompleteCharacterScore = (results: Incomplete[]): number => {
    const scores = results.map((result) =>
        result.remainingCharacters.reduce(
            (total, value) => total * 5 + scoreMap['incomplete'][value],
            0
        )
    )
    return scores.sort(ascending)[(scores.length - 1) / 2]
}
