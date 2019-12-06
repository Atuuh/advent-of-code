import { Input } from './input';

export class Node {
    name: string;
    parent: Node | undefined;
    children: Node[];

    constructor(name: string, parent?: Node, children?: Node[]) {
        this.name = name;
        this.parent = parent;
        this.children = children ?? [];

        if (this.parent && !this.parent.children.includes(this)) {
            this.parent.children.push(this);
        }
    }

    get root(): Node {
        return this.parent ? this.parent.root : this;
    }

    getDistanceToRoot(): number {
        return this.parent ? this.parent.getDistanceToRoot() + 1 : 0;
    }

    *traverse(): Generator<Node> {
        function* helper(node: Node): Generator<Node> {
            yield node;
            for (const child of node.children) {
                yield* helper(child);
            }
        }
        yield* helper(this.root);
    }

    find(name: string): Node | undefined {
        for (const node of this.traverse()) {
            if (node.name === name) {
                return node;
            }
        }
    }
}
const createGraph = (orbits: [string, string][], firstNode = 'COM'): Node => {
    const addNode = (targetNode: string) => {
        orbits
            .filter(([target, _]) => target === targetNode)
            .forEach(([target, orbiter]) => {
                const parent = graph.find(target);
                new Node(orbiter, parent);
                addNode(orbiter);
            });
    };
    const graph = new Node(firstNode);
    addNode(firstNode);
    return graph;
};

const getDistanceBetweenNodes = (
    graph: Node,
    start: string,
    end: string
): number => {
    const startNode = graph.find(start) as Node;

    let distance = 0;
    let searchedNodes = new Array<Node>();
    let nodesToSearch = [startNode];

    while (true) {
        const foundNode = nodesToSearch.find(node => node.name === end);

        if (foundNode) break;

        distance += 1;
        searchedNodes = searchedNodes.concat(nodesToSearch);
        nodesToSearch = nodesToSearch
            .flatMap(node => [node.parent, ...node.children])
            .filter(node =>
                node ? !searchedNodes.includes(node) : false
            ) as Node[];
    }

    return distance - 2;
};

export const DaySix = () => {
    const input = Input.split('\n');
    const orbits: [string, string][] = input.map(
        line => line.split(')') as [string, string]
    );

    const graph = createGraph(orbits);

    const partOne = new Array(...graph.traverse())
        .map(item => item.getDistanceToRoot())
        .reduce((acc, value) => acc + value);
    const partTwo = getDistanceBetweenNodes(graph, 'YOU', 'SAN');

    return { partOne, partTwo };
};
