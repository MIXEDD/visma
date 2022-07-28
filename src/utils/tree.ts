import { NodeForInsertion, TreeData, TreeNode } from '../store/tree/types';

export const getTreeNodes = (treeData: TreeData): Array<{ value: string; label: string }> => {
    const treeNodes = [];

    treeNodes.push({
        value: treeData.fullName,
        label: treeData.fullName,
    });

    if (treeData.subNodes) {
        for (const node of treeData.subNodes) {
            treeNodes.push(...getTreeNodes(node));
        }
    }

    return treeNodes;
};

export const insertNodeToParent = (treeData: TreeData, node: NodeForInsertion): boolean => {
    if (treeData.fullName === node.coach) {
        treeData.subNodes = [
            ...(treeData.subNodes || []),
            {
                fullName: node.fullName,
                email: node.email,
            },
        ];

        return true;
    }

    if (treeData.subNodes) {
        for (const element of treeData.subNodes) {
            if (insertNodeToParent(element, node)) {
                return true;
            }
        }
    }

    return false;
};
