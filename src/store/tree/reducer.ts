import { DELETE_NODE, INITIAL_STATE, ORDER_NODE, SET_NODE } from './constants';
import {
    DeleteNodeAction,
    NodeForInsertion,
    OrderNodeAction,
    SetNodeAction,
    TreeAction,
    TreeData,
} from './types';
import {
    deleteParentNode,
    deleteTreeNode,
    insertNodeToParent,
    orderTreeNode,
} from '../../utils/tree';
import * as R from 'ramda';

export interface TreeState extends TreeData {}

const initialState: TreeState = INITIAL_STATE;

const setNode = (treeData: TreeData, node: NodeForInsertion) => {
    const clonedTreeState = R.clone(treeData);
    insertNodeToParent(clonedTreeState, node);

    return clonedTreeState;
};

const deleteNode = (treeData: TreeData, fullName: string) => {
    let clonedTreeState: TreeData | null = R.clone(treeData);

    const result = deleteParentNode(clonedTreeState, fullName);

    if (result === null) {
        return null;
    }

    if (result) {
        return clonedTreeState;
    }

    deleteTreeNode(clonedTreeState, fullName);

    return clonedTreeState;
};

export function treeReducer(state: TreeState | null = initialState, action: TreeAction) {
    switch (action.type) {
        case SET_NODE: {
            if (state) {
                state = setNode(state, (action as SetNodeAction).payload);
            }

            return state;
        }
        case DELETE_NODE: {
            if (state) {
                state = deleteNode(state, (action as DeleteNodeAction).payload);
            }

            return state;
        }
        case ORDER_NODE: {
            const fullName = (action as OrderNodeAction).payload;

            if (state) {
                const clonedTreeState = R.clone(state);

                orderTreeNode(clonedTreeState, fullName);

                state = clonedTreeState;
            }

            return state;
        }
        default:
            return state;
    }
}
