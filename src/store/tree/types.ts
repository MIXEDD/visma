import { SET_NODE } from './constants';

export interface TreeNode {
    fullName: string;
    email: string;
}

export interface TreeData extends TreeNode {
    subNodes?: Array<TreeNode>;
}

export interface NodeForInsertion extends TreeNode {
    coach: string;
}

export interface SetNodeAction {
    type: typeof SET_NODE;
    payload: NodeForInsertion;
}
