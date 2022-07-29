import React from 'react';

import DelIcon from '../../assets/icons/delete-button.svg';

import styles from './DeleteIcon.module.scss';

interface Props {
    onClick: () => void;
}

const DeleteIcon: React.FC<Props> = (props) => {
    const { onClick } = props;

    return <img className={styles.DeleteIcon} onClick={onClick} src={DelIcon} alt="Delete icon" />;
};

export default DeleteIcon;
