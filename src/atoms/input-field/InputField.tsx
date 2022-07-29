import React from 'react';

import Typography, { Color } from '../typography/Typography';

import styles from './InputField.module.scss';

export enum Type {
    Text = 'text',
}

interface Props {
    label: string;
    onChangeInput: (value: string) => void;
    type?: Type;
    format?: (value: string) => string;
    errors?: string[];
    value: string;
}

const InputField: React.FC<Props> = React.memo((props) => {
    const { label, onChangeInput, type = Type.Text, format, errors, value } = props;

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (format) {
            onChangeInput(format(event.currentTarget.value));

            return;
        }

        onChangeInput(event.currentTarget.value);
    };

    return (
        <div className={styles.container}>
            <label>{label}</label>
            <input className={styles.inputField} type={type} onChange={onChange} value={value} />
            {errors?.map((validationError, index) => (
                <Typography key={index} color={Color.Error} text={validationError} />
            ))}
        </div>
    );
});

export default InputField;
