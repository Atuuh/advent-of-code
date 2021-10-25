import { Advent } from '../advent'
import { input } from './input'

export class DaySeven extends Advent {
    constructor() {
        super()
        this.DayNumber = 'Day Seven'
        this.Input = input

        let graph = this.parseInput(this.Input.split('\n'))

        let output = ''
        do {
            const root = graph.GetRoot()
            output += root.value
            // if (graph.GetAllNodes().length === 1) {
            //     break
            // }
            graph.DeleteNode(root.value)
        } while (graph.GetAllNodes().length === 1)

        this.PartA = output

        graph = this.parseInput(this.Input.split('\n'))
        let roots: Array<number>
        const workToDo = [...Array(26).keys()].map((x) => (x += 61))
        let workers = new Array<number>()
        let seconds = 0

        do {
            roots = graph
                .GetRoots()
                .map((x) => x.value.toLowerCase())
                .sort()
                .map(this.getIndexForChar)

            // Assign work
            for (let i = 0; i < roots.length; i++) {
                const node = roots[i]
                if (workers.length < 5 && !workers.includes(node)) {
                    workers.push(node)
                }
            }

            // Do work
            for (let i = 0; i < workers.length; i++) {
                const node = workers[i]

                workToDo[node]--
            }

            // Cleanup
            let newWorkers = workers
            for (let i = 0; i < workers.length; i++) {
                const node = workers[i]
                if (workToDo[node] <= 0) {
                    newWorkers = newWorkers.filter((x) => x !== node)
                    graph.DeleteNode(this.getCharForIndex(node).toUpperCase())
                }
            }
            workers = newWorkers

            seconds++
        } while (workToDo.filter((x) => x > 0).length > 0)

        this.PartB = seconds.toString()
    }

    getIndexForChar(char: string): number {
        return char.charCodeAt(0) - 97
    }

    getCharForIndex(index: number): string {
        return String.fromCharCode(index + 97)
    }

    parseInput(inputs: string[]): UniqueGraph<string> {
        const regex = /(?:Step (.)).*(?:step (.).*)/
        const matches = inputs
            .map((value) => value.split(regex))
            .map((value) => value.filter((t) => !!t))

        const firstNode = new UniqueGraphNode<string>(matches[0][0])
        const child = new UniqueGraphNode<string>(matches[0][1], firstNode)
        matches.splice(0, 1)
        const graph = new UniqueGraph(firstNode)
        firstNode.children.push(child)
        while (matches.length > 0) {
            for (const [index, value] of matches.entries()) {
                if (graph.AddNode(value[0], value[1])) {
                    matches.splice(index, 1)
                }
            }
        }
        return graph
    }
}

class UniqueGraph<T> {
    initial: UniqueGraphNode<T>
    constructor(root: UniqueGraphNode<T>) {
        this.initial = root
    }

    GetAllNodes(): Array<UniqueGraphNode<T>> {
        const nodeList = [this.initial]
        for (const node of nodeList) {
            if (node.parents.length > 0) {
                for (const parent of node.parents) {
                    if (!nodeList.includes(parent)) {
                        nodeList.push(parent)
                    }
                }
            }
            if (node.children.length > 0) {
                for (const child of node.children) {
                    if (!nodeList.includes(child)) {
                        nodeList.push(child)
                    }
                }
            }
        }
        return nodeList
    }

    AddNode(parent: T, child: T): boolean {
        let parentNode = this.FindNode(parent)
        let childNode = this.FindNode(child)
        if (!parentNode && !childNode) {
            return false
        }
        if (!parentNode) {
            parentNode = new UniqueGraphNode<T>(parent)
        } else if (!childNode) {
            childNode = new UniqueGraphNode<T>(child)
        }
        this.CreateEdge(parentNode, childNode)
        return true
    }

    DeleteNode(nodeValue: T) {
        const node = this.FindNode(nodeValue)
        node.children.forEach((child) => {
            child.parents = child.parents.filter((x) => x.value !== nodeValue)
        })
        node.parents.forEach((parent) => {
            parent.children = parent.children.filter(
                (x) => x.value !== nodeValue
            )
        })
        if (
            this.initial.value === nodeValue &&
            this.initial.children.length > 0
        ) {
            const values = this.GetAllNodes()
                .filter((x) => x.parents.length === 0 && x.value !== nodeValue)
                .map((x) => x.value)
                .sort()
            this.initial = this.FindNode(values[0])
        }
    }

    FindNode(value: T): UniqueGraphNode<T> | null {
        const nodes = this.GetAllNodes()
        for (const node of nodes) {
            if (node.value === value) {
                return node
            }
        }
        return null
    }

    CreateEdge(parent: UniqueGraphNode<T>, child: UniqueGraphNode<T>) {
        parent.children.push(child)
        child.parents.push(parent)
    }

    GetRoot(): UniqueGraphNode<T> {
        const values = this.GetAllNodes()
            .filter((x) => x.parents.length === 0)
            .map((x) => x.value)
            .sort()

        return this.FindNode(values[0])
    }

    GetRoots(): Array<UniqueGraphNode<T>> {
        return this.GetAllNodes().filter((node) => node.parents.length === 0)
    }
}

class UniqueGraphNode<T> {
    value: T
    parents: Array<UniqueGraphNode<T>> = new Array<UniqueGraphNode<T>>()
    children: Array<UniqueGraphNode<T>> = new Array<UniqueGraphNode<T>>()
    constructor(
        value: T,
        parent?: UniqueGraphNode<T>,
        child?: UniqueGraphNode<T>
    ) {
        this.value = value
        if (parent) {
            this.parents.push(parent)
        }
        if (child) {
            this.children.push(child)
        }
    }
}
