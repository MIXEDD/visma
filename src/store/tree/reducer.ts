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

export function treeReducer(state: TreeState | null = initialState, action: TreeAction) {
    switch (action.type) {
        case SET_NODE: {
            if (state) {
                const clonedTreeState = R.clone(state);
                insertNodeToParent(clonedTreeState, (action as SetNodeAction).payload);

                return clonedTreeState;
            }

            return state;
        }
        case DELETE_NODE: {
            const fullName = (action as DeleteNodeAction).payload;

            if (state) {
                let clonedTreeState: TreeData | null = R.clone(state);

                const result = deleteParentNode(clonedTreeState, fullName);

                if (result === null) {
                    return null;
                }

                if (result) {
                    return clonedTreeState;
                }

                deleteTreeNode(clonedTreeState, fullName);

                return clonedTreeState;
            }

            return state;
        }
        case ORDER_NODE: {
            const fullName = (action as OrderNodeAction).payload;

            if (state) {
                const clonedTreeState = R.clone(state);

                orderTreeNode(clonedTreeState, fullName);

                return clonedTreeState;
            }

            return state;
        }
        default:
            return state;
    }
}
