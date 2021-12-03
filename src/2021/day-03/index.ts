import { transpose } from '#utils/array/transformations'

export const getPowerConsumption = (report: string[]) => {
    const reportArray = report.map((num) => num.split(''))
    const bits = transpose(reportArray)
    const mostCommonBits = bits.reduce(getMostCommonBits, [])
    const leastCommonBits = mostCommonBits.map(flipBit).join('')
    const gamma = Number.parseInt(mostCommonBits.join(''), 2)
    const epsilon = Number.parseInt(leastCommonBits, 2)
    return gamma * epsilon
}

export const getLifeSupportRating = (report: string[]) => {
    const reportArray = report.map((num) => num.split(''))
    const oxygen = getOxygenRating(reportArray)
    const co2 = getCO2Rating(reportArray)
    return oxygen * co2
}

const bitCriteria = (fn: (bits: string[][]) => string[]) => {
    const filterBits = (reportArray: string[][], index = 0): number => {
        if (reportArray.length === 1)
            return Number.parseInt(reportArray[0].join(''), 2)

        const bits = transpose(reportArray)
        const mappedBits = fn(bits)

        const matchingCriteria = reportArray.filter(
            (num) => num[index] === mappedBits[index]
        )

        return filterBits(matchingCriteria, index + 1)
    }
    return filterBits
}

const getOxygenRating = bitCriteria((bits) =>
    bits.reduce(getMostCommonBits, [])
)

const getCO2Rating = bitCriteria((bits) =>
    bits.reduce(getMostCommonBits, []).map(flipBit)
)

const flipBit = (bit: string) => (bit === '1' ? '0' : '1')

const getMostCommonBits = (result: string[], array: string[]) => {
    const oneBits = array.filter((num) => num === '1')
    const mostCommonBit = oneBits.length >= array.length / 2 ? '1' : '0'
    return result.concat(mostCommonBit)
}
