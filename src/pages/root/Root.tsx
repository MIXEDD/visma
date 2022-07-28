import React from 'react';
import InputField from '../../atoms/input-field/InputField';
import Typography, { ElementType } from '../../atoms/typography/Typography';
import Button from '../../atoms/button/Button';

import styles from './Root.module.scss';

const Root: React.FC = () => {
    return (
        <div className={styles.container}>
            <Typography text="Create form" elementType={ElementType.H1} />
            <InputField name="fullname" label="Fullname:" onChangeInput={() => {}} />
            <InputField name="email" label="Email:" onChangeInput={() => {}} />
            <Button text="Create" onClick={() => {}} />
        </div>
    );
};

export default Root;
