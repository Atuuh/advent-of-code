import { Advent } from '../advent'
import { input } from './input'

export class DayFive extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Five'
        this.Input = input

        const polymer = this.Input
        const finalPolymer = this.fullyActivatePolymer(polymer)

        this.PartA = finalPolymer.length.toString()

        const units = new Array<number>(26)
        for (let i = 0; i < units.length; i++) {
            const unit = this.getChar(i)
            const strippedPolymer = polymer.replace(
                new RegExp(`[${unit}${unit.toUpperCase()}]`, 'g'),
                ''
            )
            units[i] = this.fullyActivatePolymer(strippedPolymer).length
        }

        this.PartB = Math.min(...units).toString()
    }

    private getChar(input: number): string {
        return String.fromCharCode(input + 97)
    }

    private fullyActivatePolymer(polymer: string): string {
        let newPolymer = polymer
        do {
            polymer = newPolymer
            newPolymer = [...polymer].reduce((total, next) => {
                if (total.slice(-1) === this.toggleCase(next)) {
                    return total.slice(0, -1)
                }
                return total + next
            }, '' as string)
        } while (polymer !== newPolymer)
        return polymer
    }

    private triggerPolymer(input: string): string {
        for (let i = 0; i < input.length - 1; i++) {
            if (input[i] === this.toggleCase(input[i + 1])) {
                return input.slice(0, i) + input.slice(i + 2)
            }
        }
        return input
    }

    private toggleCase(input: string): string {
        if (input.length !== 1) {
            throw new Error('toggleCase input is not a single char')
        }
        return input === input.toLowerCase()
            ? input.toUpperCase()
            : input.toLowerCase()
    }
}
