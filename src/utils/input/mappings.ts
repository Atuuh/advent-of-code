export const inputToNumbers = (input: string) => input.split('\n').map(Number)

export const inputToArray = (input: string) => input.split('\n')

export const inputTo2DArray = (input: string) =>
    input.split('\n').map((line) => line.split(''))
