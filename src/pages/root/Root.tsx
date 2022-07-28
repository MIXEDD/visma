import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import InputField from '../../atoms/input-field/InputField';
import Typography, { ElementType } from '../../atoms/typography/Typography';
import Button from '../../atoms/button/Button';
import { formatSpecialCharactersAndNumbers } from '../../utils/format';
import {
    isCorrectFullNameLength,
    isEmailValid,
    isFullNameNoMoreThanFourWords,
    isFullNameStartsWithCapitalLetter,
    isFullNameUnique,
    isRequiredValueFilled,
    onValidateField,
} from '../../utils/validations';
import Selector from '../../atoms/selector/Selector';
import { RootReducer } from '../../store';
import { TreeData } from '../../store/tree/types';
import { getTreeNodes } from '../../utils/tree';

import styles from './Root.module.scss';

const addFullNameValidation = (value: string, treeData: TreeData) => {
    if (!value) {
        return [];
    }

    return [
        isCorrectFullNameLength,
        isFullNameNoMoreThanFourWords,
        isFullNameStartsWithCapitalLetter,
        isFullNameUnique(treeData),
    ];
};

const addEmailValidation = (value: string, fullName: string) => {
    if (!value) {
        return [];
    }

    return [isEmailValid(fullName)];
};

const Root: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [coach, setCoach] = useState<string>('');
    const [fullNameErrors, setFullNameErrors] = useState<string[]>([]);
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [coachErrors, setCoachErrors] = useState<string[]>([]);
    const treeState = useSelector((state: RootReducer) => state.tree);

    const coachesOptions = useMemo(() => {
        return getTreeNodes(treeState);
    }, [treeState]);

    const onChangeFullName = (value: string) => {
        setFullName(value);
    };

    const onSetEmail = (value: string) => {
        setEmail(value);
    };

    const onSetCoach = (value: string) => {
        setCoach(value);
    };

    const onClickSubmit = () => {
        const fullNameErrorMessages = onValidateField(
            [isRequiredValueFilled, ...addFullNameValidation(fullName, treeState)],
            fullName,
            setFullNameErrors,
        );
        const emailErrorMessages = onValidateField(
            [isRequiredValueFilled, ...addEmailValidation(email, fullName)],
            email,
            setEmailErrors,
        );
        const coachErrorMessages = onValidateField([isRequiredValueFilled], coach, setCoachErrors);

        if (
            !fullNameErrorMessages.length &&
            !emailErrorMessages.length &&
            !coachErrorMessages.length
        ) {
            console.log('click');
        }
    };

    return (
        <div className={styles.container}>
            <Typography text="Create form" elementType={ElementType.H1} />
            <InputField
                label="Full name*:"
                onChangeInput={onChangeFullName}
                format={formatSpecialCharactersAndNumbers}
                errors={fullNameErrors}
            />
            <InputField label="Email*:" onChangeInput={onSetEmail} errors={emailErrors} />
            <Selector
                data={[{ value: '', label: '' }, ...coachesOptions]}
                onChange={onSetCoach}
                label="Select coach*:"
                errors={coachErrors}
            />
            <Button text="Create" onClick={onClickSubmit} />
        </div>
    );
};

export default Root;
