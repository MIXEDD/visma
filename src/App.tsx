import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Tree from './pages/tree/Tree';
import { ROUTES } from './constants';
import Root from './pages/root/Root';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={ROUTES.ROOT} element={<Root />} />
                <Route path={ROUTES.TREE} element={<Tree />} />
            </Routes>
        </div>
    );
}

export default App;
