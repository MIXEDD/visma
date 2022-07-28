import React, { useState } from 'react';
import styles from './InputField.module.scss';
import { useStore } from 'react-redux';

export enum Type {
    Text = 'text',
}

interface Props {
    name: string;
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
    const { name, label, onChangeInput, type = Type.Text, format, value, validations } = props;

    const [errors, setErrors] = useState<string[]>([]);

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
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

        const errorMessages = validations.validationFunctions
            .map((validationFunc) => {
                const result = validationFunc(value);

                if (typeof result === 'string') {
                    return result;
                }

                return null;
            })
            .filter(Boolean) as string[];

        setErrors(errorMessages);

        if (errorMessages.length) {
            validations.setFormError(true);
        }
    };

    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <input
                className={styles.inputField}
                id={name}
                type={type}
                onChange={onChange}
                value={value}
                onBlur={onValidate}
            />
            {errors.map((validationError, index) => (
                <span key={index} className={styles.error}>
                    {validationError}
                </span>
            ))}
        </div>
    );
});

export default InputField;
