export const intersection = <T>(arrays: T[][]): T[] => [
    ...new Set<T>(
        arrays.reduce((common, array) =>
            common.filter((item) => array.includes(item))
        )
    ),
]

export const union = <T>(arrays: T[][]): T[] => [...new Set<T>(arrays.flat())]
