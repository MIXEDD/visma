import { INITIAL_STATE, SET_NODE } from './constants';
import { NodeForInsertion, TreeData } from './types';
import { insertNodeToParent } from '../../utils/tree';
import * as R from 'ramda';

export interface TreeState extends TreeData {}

const initialState: TreeState = INITIAL_STATE;

const setNode = (treeData: TreeData, node: NodeForInsertion) => {
    const clonedTreeState = R.clone(treeData);
    insertNodeToParent(clonedTreeState, node);

    return clonedTreeState;
};

export function treeReducer(state: TreeState = initialState, action: any) {
    switch (action.type) {
        case SET_NODE: {
            state = setNode(state, action.payload);

            return state;
        }
        default:
            return state;
    }
}
