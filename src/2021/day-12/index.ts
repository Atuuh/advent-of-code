type Cave = {
    name: string
    size: 'big' | 'small'
    connectedCaves: Cave[]
}

type Path = {
    nodes: Cave[]
}

export const getCaveNetwork = (input: string[]): Cave => {
    const caveConnections = input.map((line) => line.split('-'))

    const startingCave: Cave = {
        name: 'start',
        size: 'small',
        connectedCaves: [],
    }

    const caves = [startingCave]

    const addConnections = (connections: string[][]): void => {
        const remainingConnections = connections.filter(
            ([a, b]) => true // addConnection([a, b])
        )
        if (remainingConnections.length === 0) {
            return
        } else {
            return addConnections(remainingConnections)
        }
    }

    addConnections(caveConnections)

    return startingCave
}

const createCave = (name: string): Cave => ({
    name,
    size: name.toLowerCase() === name ? 'small' : 'big',
    connectedCaves: [],
})

const findCave = (caves: Cave[], name: string): Cave | undefined =>
    caves.find((cave) => cave.name === name)

export const getAllPaths = (cave: Cave): Path[] => {
    return []
}
