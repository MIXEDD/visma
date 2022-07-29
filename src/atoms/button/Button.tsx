import classnames from 'classnames';
import React from 'react';
import styles from './Button.module.scss';

export enum ButtonType {
    Primary = 'PRIMARY',
}

interface Props {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    buttonType?: ButtonType;
}

const getButtonTypeStyles = (buttonType: ButtonType) => {
    if (buttonType === ButtonType.Primary) {
        return styles.primary;
    }

    return null;
};

const Button: React.FC<Props> = React.memo((props) => {
    const { text, onClick, disabled, buttonType = ButtonType.Primary } = props;

    return (
        <button
            className={classnames(
                styles.button,
                disabled && styles.disabled,
                getButtonTypeStyles(buttonType),
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
});

export default Button;
