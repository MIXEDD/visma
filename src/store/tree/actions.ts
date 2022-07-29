import { DeleteNodeAction, NodeForInsertion, SetNodeAction } from './types';
import { DELETE_NODE, SET_NODE } from './constants';

export const onSetNode = (node: NodeForInsertion): SetNodeAction => ({
    type: SET_NODE,
    payload: node,
});

export const onDeleteNode = (fullName: string): DeleteNodeAction => ({
    type: DELETE_NODE,
    payload: fullName,
});
