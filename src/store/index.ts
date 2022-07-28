import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { treeReducer } from './tree/reducer';

const rootReducer = combineReducers({
    tree: treeReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
