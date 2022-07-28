import { NodeForInsertion, SetNodeAction } from './types';
import { SET_NODE } from './constants';

export const onSetNode = (node: NodeForInsertion): SetNodeAction => ({
    type: SET_NODE,
    payload: node,
});
