import { Advent } from '../advent'
import { input } from './input'

export class DayTwo extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Two'
        this.Input = input
        const BoxIds = this.Input.split('\n')

        const Checksum: [number, number] = [0, 0]

        for (const box of BoxIds) {
            const charCounts = this.CountChars(box)
            if (charCounts.includes(2)) {
                Checksum[0]++
            }
            if (charCounts.includes(3)) {
                Checksum[1]++
            }
        }
        this.PartA = (Checksum[0] * Checksum[1]).toString()

        // Compare each string to find one that difers by 1 char
        let closeStrings: [string, string]
        for (let i = 0; i < BoxIds.length; i++) {
            if (closeStrings) {
                break
            }
            for (let j = i; j < BoxIds.length; j++) {
                const search = BoxIds[i]
                const target = BoxIds[j]

                if (this.FindStringDifferences(search, target) === 1) {
                    closeStrings = [search, target]
                    break
                }
            }
        }

        for (let k = 0; k < closeStrings[0].length; k++) {
            if (closeStrings[0][k] === closeStrings[1][k]) {
                this.PartB += closeStrings[0][k]
            }
        }
    }

    private FindStringDifferences(left: string, right: string): number {
        let count = 0
        for (let i = 0; i < left.length; i++) {
            if (left[i] !== right[i]) {
                count++
            }
        }
        return count
    }

    private CountChars(input: string): number[] {
        const map = input.split('').reduce((total, next) => {
            let update = total.get(next) || 0
            total.set(next, ++update)
            return total
        }, new Map<string, number>())
        return Array.from(map.values())
    }
}
