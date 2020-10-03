export const chunk = <T extends unknown>(array: T[], length: number): T[][] => {
    const chunks = []
    for (let i = 0; i < array.length; i += length) {
        chunks.push(array.slice(i, i + length))
    }
    return chunks
}

export const transpose = <T extends unknown>(array: T[][]): T[][] =>
    array[0].map((_, index) => array.map((row) => row[index]))

export const rotate = <T extends unknown>(
    array: T[],
    amount = 1,
    direction: 'left' | 'right' = 'left'
): T[] => {
    amount = amount % array.length
    amount = direction === 'left' ? amount : array.length - amount
    return array.slice(amount).concat(array.slice(0, amount))
}

export const concat = (...arrays: any[][]): any[] =>
    arrays.reduce((acc, array) => acc.concat(array), [])

export const zip = <A extends unknown, B extends unknown>(
    a: A[],
    b: B[]
): Array<[A, B]> => a.map((value, index) => [value, b[index]])
