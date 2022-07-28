import React, { useState } from 'react';

import Typography, { Color } from '../typography/Typography';
import { onValidateField } from '../../utils/atom';

import styles from './InputField.module.scss';

export enum Type {
    Text = 'text',
}

interface Props {
    label: string;
    onChangeInput: (value: string) => void;
    type?: Type;
    format?: (value: string) => string;
    value: string;
    validations?: {
        validationFunctions: Array<(value: string) => string | boolean>;
        setFormError: (isError: boolean) => void;
    };
}

const InputField: React.FC<Props> = React.memo((props) => {
    const { label, onChangeInput, type = Type.Text, format, value, validations } = props;

    const [errors, setErrors] = useState<string[]>([]);

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (errors.length) {
            setErrors([]);
        }

        if (format) {
            onChangeInput(format(event.currentTarget.value));

            return;
        }

        onChangeInput(event.currentTarget.value);
    };

    const onValidate = () => {
        if (!validations) {
            return;
        }

        onValidateField(
            validations.validationFunctions,
            value,
            validations.setFormError,
            setErrors,
        );
    };

    return (
        <div className={styles.container}>
            <label>{label}</label>
            <input
                className={styles.inputField}
                type={type}
                onChange={onChange}
                value={value}
                onBlur={onValidate}
            />
            {errors.map((validationError, index) => (
                <Typography key={index} color={Color.Error} text={validationError} />
            ))}
        </div>
    );
});

export default InputField;
