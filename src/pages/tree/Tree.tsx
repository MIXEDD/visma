import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import Node from './node/Node';
import Typography from '../../atoms/typography/Typography';
import { isTreeFull } from '../../utils/tree';

const Tree: React.FC = () => {
    const treeState = useSelector((state: RootState) => state.tree);

    if (!treeState) {
        return <Typography text="No data available" />;
    }

    if (isTreeFull(treeState)) {
        return <Typography text="Tree cannot have more thant 2000 nodes" />;
    }

    return <Node treeData={treeState} />;
};

export default Tree;
