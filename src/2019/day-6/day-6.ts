import { Input } from './input';
import { TreeNode } from '../shared/tree-node/tree-node';

const createGraph = (
    orbits: [string, string][],
    firstNode = 'COM'
): TreeNode => {
    const addNode = (targetNode: string) => {
        orbits
            .filter(([target, _]) => target === targetNode)
            .forEach(([target, orbiter]) => {
                const parent = graph.find(target);
                new TreeNode(orbiter, parent);
                addNode(orbiter);
            });
    };
    const graph = new TreeNode(firstNode);
    addNode(firstNode);
    return graph;
};

const getDistanceBetweenNodes = (
    graph: TreeNode,
    start: string,
    end: string
): number => {
    const startNode = graph.find(start) as TreeNode;

    let distance = 0;
    let searchedNodes = new Array<TreeNode>();
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
            ) as TreeNode[];
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
