import { INITIAL_STATE, SET_NODE } from './constants';
import { TreeNode } from './types';

interface State extends TreeNode {
    subNodes?: Array<TreeNode>;
}

const initialState: State = INITIAL_STATE;

export function treeReducer(state: State = initialState, action: any) {
    switch (action.type) {
        case SET_NODE: {
            state = action.payload;

            break;
        }
        default:
            return state;
    }
}
