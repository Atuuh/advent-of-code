export type Vector2 = { x: number; y: number }
type Node = Vector2 & {
    parent?: Node
    opened: boolean
    closed: boolean
}
export const findPath =
    <T>(canMove: (from: Vector2, to: Vector2) => (grid: T[][]) => boolean) =>
    (
        grid: T[][],
        startingPosition: Vector2,
        isTargetPosition: (node: Vector2) => boolean
    ): Vector2[] => {
        const nodeGrid = grid.map((row, x) =>
            row.map<Node>((value, y) => ({
                closed: false,
                opened: false,
                x,
                y,
            }))
        )
        const startingNode = nodeGrid[startingPosition.x][startingPosition.y]
        const openList = [startingNode]

        while (openList.length > 0) {
            const node = openList.shift() as Node
            node.closed = true

            if (isTargetPosition(node)) {
                return backtrace(node)
            }

            const neighbours = getNeighbours(nodeGrid)(
                node.x,
                node.y,
                'cardinal'
            )
            for (const neighbour of neighbours) {
                if (neighbour.closed || neighbour.opened) {
                    continue
                }

                if (canMove(node, neighbour)(grid)) {
                    openList.push(neighbour)
                    neighbour.opened = true
                    neighbour.parent = node
                }
            }
        }

        return []
    }

const backtrace = (node: Node): Node[] => {
    const nodes: Node[] = []
    let thisNode: Node | undefined = node
    while (thisNode !== undefined) {
        nodes.push(thisNode)
        thisNode = thisNode.parent
    }
    return nodes
}

const getNeighbours =
    <T>(array: T[][]) =>
    (x: number, y: number, type: NeighbourType) =>
        getNeighbourVectors(type)
            .map(([i, j]) => array?.[x + i]?.[y + j] ?? null)
            .filter((item): item is NonNullable<T> => item !== null)

type NeighbourType = 'cardinal' | 'diagonal' | 'both'
const cardinalVectors = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
]

const diagonalVectors = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
]

const getNeighbourVectors = (type: NeighbourType) =>
    type === 'cardinal'
        ? cardinalVectors
        : type === 'diagonal'
        ? diagonalVectors
        : cardinalVectors.concat(diagonalVectors)

export const canClimbTo =
    (from: Vector2, to: Vector2) => (grid: string[][]) => {
        const fromChar = grid[from.x][from.y]
        const toChar = grid[to.x][to.y]
        const fromCode =
            fromChar === 'S' ? 'a'.charCodeAt(0) : fromChar.charCodeAt(0)
        const toCode = toChar === 'E' ? 'z'.charCodeAt(0) : toChar.charCodeAt(0)
        return toCode <= fromCode + 1
    }
