import { Advent } from '../advent'
import { input } from './input'

export class DayNine extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Nine'
        this.Input = input

        const regex = /(\d+).*?(\d+)/
        const matches = this.Input.split(regex)
            .map(Number)
            .filter((x) => !!x)

        const scores = this.PlayGame(matches[0], matches[1])
        this.PartA = Math.max(...scores).toString()

        const secondScores = this.PlayGame(matches[0], matches[1] * 100)
        this.PartB = Math.max(...secondScores).toString()
    }

    private PlayGame(players: number, lastMarble: number) {
        const scores = new Array<number>(players).fill(0)
        let currentMarble = new Marble(0)
        let marbleValue = 0
        let player = 0
        do {
            marbleValue++
            if (++player > players) player = 1
            // 23 rule
            if (marbleValue % 23 === 0 && marbleValue > 0) {
                scores[player - 1] += marbleValue
                const marble = this.GetMarble(currentMarble, -7)
                scores[player - 1] += marble.value
                marble.left.right = marble.right
                marble.right.left = marble.left
                currentMarble = marble.right
            }
            // Normal rule
            else {
                const left = currentMarble.right
                const right = left.right
                const newMarble = new Marble(marbleValue, left, right)
                left.right = newMarble
                right.left = newMarble
                currentMarble = newMarble
            }
        } while (marbleValue < lastMarble)
        return scores
    }

    GetMarble(marble: Marble, space: number): Marble {
        let output = marble
        if (space > 0) {
            for (let i = 0; i < space; i++) {
                output = output.right
            }
        } else {
            for (let i = 0; i > space; i--) {
                output = output.left
            }
        }
        return output
    }
}

class Marble {
    value: number
    left: Marble
    right: Marble
    constructor(value: number, left?: Marble, right?: Marble) {
        this.value = value
        this.left = left || this
        this.right = right || this
    }
}
