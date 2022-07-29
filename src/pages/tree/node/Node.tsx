import React from 'react';
import { useDispatch } from 'react-redux';

import { TreeData } from '../../../store/tree/types';
import Typography from '../../../atoms/typography/Typography';
import DeleteIcon from '../../../atoms/deleteIcon/DeleteIcon';
import { onDeleteNode, onOrderNode } from '../../../store/tree/actions';
import Arrow, { ArrowDirection } from '../../../atoms/arrow/Arrow';

import styles from './Node.module.scss';

interface Props {
    treeData: TreeData;
    parentFullName?: string;
    orderDirection?: ArrowDirection;
}

const getOrderDirection = (subNodesLength: number, nodeIndex: number) => {
    if (subNodesLength > 1 && nodeIndex === 0) {
        return ArrowDirection.Down;
    }

    if (subNodesLength > 1 && nodeIndex > 0) {
        return ArrowDirection.Up;
    }

    return undefined;
};

const Node: React.FC<Props> = (props) => {
    const {
        treeData: { fullName, email, subNodes },
        parentFullName,
        orderDirection,
    } = props;

    const dispatch = useDispatch();

    const onClickDelete = () => {
        dispatch(onDeleteNode(fullName));
    };

    const onClickOrder = () => {
        dispatch(onOrderNode(fullName));
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
                <div className={orderDirection ? styles.marginRight : undefined}>
                    <DeleteIcon onClick={onClickDelete} />
                </div>
                {(orderDirection || orderDirection === ArrowDirection.Up) && (
                    <Arrow direction={orderDirection} onClick={onClickOrder} />
                )}
            </div>
            {subNodes?.map((node, index) => (
                <Node
                    key={index}
                    treeData={node}
                    parentFullName={fullName}
                    orderDirection={getOrderDirection(subNodes.length, index)}
                />
            ))}
        </div>
    );
};

export default Node;
