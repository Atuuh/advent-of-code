export class TreeNode {
    name: string;
    parent: TreeNode | undefined;
    children: TreeNode[];

    constructor(name: string, parent?: TreeNode, children?: TreeNode[]) {
        this.name = name;
        this.parent = parent;
        this.children = children ?? [];
        if (this.parent && !this.parent.children.includes(this)) {
            this.parent.children.push(this);
        }
    }

    get root(): TreeNode {
        return this.parent ? this.parent.root : this;
    }

    getDistanceToRoot(): number {
        return this.parent ? this.parent.getDistanceToRoot() + 1 : 0;
    }

    *traverse(): Generator<TreeNode> {
        function* helper(node: TreeNode): Generator<TreeNode> {
            yield node;
            for (const child of node.children) {
                yield* helper(child);
            }
        }
        yield* helper(this.root);
    }

    find(name: string): TreeNode | undefined {
        for (const node of this.traverse()) {
            if (node.name === name) {
                return node;
            }
        }
    }
}
