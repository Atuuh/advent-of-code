export const countTreesOnSlope = (
    map: string,
    right: number,
    down: number
): number => {
    const rows = map.split('\n')

    const positions = rows.map((row, index) => {
        if (index % down !== 0) return ''

        return row.charAt(((index * right) / down) % row.length)
    })

    return positions.filter((item) => item === '#').length
}
