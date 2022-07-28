import React from 'react';

import styles from './Typography.module.scss';

export enum ElementType {
    H1 = 'h1',
    H2 = 'h2',
    Span = 'span',
}

export enum TextAlign {
    Left = 'textAlignLeft',
    Center = 'textAlignCenter',
    Right = 'textAlignRight',
}

interface Props {
    elementType?: ElementType;
    text: string;
    textAlign?: TextAlign;
}

const Typography: React.FC<Props> = (props) => {
    const { elementType = ElementType.Span, text, textAlign = TextAlign.Left } = props;

    if (elementType === ElementType.H1) {
        return <h1 className={styles[textAlign]}>{text}</h1>;
    }

    if (elementType === ElementType.H2) {
        return <h2 className={styles[textAlign]}>{text}</h2>;
    }

    return <span className={styles[textAlign]}>{text}</span>;
};

export default Typography;
