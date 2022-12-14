type Position = { x: number; y: number }

const areTouching = (a: Position, b: Position): boolean =>
    a.x >= b.x - 1 && a.x <= b.x + 1 && a.y >= b.y - 1 && a.y <= b.y + 1

export const areSamePosition = (a: Position, b: Position): boolean =>
    a.x === b.x && a.y === b.y

export type Direction = 'U' | 'D' | 'L' | 'R'

type MoveResult = Position[][]

const headMoves: Record<Direction, [number, number]> = {
    U: [0, 1],
    D: [0, -1],
    L: [-1, 0],
    R: [1, 0],
}

const last = <T>(array: T[]): T => array[array.length - 1]

const move = (
    nodePositions: Position[][],
    direction: Direction
): MoveResult => {
    const previousNodes = nodePositions.map((nodes) => last(nodes))
    const [head, ...tailNodes] = previousNodes
    const headMove = headMoves[direction]
    const newHead = { x: head.x + headMove[0], y: head.y + headMove[1] }

    const newRope = tailNodes.reduce(
        (newNodes, tailNode) => [
            ...newNodes,
            moveTail(tailNode, last(newNodes)),
        ],
        [newHead]
    )
    return nodePositions.map((nodes, index) => [...nodes, newRope[index]])
}

const moveTail = (tail: Position, head: Position): Position => {
    if (areTouching(tail, head)) {
        return tail
    }
    const xVector = tail.x - head.x < 0 ? 1 : -1
    const yVector = tail.y - head.y < 0 ? 1 : -1
    if (tail.x === head.x) {
        return { x: tail.x, y: tail.y + yVector }
    }
    if (tail.y === head.y) {
        return { x: tail.x + xVector, y: tail.y }
    }
    return {
        x: tail.x + xVector,
        y: tail.y + yVector,
    }
}

export type Command = [Direction, number]

export const getAllPositions = (ropeLength: number) => (commands: Command[]) =>
    commands
        .flatMap<Direction>(([direction, amount]) =>
            new Array(amount).fill(direction)
        )
        .reduce(move, new Array<Position[]>(ropeLength).fill([{ x: 0, y: 0 }]))
