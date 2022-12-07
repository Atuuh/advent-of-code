type Tree<T> = {
    value: T
    children: Tree<T>[]
    parent?: Tree<T>
}

const createTree = <T>(
    value: T,
    children: Tree<T>[] = [],
    parent?: Tree<T>
) => ({ value, children, parent })

type Directory = {
    isDirectory: true
    size: 0
    name: string
}

type File = {
    isDirectory: false
    size: number
    name: string
}

type NodeValue = Directory | File

export const createDirectoryTree = (input: string): Tree<NodeValue> => {
    const root = createTree<NodeValue>({
        isDirectory: true,
        size: 0,
        name: '/',
    })
    input.split('\n').slice(1).reduce(executeCommand, root)
    return root
}

export const getAllDirectoriesWithSize = (
    root: Tree<NodeValue>
): Record<string, number> => {
    const dirs = filterTree(root, (value) => value.isDirectory)
    return dirs.reduce(
        (dict, node) => ({
            ...dict,
            [node.value.name]: getDirectorySize(node),
        }),
        {}
    )
}

const filterTree = <T>(
    tree: Tree<T>,
    predicate: (node: T) => boolean
): Tree<T>[] => [
    ...(predicate(tree.value) ? [tree] : []),
    ...tree.children.flatMap((child) => filterTree(child, predicate)),
]

const getDirectorySize = (directory: Tree<NodeValue>): number =>
    directory.children.reduce(
        (totalSize, child) =>
            totalSize +
            (child.value.isDirectory
                ? getDirectorySize(child)
                : child.value.size),
        0
    )

const executeCommand = (currentNode: Tree<NodeValue>, line: string) => {
    if (line === '$ ls') {
        return currentNode
    } else if (line.startsWith('$ cd')) {
        const newDirectory = line.substring(5)
        if (newDirectory === '..') {
            return currentNode.parent as Tree<NodeValue>
        } else {
            return currentNode.children.find(
                (node) =>
                    node.value.name ===
                    `${currentNode.value.name}${newDirectory}/`
            ) as Tree<NodeValue>
        }
    } else if (line.startsWith('dir')) {
        const newDirectory = line.substring(4)
        currentNode.children.push(
            createTree(
                {
                    isDirectory: true,
                    name: `${currentNode.value.name}${newDirectory}/`,
                    size: 0,
                },
                [],
                currentNode
            )
        )
        return currentNode
    } else {
        const [size, name] = line.split(' ')
        currentNode.children.push(
            createTree(
                { isDirectory: false, name, size: Number(size) },
                [],
                currentNode
            )
        )
        return currentNode
    }
}
