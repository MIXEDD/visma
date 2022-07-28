import React, { ChangeEvent } from 'react';

import Typography, { Color } from '../typography/Typography';

import styles from './Selector.module.scss';

interface Props {
    data: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    label: string;
    errors?: string[];
}

const Selector: React.FC<Props> = (props) => {
    const { data, onChange, label, errors } = props;

    const onChangeValue = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.container}>
            <label>{label}</label>
            <select onChange={onChangeValue}>
                {data.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors?.map((validationError, index) => (
                <Typography key={index} color={Color.Error} text={validationError} />
            ))}
        </div>
    );
};

export default Selector;
