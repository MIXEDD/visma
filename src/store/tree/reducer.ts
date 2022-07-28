import { INITIAL_STATE, SET_NODE } from './constants';
import { TreeData } from './types';

export interface TreeState extends TreeData {}

const initialState: TreeState = INITIAL_STATE;

export function treeReducer(state: TreeState = initialState, action: any) {
    switch (action.type) {
        case SET_NODE: {
            state = action.payload;

            break;
        }
        default:
            return state;
    }
}
