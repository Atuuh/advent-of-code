type Operation = '+' | '-' | '*' | '/'
type ParentNode = {
    left: Node
    right: Node
    operation: Operation
    name: string
}
type LeafNode = {
    value: number
    name: string
}
type Node = ParentNode | LeafNode

type UnlinkedParentNode = Pick<ParentNode, 'name' | 'operation'> & {
    left: string
    right: string
}

const createNode = (line: string) => {
    const [name, values] = line.split(': ')
    const [left, operation, right] = values.split(' ')
    if (operation) {
        return {
            name,
            operation: operation as Operation,
            left,
            right,
        } as UnlinkedParentNode
    } else {
        return { name, value: +left } as LeafNode
    }
}

const linkNodes = (
    array: (LeafNode | UnlinkedParentNode)[],
    node: UnlinkedParentNode | LeafNode
): Node => {
    if (isLeafNode(node)) {
        return node
    }
    const [leftNode, rightNode] = [node.left, node.right].map(
        (name) =>
            array.find((n) => n.name === name) as UnlinkedParentNode | Node
    )
    return {
        name: node.name,
        operation: node.operation,
        left: linkNodes(array, leftNode as UnlinkedParentNode),
        right: linkNodes(array, rightNode as UnlinkedParentNode),
    }
}

export const parseInput = (input: string) => {
    const unlinkedNodes = input.split('\n').map(createNode)
    const root = unlinkedNodes.find(
        (node) => node.name === 'root'
    ) as UnlinkedParentNode
    return linkNodes(unlinkedNodes, root)
}

const isLeafNode = (node: Node | UnlinkedParentNode): node is LeafNode =>
    (node as LeafNode).value !== undefined

const doOperation = (left: number, right: number, operation: Operation) => {
    switch (operation) {
        case '+':
            return left + right
        case '-':
            return left - right
        case '*':
            return left * right
        case '/':
            return left / right
    }
}

export const getValue = (node: Node): number =>
    isLeafNode(node)
        ? node.value
        : doOperation(getValue(node.left), getValue(node.right), node.operation)
