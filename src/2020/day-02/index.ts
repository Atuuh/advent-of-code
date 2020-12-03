import { input } from './input'

export const isSledPasswordValid = (passwordLine: string): boolean => {
    const {
        firstNumber: minAmount,
        secondNumber: maxAmount,
        letter,
        passwordChars,
    } = parsePasswordLine(passwordLine)

    const amountLetterAppears = passwordChars.reduce(
        (amount, char) => (char === letter ? amount + 1 : amount),
        0
    )

    if (amountLetterAppears >= minAmount && amountLetterAppears <= maxAmount) {
        return true
    }
    return false
}

export const isTobogganPasswordValid = (passwordLine: string): boolean => {
    const {
        firstNumber: firstPosition,
        secondNumber: secondPosition,
        letter,
        passwordChars,
    } = parsePasswordLine(passwordLine)

    const doesPositionMatch = (position: number) =>
        passwordChars[position - 1] === letter

    const firstPositionMatches = doesPositionMatch(firstPosition)
    const secondPositionMatches = doesPositionMatch(secondPosition)

    if (
        (firstPositionMatches && !secondPositionMatches) ||
        (!firstPositionMatches && secondPositionMatches)
    ) {
        return true
    }
    return false
}

const parsePasswordLine = (passwordLine: string) => {
    const [amounts, letterWithColon, password] = passwordLine
        .split(' ')
        .map((s) => s.trim())

    const [firstNumber, secondNumber] = amounts.split('-').map(Number)
    const letter = letterWithColon.charAt(0)

    const passwordChars = password.split('')

    return { firstNumber, secondNumber, letter, passwordChars }
}

const partOne = () => {
    const passwordLines = input.split('\n')

    return passwordLines
        .map(isSledPasswordValid)
        .filter((value) => value === true).length
}

const partTwo = () => {
    const passwordLines = input.split('\n')

    return passwordLines
        .map(isTobogganPasswordValid)
        .filter((value) => value === true).length
}

console.log('Part One:', partOne())
console.log('Part Two:', partTwo())
