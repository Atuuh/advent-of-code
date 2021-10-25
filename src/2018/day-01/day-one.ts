import { Advent } from '../advent'
import { input } from './input'

export class DayOne extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day One'
        this.Input = input

        const numberArray = this.Input.split('\n').map(Number)

        const total = numberArray.reduce((total, next) => (total += next))
        this.PartA = total.toString()

        let currentFreq = 0
        const freqArray: number[] = []

        do {
            for (const num of numberArray) {
                freqArray.push(currentFreq)
                currentFreq += num
                if (freqArray.includes(currentFreq)) {
                    break
                }
            }
        } while (!freqArray.includes(currentFreq))
        this.PartB = currentFreq.toString()
    }
}
