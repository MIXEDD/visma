import { SET_NODE } from './constants';

interface State {
    tree: any;
}

const initialState: State = {
    tree: null,
};

export function treeReducer(state: State = initialState, action: any) {
    switch (action.type) {
        case SET_NODE: {
            state.tree = action.payload;

            break;
        }
        default:
            return state;
    }
}
