import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import Node from './node/Node';

const Tree: React.FC = () => {
    const treeState = useSelector((state: RootState) => state.tree);

    return (
        <div>
            <Node treeData={treeState} />
        </div>
    );
};

export default Tree;
