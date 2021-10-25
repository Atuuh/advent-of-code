import { Advent } from '../advent'
import { input } from './input'

export class DayThree extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Three'
        this.Input = input as string

        const claims = this.Input.split('\n').map((claim) => new Claim(claim))
        const canvas = new Canvas(1000, 1000)

        for (const claim of claims) {
            canvas.AddClaim(claim)
        }

        this.PartA = canvas.FindConflicts(2).toString()

        let loner: Claim
        for (const claim of claims) {
            let collision = false
            for (const target of claims) {
                if (claim.id === target.id) {
                    continue
                }
                if (claim.DoesConflict(target)) {
                    collision = true
                    break
                }
            }
            if (!collision) {
                loner = claim
                break
            }
        }

        this.PartB = loner.id.toString()
    }
}

class Claim {
    id: number
    x: number
    y: number
    width: number
    height: number

    constructor(input: string) {
        const regex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/
        const data = input
            .split(regex)
            .filter((x) => !!x)
            .map(Number)

        this.id = data[0]
        this.x = data[1]
        this.y = data[2]
        this.width = data[3]
        this.height = data[4]
    }

    get Left(): number {
        return this.x
    }
    get Right(): number {
        return this.x + this.width - 1
    }
    get Top(): number {
        return this.y
    }
    get Bottom(): number {
        return this.y + this.height - 1
    }

    public DoesConflict(claim: Claim): boolean {
        let horizontalCollision = false
        let verticalCollision = false

        if (!(claim.Right < this.Left || claim.Left > this.Right)) {
            horizontalCollision = true
        }

        if (
            horizontalCollision &&
            !(claim.Bottom < this.Top || claim.Top > this.Bottom)
        ) {
            verticalCollision = true
        }

        return horizontalCollision && verticalCollision
    }
}

class Canvas {
    private _canvas: number[][]

    constructor(width: number, height: number) {
        this._canvas = Array(width)
        for (let i = 0; i < width; i++) {
            this._canvas[i] = Array(height).fill(0)
        }
    }

    public AddClaim(claim: Claim) {
        for (let i = 0; i < claim.width; i++) {
            for (let j = 0; j < claim.height; j++) {
                this._canvas[claim.x + i][claim.y + j]++
            }
        }
    }

    public FindConflicts(level: number): number {
        let conflicts = 0
        for (let i = 0; i < this._canvas.length; i++) {
            for (let j = 0; j < this._canvas[i].length; j++) {
                if (this._canvas[i][j] >= level) {
                    conflicts++
                }
            }
        }
        return conflicts
    }
}
