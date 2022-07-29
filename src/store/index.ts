import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { treeReducer, TreeState } from './tree/reducer';

const rootReducer = combineReducers({
    tree: treeReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export interface RootState {
    tree: TreeState;
}
