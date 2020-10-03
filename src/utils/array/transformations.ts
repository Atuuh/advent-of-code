export const chunk = (array: any[], length: number) => {
    const chunks = []
    for (let i = 0; i < array.length; i += length) {
        chunks.push(array.slice(i, i + length))
    }
    return chunks
}

export const transpose = (array: any[][]) =>
    array[0].map((column, index) => array.map((row) => row[index]))

export const rotate = (
    array: any[],
    amount = 1,
    direction: 'left' | 'right' = 'left'
) => {
    amount = amount % array.length
    amount = direction === 'left' ? amount : array.length - amount
    return array.slice(amount).concat(array.slice(0, amount))
}

export const concat = (...arrays: any[][]) =>
    arrays.reduce((acc, array) => acc.concat(array), [])

export const zip = (a: any[], b: any[]) =>
    a.map((value, index) => [value, b[index]])
