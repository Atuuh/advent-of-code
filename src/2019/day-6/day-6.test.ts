import { Node } from './day-6';

describe('2019 - Day Six', () => {
    describe('Node', () => {
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
    const a = new Node('a');
    const b = new Node('b', a);
    const c = new Node('c', a);
    const d = new Node('d', c);
    const e = new Node('e', d);
    const f = new Node('f', b);
    return f;
};
