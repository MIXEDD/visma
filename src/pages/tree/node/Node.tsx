import React from 'react';
import { useDispatch } from 'react-redux';

import { OrderDirection, TreeData } from '../../../store/tree/types';
import Typography from '../../../atoms/typography/Typography';
import DeleteIcon from '../../../atoms/deleteIcon/DeleteIcon';
import { onDeleteNode, onOrderNode } from '../../../store/tree/actions';
import Arrow, { ArrowDirection } from '../../../atoms/arrow/Arrow';

import styles from './Node.module.scss';

interface Props {
    treeData: TreeData;
    parentFullName?: string;
    orderUp?: boolean;
    orderDown?: boolean;
}

const getOrderDirection = (subNodesLength: number, nodeIndex: number) => {
    if (subNodesLength > 1) {
        if (nodeIndex === 0) {
            return {
                orderDown: true,
            };
        }

        if (nodeIndex === subNodesLength - 1) {
            return {
                orderUp: true,
            };
        }

        return {
            orderDown: true,
            orderUp: true,
        };
    }

    return undefined;
};

const Node: React.FC<Props> = (props) => {
    const {
        treeData: { fullName, email, subNodes },
        parentFullName,
        orderUp,
        orderDown,
    } = props;

    const dispatch = useDispatch();

    const onClickDelete = () => {
        dispatch(onDeleteNode(fullName));
    };

    const onClickOrder = (direction: ArrowDirection) => {
        dispatch(
            onOrderNode(
                fullName,
                direction === ArrowDirection.Up ? OrderDirection.Up : OrderDirection.Down,
            ),
        );
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
                <div className={orderUp || orderDown ? styles.marginRight : undefined}>
                    <DeleteIcon onClick={onClickDelete} />
                </div>
                {orderDown && <Arrow direction={ArrowDirection.Down} onClick={onClickOrder} />}
                {orderUp && <Arrow direction={ArrowDirection.Up} onClick={onClickOrder} />}
            </div>
            {subNodes?.map((node, index) => (
                <Node
                    key={index}
                    treeData={node}
                    parentFullName={fullName}
                    {...getOrderDirection(subNodes.length, index)}
                />
            ))}
        </div>
    );
};

export default Node;
