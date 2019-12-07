import { TreeNode } from './tree-node';

describe('2019 - Shared', () => {
    describe('Tree Node', () => {
        test('root', () => {
            const graph = createGraph();
            expect(graph.root.name).toBe('a');
        });

        test('iterator', () => {
            const graph = createGraph();

            const asArray = new Array(...graph.traverse());

            expect(asArray.length).toBe(6);
        });

        test('find - exists', () => {
            const graph = createGraph();
            expect(graph.find('e')).toBeTruthy();
        });

        test('find - doesnt exist', () => {
            const graph = createGraph();
            expect(graph.find('x')).toBeFalsy();
        });

        test('getDistanceToRoot', () => {
            const graph = createGraph();
            expect(graph.getDistanceToRoot()).toBe(2);
        });
    });
});

const createGraph = () => {
    const a = new TreeNode('a');
    const b = new TreeNode('b', a);
    const c = new TreeNode('c', a);
    const d = new TreeNode('d', c);
    const e = new TreeNode('e', d);
    const f = new TreeNode('f', b);
    return f;
};
