import { DELETE_NODE, INITIAL_STATE, ORDER_NODE, SET_NODE } from './constants';
import { DeleteNodeAction, OrderNodeAction, SetNodeAction, TreeAction, TreeData } from './types';
import {
    getOrderedTreeData,
    getTreeDataWithDeletedNode,
    getTreeDataWithDeletedParent,
    getTreeDataWithInsertedNode,
} from '../../utils/tree';

export interface TreeState extends TreeData {}

const initialState: TreeState = INITIAL_STATE;

export function treeReducer(state: TreeState | null = initialState, action: TreeAction) {
    switch (action.type) {
        case SET_NODE: {
            if (state && state.subNodes) {
                return getTreeDataWithInsertedNode(state, (action as SetNodeAction).payload);
            }

            return state;
        }
        case DELETE_NODE: {
            const fullName = (action as DeleteNodeAction).payload;

            if (state) {
                const result = getTreeDataWithDeletedParent(state, fullName);

                if (result || result === null) {
                    return result;
                }

                if (state?.subNodes?.length) {
                    return {
                        ...state,
                        subNodes: getTreeDataWithDeletedNode(state.subNodes, fullName),
                    };
                }
            }

            return state;
        }
        case ORDER_NODE: {
            const payload = (action as OrderNodeAction).payload;

            if (state && state?.subNodes?.length) {
                return {
                    ...state,
                    subNodes: getOrderedTreeData(
                        state.subNodes,
                        payload.fullName,
                        payload.orderDirection,
                    ),
                };
            }

            return state;
        }
        default:
            return state;
    }
}
