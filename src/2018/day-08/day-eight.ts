import { Advent } from '../advent'
import { input } from './input'

export class DayEight extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Eight'
        this.Input = input

        const inputData = this.Input.split(' ').map(Number)

        const root = this.ExtractNode({ input: inputData, i: 0 })
        this.PartA = root.MetadataValue.toString()
        this.PartB = root.MetaDataVariant.toString()
    }

    ExtractNode(model: { input: number[]; i: number }): TreeNode {
        const node = new TreeNode()
        node.h_children = model.input[model.i++]
        node.h_metadata = model.input[model.i++]

        for (let j = 0; j < node.h_children; j++) {
            node.children.push(this.ExtractNode(model))
        }

        for (let j = 0; j < node.h_metadata; j++) {
            node.metadata.push(model.input[model.i++])
        }

        return node
    }
}

class TreeNode {
    h_children: number
    h_metadata: number
    children: TreeNode[]
    metadata: number[]
    constructor() {
        this.children = new Array<TreeNode>()
        this.metadata = new Array<number>()
        this.h_children = 0
        this.h_metadata = 0
    }
    get MetadataValue(): number {
        const childValue = this.children.map((x) => x.MetadataValue)
        const meta = [...childValue, ...this.metadata]
        return meta.reduce((acc, next) => acc + next)
    }
    get MetaDataVariant(): number {
        if (this.h_children === 0) {
            return this.metadata.reduce((acc, total) => acc + total)
        }
        return this.metadata.reduce(
            (acc, next) =>
                next <= this.h_children
                    ? acc + this.children[next - 1].MetaDataVariant
                    : acc,
            0
        )
    }
}
