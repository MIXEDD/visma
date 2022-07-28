import React, { useState } from 'react';
import InputField from '../../atoms/input-field/InputField';
import Typography, { ElementType } from '../../atoms/typography/Typography';
import Button from '../../atoms/button/Button';
import { formatSpecialCharactersAndNumbers } from '../../utils/format';

import styles from './Root.module.scss';
import {
    isEmailValid,
    isFullNameNoMoreThanFourWords,
    isFullNameStartsWithCapitalLetter,
} from '../../utils/validations';

const Root: React.FC = () => {
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const onChangeFullName = (value: string) => {
        setFullname(value);
    };

    const onSetEmail = (value: string) => {
        setEmail(value);
    };

    const onClickSubmit = () => {};

    return (
        <div className={styles.container}>
            <Typography text="Create form" elementType={ElementType.H1} />
            <InputField
                name="fullname"
                label="Full name:"
                onChangeInput={onChangeFullName}
                value={fullname}
                format={formatSpecialCharactersAndNumbers}
            />
            <InputField name="email" label="Email:" onChangeInput={onSetEmail} value={email} />
            <Button text="Create" onClick={onClickSubmit} />
        </div>
    );
};

export default Root;
