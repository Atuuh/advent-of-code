type Operation = '+' | '-' | '*' | '/'
type ParentNode = {
    left: Node
    right: Node
    operation: Operation
    name: string
    parent?: Node
}
type LeafNode = {
    value: number
    name: string
    parent: Node
}
type Node = ParentNode | LeafNode

type UnlinkedParentNode = Pick<ParentNode, 'name' | 'operation' | 'parent'> & {
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

    const newNode: Node = {
        name: node.name,
        operation: node.operation,
        left: linkNodes(array, leftNode as UnlinkedParentNode),
        right: linkNodes(array, rightNode as UnlinkedParentNode),
    }

    newNode.left.parent = newNode
    newNode.right.parent = newNode

    return newNode
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

const getNode = (name: string, node: Node) => {
    let nodes: Node[] = [node]
    while (!nodes.some((n) => n.name === name)) {
        nodes = nodes.flatMap((n) => (isLeafNode(n) ? n : [n.left, n.right]))
    }
    return nodes.find((n) => n.name === name)
}

const getAllNodesTo = (root: Node, target: string): Node[] => {
    let node = getNode(target, root) as Node
    const nodes: Node[] = []
    while (node?.parent) {
        nodes.push(node)
        node = node.parent
    }
    return [...nodes, node]
}

export const getHumanValue = (root: Node): number => {
    const nodes = getAllNodesTo(root, 'humn').slice(0, -1)

    const left = (root as ParentNode).left
    const right = (root as ParentNode).right

    const targetValue = nodes.includes(left) ? getValue(right) : getValue(left)

    return nodes.reduceRight((toEqual, node) => {
        if (isLeafNode(node)) {
            return toEqual
        }
        const isRightFixed = nodes.includes(node.left)
        const rhs = getValue(isRightFixed ? node.right : node.left)

        switch (node.operation) {
            case '+':
                return toEqual - rhs
            case '-':
                return isRightFixed ? toEqual + rhs : rhs - toEqual
            case '*':
                return toEqual / rhs
            case '/':
                return isRightFixed ? toEqual * rhs : rhs / toEqual
        }
    }, targetValue)
}
