import { NodeForInsertion, TreeData } from '../store/tree/types';

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

export const deleteParentNode = (treeData: TreeData, fullName: string): boolean | null => {
    if (treeData.fullName === fullName) {
        if (treeData.subNodes?.length) {
            const [parentNode, ...rest] = treeData.subNodes;
            treeData.fullName = parentNode.fullName;
            treeData.email = parentNode.email;
            treeData.subNodes = [...(parentNode.subNodes || []), ...rest];

            return true;
        }

        return null;
    }

    return false;
};

export const deleteTreeNode = (treeData: TreeData, fullName: string): boolean => {
    if (treeData.subNodes) {
        if (treeData.subNodes.find((node) => node.fullName === fullName)) {
            const mappedSubNodes: Array<TreeData> = [];

            for (const node of treeData.subNodes) {
                if (node.fullName === fullName) {
                    if (node.subNodes) {
                        mappedSubNodes.push(...node.subNodes);
                    }

                    continue;
                }

                mappedSubNodes.push(node);
            }

            if (!mappedSubNodes.length) {
                delete treeData.subNodes;
            } else {
                treeData.subNodes = mappedSubNodes;
            }

            return true;
        }

        for (const node of treeData.subNodes) {
            deleteTreeNode(node, fullName);
        }
    }

    return false;
};
