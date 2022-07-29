import { DELETE_NODE, SET_NODE } from './constants';

export interface TreeData {
    fullName: string;
    email: string;
    subNodes?: Array<TreeData>;
}

export interface NodeForInsertion {
    fullName: string;
    email: string;
    coach: string;
}

export interface SetNodeAction {
    type: typeof SET_NODE;
    payload: NodeForInsertion;
}

export interface DeleteNodeAction {
    type: typeof DELETE_NODE;
    payload: string;
}

export type TreeAction = SetNodeAction | DeleteNodeAction;
