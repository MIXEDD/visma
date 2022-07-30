import { NodeForInsertion, OrderDirection, TreeData } from '../store/tree/types';
import * as R from 'ramda';

const MAX_NODES_COUNT = 2000;

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

export const isTreeFull = (treeData: TreeData) => getTreeNodes(treeData).length > MAX_NODES_COUNT;

export const getTreeDataWithInsertedNode = (
    treeData: TreeData,
    node: NodeForInsertion,
): TreeData => {
    let data: TreeData = {
        ...treeData,
    };

    if (data.fullName === node.coach) {
        data.subNodes = [
            ...(data.subNodes || []),
            {
                fullName: node.fullName,
                email: node.email,
            },
        ];
    }

    if (data.subNodes?.length) {
        return {
            ...data,
            subNodes: data?.subNodes?.map((subNode) => {
                return getTreeDataWithInsertedNode(subNode, node);
            }),
        };
    }

    return data;
};

export const getTreeDataWithDeletedParent = (
    treeData: TreeData,
    fullName: string,
): TreeData | null | boolean => {
    const clonedTreeData = R.clone(treeData);

    if (clonedTreeData.fullName === fullName) {
        if (clonedTreeData.subNodes?.length) {
            const [parentNode, ...rest] = clonedTreeData.subNodes;

            return {
                fullName: parentNode.fullName,
                email: parentNode.email,
                subNodes: [...(parentNode.subNodes || []), ...rest],
            };
        }

        return null;
    }

    return false;
};

export const getTreeDataWithDeletedNode = (treeData: TreeData[], fullName: string): TreeData[] => {
    let data: TreeData[] = [...treeData];

    if (data.find((node) => node.fullName === fullName)) {
        const mappedSubNodes: TreeData[] = [];

        for (const node of data) {
            if (node.fullName === fullName) {
                if (node.subNodes) {
                    mappedSubNodes.push(...node.subNodes);
                }

                continue;
            }

            mappedSubNodes.push(node);
        }

        data = mappedSubNodes;
    }

    return data.map((node) => {
        if (node.subNodes?.length) {
            return {
                ...node,
                subNodes: getTreeDataWithDeletedNode(node.subNodes, fullName),
            };
        }

        return {
            ...node,
        };
    });
};

export const getOrderedTreeData = (
    treeData: Array<TreeData>,
    fullName: string,
    orderDirection: OrderDirection,
): TreeData[] => {
    const indexOfNode = treeData.findIndex((node) => node.fullName === fullName);
    let data: TreeData[] = [...treeData];

    if (orderDirection === OrderDirection.Up && indexOfNode >= 0) {
        data = R.move(indexOfNode, indexOfNode - 1, data);
    }

    if (orderDirection === OrderDirection.Down && indexOfNode >= 0) {
        data = R.move(indexOfNode, indexOfNode + 1, data);
    }

    return data.map((node) => {
        if (node.subNodes?.length) {
            return {
                ...node,
                subNodes: getOrderedTreeData(node.subNodes, fullName, orderDirection),
            };
        }

        return {
            ...node,
        };
    });
};
