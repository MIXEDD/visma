import { DELETE_NODE, ORDER_NODE, SET_NODE } from './constants';

export interface TreeData {
    fullName: string;
    email: string;
    subNodes?: TreeData[];
}

export interface NodeForInsertion {
    fullName: string;
    email: string;
    coach: string;
}

export enum OrderDirection {
    Up = 'up',
    Down = 'down',
}

export interface SetNodeAction {
    type: typeof SET_NODE;
    payload: NodeForInsertion;
}

export interface DeleteNodeAction {
    type: typeof DELETE_NODE;
    payload: string;
}

export interface OrderNodeAction {
    type: typeof ORDER_NODE;
    payload: {
        fullName: string;
        orderDirection: OrderDirection;
    };
}

export type TreeAction = SetNodeAction | DeleteNodeAction | OrderNodeAction;
