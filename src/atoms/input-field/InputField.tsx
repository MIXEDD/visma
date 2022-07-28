import React from 'react';
import styles from './InputField.module.scss';

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
}

const InputField: React.FC<Props> = React.memo((props) => {
    const { name, label, onChangeInput, type = Type.Text, format, value } = props;

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (format) {
            onChangeInput(format(event.currentTarget.value));

            return;
        }

        onChangeInput(event.currentTarget.value);
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
            />
        </div>
    );
});

export default InputField;
