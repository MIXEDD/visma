import React from 'react';
import { useDispatch } from 'react-redux';

import { TreeData } from '../../../store/tree/types';
import Typography from '../../../atoms/typography/Typography';

import styles from './Node.module.scss';
import DeleteIcon from '../../../atoms/DeleteIcon/DeleteIcon';
import { onDeleteNode } from '../../../store/tree/actions';

interface Props {
    treeData: TreeData;
    parentFullName?: string;
}

const Node: React.FC<Props> = (props) => {
    const {
        treeData: { fullName, email, subNodes },
        parentFullName,
    } = props;

    const dispatch = useDispatch();

    const onClickDelete = () => {
        dispatch(onDeleteNode(fullName));
    };

    return (
        <div className={styles.container}>
            <div className={styles.node}>
                <div className={styles.marginRight}>
                    <Typography text={fullName} />
                </div>
                <div className={styles.marginRight}>
                    <Typography text={email} />
                </div>
                {parentFullName && (
                    <div className={styles.marginRight}>
                        <Typography text={parentFullName} />
                    </div>
                )}
                <DeleteIcon onClick={onClickDelete} />
            </div>
            {subNodes &&
                subNodes.map((node, index) => (
                    <Node key={index} treeData={node} parentFullName={fullName} />
                ))}
        </div>
    );
};

export default Node;
