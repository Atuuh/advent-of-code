import { input } from './input'

export const isPasswordValid = (passwordLine: string): boolean => {
    const { minAmount, maxAmount, letter, passwordChars } = parsePasswordLine(
        passwordLine
    )

    const amountLetterAppears = passwordChars.reduce(
        (amount, char) => (char === letter ? amount + 1 : amount),
        0
    )

    if (amountLetterAppears >= minAmount && amountLetterAppears <= maxAmount) {
        return true
    }

    return false
}

const parsePasswordLine = (passwordLine: string) => {
    const [amounts, letterWithColon, password] = passwordLine
        .split(' ')
        .map((s) => s.trim())

    const [minAmount, maxAmount] = amounts.split('-').map(Number)
    const letter = letterWithColon.charAt(0)

    const passwordChars = password.split('')

    return { minAmount, maxAmount, letter, passwordChars }
}

const partOne = () => {
    const passwordLines = input.split('\n')

    return passwordLines.map(isPasswordValid).filter((value) => value === true)
        .length
}

console.log('Part One:', partOne())

// console.log(
//     'Part Two:',
//     findNumbersTotalling(getInput(), 3, 2020)?.reduce(product)
// )
