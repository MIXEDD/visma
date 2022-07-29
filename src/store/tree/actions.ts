import { DeleteNodeAction, NodeForInsertion, OrderNodeAction, SetNodeAction } from './types';
import { DELETE_NODE, ORDER_NODE, SET_NODE } from './constants';

export const onSetNode = (node: NodeForInsertion): SetNodeAction => ({
    type: SET_NODE,
    payload: node,
});

export const onDeleteNode = (fullName: string): DeleteNodeAction => ({
    type: DELETE_NODE,
    payload: fullName,
});

export const onOrderNode = (fullName: string): OrderNodeAction => ({
    type: ORDER_NODE,
    payload: fullName,
});
