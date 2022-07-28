import React, { ChangeEvent, useState } from 'react';

import Typography, { Color } from '../typography/Typography';
import { onValidateField } from '../../utils/atom';

import styles from './Selector.module.scss';

interface Props {
    data: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    label: string;
    validations?: {
        validationFunctions: Array<(value: string) => string | boolean>;
        setFormError: (isError: boolean) => void;
    };
}

const Selector: React.FC<Props> = (props) => {
    const { data, onChange, label, validations } = props;

    const [errors, setErrors] = useState<string[]>([]);

    const onChangeValue = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    const onValidate = (event: ChangeEvent<HTMLSelectElement>) => {
        if (!validations) {
            return;
        }

        onValidateField(
            validations.validationFunctions,
            event.target.value,
            validations.setFormError,
            setErrors,
        );
    };

    return (
        <div className={styles.container}>
            <label>{label}</label>
            <select onChange={onChangeValue} onBlur={onValidate}>
                {data.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors.map((validationError, index) => (
                <Typography key={index} color={Color.Error} text={validationError} />
            ))}
        </div>
    );
};

export default Selector;
