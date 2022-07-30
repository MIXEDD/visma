import React from 'react';
import classnames from 'classnames';

import ArrowIcon from '../../assets/icons/arrow.svg';

import styles from './Arrow.module.scss';

export enum ArrowDirection {
    Up = '',
    Down = 'down',
}

interface Props {
    direction?: ArrowDirection;
    onClick: (direction: ArrowDirection) => void;
}

const Arrow: React.FC<Props> = (props) => {
    const { direction = ArrowDirection.Up, onClick } = props;

    const onArrowClick = () => {
        onClick(direction);
    };

    return (
        <img
            className={classnames(styles.image, styles[direction])}
            onClick={onArrowClick}
            src={ArrowIcon}
            alt="arrow"
        />
    );
};

export default Arrow;
