import React from 'react';

import { TreeData } from '../../../store/tree/types';
import Typography from '../../../atoms/typography/Typography';

import styles from './Node.module.scss';

interface Props {
    treeData: TreeData;
    parentFullName?: string;
}

const Node: React.FC<Props> = (props) => {
    const {
        treeData: { fullName, email, subNodes },
        parentFullName,
    } = props;

    return (
        <div className={styles.container}>
            <div className={styles.node}>
                <div className={styles.marginRight}>
                    <Typography text={fullName} />
                </div>
                <div className={parentFullName ? styles.marginRight : undefined}>
                    <Typography text={email} />
                </div>
                {parentFullName && (
                    <div>
                        <Typography text={parentFullName} />
                    </div>
                )}
            </div>
            {subNodes && subNodes.map((node) => <Node treeData={node} parentFullName={fullName} />)}
        </div>
    );
};

export default Node;
